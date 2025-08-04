"use server";

import { kyInstance } from "@/lib/ky";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { HTTPError } from "ky";
import { User } from "../../../../shared/types/User";

export type ValidateUserResult = {
  data: { user: User };
  message: string;
};

export const validateUser = cache(async (): Promise<User | null> => {
  const cookie = await cookies();
  const session = cookie.get("session");
  try {
    if (!session?.value) return null;

    const result = await kyInstance
      .post("auth/validate-request", {
        headers: { Cookie: `session=${session?.value}` },
      })
      .json<ValidateUserResult>();

    const { user } = result?.data;

    return user;
  } catch (error) {
    // if error status is 401 (unauthorized) return null
    if (error instanceof HTTPError) {
      if (error.response.status === 401) return null;
    }

    // any other errors than 401, redirect to server error page.
    notFound();
  }
});
