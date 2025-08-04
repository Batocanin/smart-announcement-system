"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar } from "lucide-react";
import useMaskAsReadAnnouncmentMutation from "@/app/(loggedIn)/mutations/useMaskAsReadAnnouncmentMutation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Announcement } from "../../../../../shared/types/Annoucement";
import { useUserSession } from "@/lib/user-context";
import { UserRole } from "../../../../../shared/types/User";

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick: (announcement: Announcement) => void;
}

export default function AnnouncementCard({ announcement, onClick }: AnnouncementCardProps) {
  const { user } = useUserSession();
  const { mutate: maskAsRead } = useMaskAsReadAnnouncmentMutation();
  const isUnread = announcement.AnnouncementRead.length === 0 && user?.role !== UserRole.TEACHER;

  dayjs.extend(relativeTime);

  const formatDate = (dateString: string) => {
    return dayjs(dateString).fromNow();
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${isUnread ? "border-l-4 border-l-blue-500" : ""}`}
      onClick={() => {
        if (user?.role !== UserRole.TEACHER && isUnread) {
          maskAsRead(announcement.id);
        }
        onClick(announcement);
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-sm">{announcement.author.name}</p>
            <p className="text-xs text-gray-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(announcement.createdAt)}
            </p>
          </div>
          {isUnread && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              New
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardTitle className="text-lg mb-3 line-clamp-2">{announcement.title}</CardTitle>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{announcement.content}</p>

        <div className="flex items-center">
          {user?.role === UserRole.TEACHER && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{announcement.AnnouncementRead.length} read</span>
            </div>
          )}
          <Button className="ml-auto" variant="outline" size="sm">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
