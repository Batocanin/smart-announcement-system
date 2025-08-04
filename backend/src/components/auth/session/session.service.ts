import { encodeBase32LowerCase, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { prisma } from "../../../lib/prisma";
import { Response } from "express";
import crypto from "crypto";
import { AppError } from "../../../middlewares/error.middleware";

export const setSession = async ({ res, userId }: { res: Response; userId: string }) => {
  const token = generateSessionToken();
  const session = await createSession({ token, userId });

  res.cookie("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: session.expiresAt,
    path: "/",
  });

  return { token, session };
};

export const createSession = async ({ token, userId }: { token: string; userId: string }) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    userId,
    sessionId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await prisma.session.create({
    data: session,
  });

  return session;
};

export const generateSessionToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCase(bytes);
  return token;
};

export const validateSessionToken = async ({ token }: { token: string }) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      sessionId: sessionId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
  });

  if (!result) throw new AppError("Invalid session token", 401);

  const now = Date.now();
  const { user, ...session } = result;

  if (now >= session.expiresAt.getTime()) {
    await prisma.session.delete({
      where: {
        sessionId: sessionId,
      },
    });
    return { session: null, user: null };
  }

  if (now >= session.expiresAt.getTime() - 2 * 24 * 60 * 60 * 1000) {
    session.expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.update({
      where: {
        sessionId: session.sessionId,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { user, session };
};

export const deleteSession = async ({ res, sessionId }: { res: Response; sessionId: string }) => {
  const encodedSessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionId)));

  await prisma.session.delete({
    where: {
      sessionId: encodedSessionId,
    },
  });

  res.clearCookie("session", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};
