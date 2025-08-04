"use client";

import { useState } from "react";
import AddAnnouncementButton from "./components/AddAnnouncementButton";
import AddAnnouncementModal from "./components/AddAnnouncementModal";
import AnnouncementList from "./components/AnnouncementList";
import AnnouncementDetailModal from "./components/AnnouncementDetailModal";
import { Announcement } from "../../../../shared/types/Annoucement";
import LogoutButton from "@/components/ui/logout-button";
import { useUserSession } from "@/lib/user-context";
import { UserRole } from "../../../../shared/types/User";

export default function AnnouncementsPage() {
  const { user } = useUserSession();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-2">Stay updated with the latest news and announcements</p>
        </div>
        <div className="flex items-center gap-2">
          {user?.role === UserRole.TEACHER && <AddAnnouncementButton onClick={() => setIsAddModalOpen(true)} />}
          <LogoutButton />
        </div>
      </div>

      <AnnouncementList onAnnouncementClick={handleAnnouncementClick} />

      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        isOpen={!!selectedAnnouncement}
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      />

      <AddAnnouncementModal isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
}
