import { NextFunction, Request, Response } from "express";
import z from "zod";
import { AppError } from "./error.middleware";
import { validateSessionToken } from "../components/auth/session/session.service";

export const validateRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // gets token from user cookies
  const token = req.cookies["session"];

  const validatedToken = z.string().safeParse(token);

  if (validatedToken.error) throw new AppError("Niste autorizovani za ovu akciju.", 401);

  // decode token to session
  const { user, session } = await validateSessionToken({ token: validatedToken.data });

  if (!user || !session) throw new AppError("Niste autorizovani za ovu akciju.", 401);

  // adds global req.user from validated user
  req.user = user;
  next();
};
