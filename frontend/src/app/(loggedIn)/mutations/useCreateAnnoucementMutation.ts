import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncementSchemaValue } from "../../../../../shared/schemas/auth/schema";
import { kyInstance } from "@/lib/ky";
import { toast } from "sonner";

const useCreateAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: createAnnouncementSchemaValue) => kyInstance.post("announcements", { json: data }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement created successfully");
    },
  });
};

export default useCreateAnnouncementMutation;
