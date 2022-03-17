// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getHandler from "../../../src/components/handler";

export default getHandler().get((req, res) => {
  res.status(200).json({
    message: `your refresh token is ${req.cookies.refreshToken} and access token(${req.userId})`,
  });
});
