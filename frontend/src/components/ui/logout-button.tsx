import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./button";
import { kyInstance } from "@/lib/ky";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => await kyInstance.post("auth/logout").json(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to logout");
    },
  });
};

const LogoutButton = () => {
  const { mutate: logout, isPending, isSuccess } = useLogoutMutation();
  return (
    <Button size="sm" disabled={isPending || isSuccess} onClick={() => logout()}>
      <LogOut />
      {(isPending || isSuccess) && <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default LogoutButton;
