// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Req Cookie", req.cookies.refreshToken);
  res.status(200).json({ message: `${req.cookies.refreshToken}` });
}
