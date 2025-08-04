export enum UserRole {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};
