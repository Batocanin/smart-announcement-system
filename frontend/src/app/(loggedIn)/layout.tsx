import SocketProvider from "@/lib/socket";
import UserContext from "@/lib/user-context";
import { validateUser } from "@/shared/validators/validateUser";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await validateUser();

  if (!user) redirect("/login");

  return (
    <UserContext user={{ user }}>
      <SocketProvider>{children}</SocketProvider>
    </UserContext>
  );
};

export default layout;
