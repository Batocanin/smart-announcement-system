"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddAnnouncementButtonProps {
  onClick: () => void;
}

export default function AddAnnouncementButton({ onClick }: AddAnnouncementButtonProps) {
  return (
    <Button onClick={onClick} className="flex items-center gap-2">
      <Plus className="w-4 h-4" />
      Add Announcement
    </Button>
  );
}
