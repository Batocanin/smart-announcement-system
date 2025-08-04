import ky from "ky";

export const kyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  retry: {
    limit: 2,
  },
  credentials: "include",
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response && response.body) {
          try {
            const errorBody = (await response.json()) as { message: string };
            error.message = errorBody?.message || error.message;
          } catch {}
        }

        return error;
      },
    ],
  },
});
