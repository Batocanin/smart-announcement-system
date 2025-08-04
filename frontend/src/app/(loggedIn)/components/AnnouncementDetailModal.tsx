"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, User, Calendar } from "lucide-react";
import { Announcement } from "../../../../../shared/types/Annoucement";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUserSession } from "@/lib/user-context";
import { UserRole } from "../../../../../shared/types/User";

interface AnnouncementDetailModalProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AnnouncementDetailModal({ announcement, isOpen, onOpenChange }: AnnouncementDetailModalProps) {
  dayjs.extend(relativeTime);
  const { user } = useUserSession();
  const isUnread = announcement?.AnnouncementRead.length === 0 && user?.role !== UserRole.TEACHER;

  if (!announcement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div>
              <DialogTitle className="text-xl">{announcement.title}</DialogTitle>
              <p className="text-sm text-gray-600">by {announcement.author.name}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {dayjs(announcement.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {user?.role === UserRole.TEACHER && (
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{announcement.AnnouncementRead.length} read</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Posted by {announcement.author.name}</span>
              </div>
            </div>

            {isUnread && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Unread
              </Badge>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
