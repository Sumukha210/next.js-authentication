// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { v4 as uuid } from "uuid";
import {
  createRefreshToken,
  createAccessToken,
} from "../../../src/components/utils";

type resTypes = {
  status: "success" | "fail";
  accessToken?: string | null;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resTypes>
) {
  const refreshToken = req.cookies.refreshToken;

  //check if refresh token exists
  if (!refreshToken) {
    return res.json({ status: "fail", accessToken: null });
  }

  try {
    // verify the refresh token
    let verifiedToken: any = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    console.log("verified Token", verifiedToken);

    if (!verifiedToken.userId) {
      console.log("userid not found");
      return res.json({ status: "fail", accessToken: null });
    }

    const user = await prisma.userAccount.findUnique({
      where: { id: verifiedToken.userId },
    });

    if (!user) {
      console.log("user not found by that id");
      return res.json({ status: "fail", accessToken: null });
    }

    if (user.refresh_token_version !== verifiedToken.tokenVersion) {
      console.log("refresh version is not matched");
      return res.json({ status: "fail", accessToken: null });
    }

    const updatedUser = await prisma.userAccount.update({
      where: { id: verifiedToken.userId },
      data: { refresh_token_version: uuid() },
    });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refreshToken", createRefreshToken(updatedUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      })
    );

    res.json({
      status: "success",
      accessToken: createAccessToken(user),
    });
  } catch (error) {
    console.log("Refresh token Error", error);
    return res.json({ status: "fail", accessToken: null });
  }

  //   res.status(200).json({ name: "John Doe" });
}
