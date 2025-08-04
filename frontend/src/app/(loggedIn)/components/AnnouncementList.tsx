"use client";

import { Announcement } from "../../../../../shared/types/Annoucement";
import AnnouncementCard from "./AnnouncementCard";
import { useAnnouncementsQuery } from "../mutations/useAnnouncmentQuery";
import LoadMoreButton from "@/app/(loggedIn)/components/LoadMoreButton";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface AnnouncementListProps {
  onAnnouncementClick: (announcement: Announcement) => void;
}

export default function AnnouncementList({ onAnnouncementClick }: AnnouncementListProps) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useAnnouncementsQuery();

  if (isLoading) return <AnnouncementListSkeleton />;

  if (isError) return <AnnouncementListError />;

  const announcements = data?.pages.flatMap((page) => page.data.announcements) ?? [];

  if (announcements.length === 0) return <AnnouncementListEmpty />;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} onClick={onAnnouncementClick} />
        ))}
      </div>
      <div className="flex items-center justify-center p-4">
        <LoadMoreButton
          nextCursor={data?.pages[data.pages.length - 1]?.data.nextCursor ?? null}
          isLoading={isFetchingNextPage}
          hasNextPage={hasNextPage}
          onLoadMore={() => fetchNextPage()}
        />
      </div>
    </>
  );
}

const AnnouncementListSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const AnnouncementListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="text-lg font-semibold">No announcements found.</h3>
    </div>
  );
};

const AnnouncementListError = () => {
  const { refetch } = useAnnouncementsQuery();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="flex items-center space-x-2 text-red-600 mb-4">
        <AlertCircle className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Error loading announcements</h3>
      </div>
      <Button onClick={() => refetch()} variant="outline" className="w-fit">
        Try again
      </Button>
    </div>
  );
};
