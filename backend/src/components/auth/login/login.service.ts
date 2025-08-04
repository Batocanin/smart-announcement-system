import { verify } from "@node-rs/argon2";
import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../middlewares/error.middleware";
import { loginSchemaValue } from "../../../../../shared/schemas/auth/schema";

export const verifyLoginCredentials = async ({ credentials }: { credentials: loginSchemaValue }) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
    select: { id: true, password: true },
  });

  if (!existingUser) {
    throw new AppError("Email or password is incorrect.");
  }

  const isPasswordValid = await verify(existingUser.password, credentials.password);

  if (!isPasswordValid) throw new AppError("Email or password is incorrect.");

  return existingUser;
};
