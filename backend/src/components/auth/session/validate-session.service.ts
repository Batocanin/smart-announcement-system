import { validateSessionToken } from "./session.service";
import { Request, Response } from "express";
import z from "zod";
import { AppError } from "../../../middlewares/error.middleware";

export const validateSessionHandler = async (req: Request, res: Response) => {
  const token = req.cookies["session"];

  const validatedToken = z.string().safeParse(token);

  if (validatedToken.error) throw new AppError("Not authorized for this action.", 401);

  const { user, session } = await validateSessionToken({ token: validatedToken.data });

  if (!user || !session) {
    res.clearCookie("session", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    throw new AppError("Not authorized for this action.", 401);
  }

  return res.status(202).json({
    message: "Session is successfully verified.",
    data: { user },
  });
};
