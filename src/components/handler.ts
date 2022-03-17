import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export interface NextApiRequestExtended extends NextApiRequest {
  userId: string | null;
}

const getHandler = () => {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      console.log("onError", error);
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
  }).use(async (req, res, next) => {
    const { authorization } = req.headers;
    console.log("Authorization", authorization);

    if (!authorization) {
      next();
    } else {
      try {
        const verifiedToken: any = await verify(
          authorization.split(" ")[1],
          process.env.ACCESS_TOKEN_SECRET!
        );

        if (verifiedToken) {
          req.userId = verifiedToken.userId;
        }
        next();
      } catch (error: any) {
        console.log("Refresh middleware error", error.message);
        res.json({ error });
      }
    }
  });
};

export default getHandler;

/**
 *
 *  Axios Interceptor are just like an middleware, we can control or modify or do some things before sending the requests or after getting the response
 */
