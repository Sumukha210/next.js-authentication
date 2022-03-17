// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import getHandler from "../../../src/components/handler";

const prisma = new PrismaClient();

export default getHandler().get(async (req, res) => {
  if (req.userId) {
    try {
      const user = await prisma.userAccount.findUnique({
        where: { id: req.userId },
      });
      if (user) {
        const { email, name, created_at, id } = user;
        return res.json({
          user: {
            email,
            name,
            created_at,
            id,
          },
        });
      }

      res.json({ message: "You are not authenticated", status: "fail" });
    } catch (error) {
      console.log("user profile er", error);
    }
  }

  res.json({ message: "You are not authenticated", status: "fail" });
});
