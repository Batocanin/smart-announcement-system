export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  AnnouncementRead: { id: string }[];
}
