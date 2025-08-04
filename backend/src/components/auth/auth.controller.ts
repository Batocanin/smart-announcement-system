import { Request, Response } from "express";
import { verifyLoginCredentials } from "./login/login.service";
import { AppError } from "../../middlewares/error.middleware";
import { loginSchema } from "../../../../shared/schemas/auth/schema";
import { z } from "zod";
import { setSession } from "./session/session.service";
import { deleteSession } from "./session/session.service";

export const loginHandler = async (req: Request, res: Response) => {
  const credentials = loginSchema.parse(req.body.credentials);

  const user = await verifyLoginCredentials({ credentials });

  await setSession({ res, userId: user.id });

  res.status(200).json({ message: "You are successfully logged in" });
};

export const logoutHandler = async (req: Request, res: Response) => {
  const sessionId = req.cookies["session"];
  const validatedSession = z.string().safeParse(sessionId);

  if (!validatedSession.success) {
    throw new AppError("You are already logged out or you are not logged in.", 401);
  }

  await deleteSession({ res, sessionId: validatedSession.data });

  res.status(201).json({ message: "You are successfully logged out" });
};
