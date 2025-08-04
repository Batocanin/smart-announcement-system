import z from "zod";
import { createAnnouncementSchema, createAnnouncementSchemaValue } from "../../../../shared/schemas/auth/schema";
import { User, UserRole } from "../../../../shared/types/User";
import { AppError } from "../../middlewares/error.middleware";
import { prisma } from "../../lib/prisma";

export const verifyDataAndGetAnnouncements = async ({ user, cursor }: { user: User; cursor?: string }) => {
  let validatedCursor: string | undefined;

  if (cursor) {
    const cursorValidation = z.string().safeParse(cursor);
    if (!cursorValidation.success) throw new AppError("Invalid cursor value", 400);
    validatedCursor = cursorValidation.data;
  }

  const limit = 10;

  const announcements = await prisma.announcement.findMany({
    take: limit + 1,
    ...(validatedCursor && { cursor: { id: validatedCursor }, skip: 1 }),
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      AnnouncementRead: {
        ...(user.role === UserRole.TEACHER
          ? { select: { id: true } }
          : { where: { userId: user.id }, select: { id: true } }),
      },
    },
  });

  const hasMore = announcements.length > limit;

  return {
    announcements,
    hasMore,
    nextCursor: hasMore ? announcements[announcements.length - 1].id : null,
  };
};

export const createAnnouncement = async ({ user, data }: { user: User; data: createAnnouncementSchemaValue }) => {
  const validatedData = createAnnouncementSchema.safeParse(data);

  if (!validatedData.success) throw new AppError("Invalid input data", 400);

  if (!user || user.role !== UserRole.TEACHER)
    throw new AppError("You are not authorized to create an announcement", 403);

  const announcement = await prisma.announcement.create({
    data: {
      title: validatedData.data.title,
      content: validatedData.data.content,
      authorId: user.id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      AnnouncementRead: {
        select: {
          id: true,
        },
      },
    },
  });

  return announcement;
};

export const verifyDataAndMarkAnnouncementAsRead = async ({
  user,
  announcementId,
}: {
  user: User;
  announcementId: string;
}) => {
  const validatedAnnouncementId = z.string().safeParse(announcementId);

  if (!validatedAnnouncementId.success) throw new AppError("Invalid announcement id", 400);

  if (user.role === UserRole.TEACHER) throw new AppError("You are not authorized to mark an announcement as read", 403);

  await prisma.announcementRead.create({
    data: {
      announcementId: validatedAnnouncementId.data,
      userId: user.id,
    },
  });

  return true;
};
