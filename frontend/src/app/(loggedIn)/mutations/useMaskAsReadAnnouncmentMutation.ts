import { useUserSession } from "@/lib/user-context";
import { kyInstance } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRole } from "../../../../../shared/types/User";

const useMaskAsReadAnnouncmentMutation = () => {
  const { user } = useUserSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (announcementId: string) => {
      if (user?.role === UserRole.TEACHER) return null;
      await kyInstance.post(`announcements/${announcementId}/read`).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

export default useMaskAsReadAnnouncmentMutation;
