import { UserAccount } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: UserAccount) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: UserAccount) => {
  return sign(
    { userId: user.id, tokenVersion: user.refresh_token_version },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
