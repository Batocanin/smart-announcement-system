import { User } from "../shared/types/User";

declare module "express-serve-static-core" {
  interface Request {
    user: Pick<User, "id" | "email" | "name" | "role">;
  }
}
