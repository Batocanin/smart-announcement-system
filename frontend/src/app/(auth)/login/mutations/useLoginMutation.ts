import { useMutation } from "@tanstack/react-query";
import { loginSchemaValue } from "../../../../../../shared/schemas/auth/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { kyInstance } from "@/lib/ky";

interface LoginResponse {
  message: string;
}

const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ credentials }: { credentials: loginSchemaValue }): Promise<LoginResponse> =>
      kyInstance.post("auth/login", { json: { credentials } }).json(),
    onSuccess: () => {
      router.push("/");
      toast.success("Successfully logged in");
    },
  });
};

export default useLoginMutation;
