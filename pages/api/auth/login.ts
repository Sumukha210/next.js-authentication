import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../components/utils";

type resTypes = {
  message: string;
  status: "success" | "fail";
  accessToken?: string;
};

const prisma = new PrismaClient();

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<resTypes>
) {
  if (req.method != "POST") {
    return res.json({ message: "Only post method is allowed", status: "fail" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "all the fields are required",
      status: "fail",
    });
  }

  try {
    const user = await prisma.userAccount.findUnique({ where: { email } });
    if (!user) {
      console.log("user doesn't exist");
      return res.json({ message: "Invalid email or password", status: "fail" });
    }

    const comparedPassword = await bcrypt.compare(password, user?.password);
    if (!comparedPassword) {
      console.log("password doesn't match");
      return res.json({ message: "Invalid email or password", status: "fail" });
    }

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refreshToken", createRefreshToken(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      })
    );

    res.json({
      message: "Login is successful",
      status: "success",
      accessToken: createAccessToken(user),
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}
