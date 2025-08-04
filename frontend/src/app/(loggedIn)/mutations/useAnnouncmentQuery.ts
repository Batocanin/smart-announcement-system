import { kyInstance } from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Announcement } from "../../../../../shared/types/Annoucement";

interface AnnouncementsResponse {
  message: string;
  data: {
    announcements: Announcement[];
    nextCursor?: string;
    hasMore: boolean;
  };
}

export const useAnnouncementsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["announcements"],
    queryFn: async ({ pageParam }: { pageParam?: string }): Promise<AnnouncementsResponse> => {
      const url = pageParam ? `announcements?cursor=${pageParam}` : "announcements";
      return await kyInstance.get(url).json<AnnouncementsResponse>();
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: AnnouncementsResponse) => lastPage.data.nextCursor,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
