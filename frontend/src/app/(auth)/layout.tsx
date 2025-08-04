import { validateUser } from "@/shared/validators/validateUser";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await validateUser();

  if (user) redirect("/");

  return <div>{children}</div>;
};

export default layout;
