import { Request, Response } from "express";
import {
  createAnnouncement,
  verifyDataAndGetAnnouncements,
  verifyDataAndMarkAnnouncementAsRead,
} from "./announcement.service";
import { io } from "../..";

export const getAnnouncementsHandler = async (req: Request, res: Response) => {
  const { cursor } = req.query as { cursor?: string };

  const announcements = await verifyDataAndGetAnnouncements({ user: req.user, cursor });

  res.status(200).json({ message: "Announcements fetched successfully", data: announcements });
};

export const markAnnouncementAsReadHandler = async (req: Request, res: Response) => {
  const { announcementId } = req.params as { announcementId: string };

  await verifyDataAndMarkAnnouncementAsRead({ user: req.user, announcementId: announcementId });

  res.status(200).json({ message: "Announcement marked as read" });
};

export const createAnnouncementHandler = async (req: Request, res: Response) => {
  const data = req.body;

  const announcement = await createAnnouncement({ user: req.user, data });

  io.emit("new-announcement", {
    title: announcement.title,
    author: announcement.author.name,
  });

  res.status(201).json({ message: "Announcement created successfully", data: announcement });
};
