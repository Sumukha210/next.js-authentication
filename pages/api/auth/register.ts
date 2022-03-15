import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

type resTypes = {
  message: string;
  status: "success" | "fail";
};

const prisma = new PrismaClient();

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<resTypes>
) {
  if (req.method != "POST") {
    return res.json({ message: "Only post method is allowed", status: "fail" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "all the fields are required",
      status: "fail",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); //hashing password
    await prisma.userAccount.create({
      data: { name, email, password: hashedPassword },
    }); // creating a new user

    res.json({ message: "Account is successfully created", status: "success" });
  } catch (error: any) {
    if (error?.code === "P2002") {
      res.json({ message: "Email is already exists", status: "fail" });
    }
  }
}
