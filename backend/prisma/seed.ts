import { PrismaClient } from "@prisma/client";
import { UserRole } from "../../shared/types/User";

const prisma = new PrismaClient();

// 123456 password hash
const hash = "$argon2id$v=19$m=19456,t=2,p=1$kDaWNt68Os4r1/Zap74Q0Q$ofMwmQJDDzXVFaIy/51JbWQPZyefUNoOzGxxQZnY0DY";

const users = [
  {
    id: "1",
    email: "teacher@gmail.com",
    password: hash,
    name: "Teacher",
    role: UserRole.TEACHER,
  },
  {
    id: "2",
    email: "student@gmail.com",
    password: hash,
    name: "Student",
    role: UserRole.STUDENT,
  },
];

const announcements = [
  {
    id: "1",
    title: "Announcement 1",
    content: "This is the first announcement",
    authorId: "1",
  },
  {
    id: "2",
    title: "Announcement 2",
    content: "This is the second announcement",
    authorId: "1",
  },
  {
    id: "3",
    title: "Announcement 3",
    content: "This is the third announcement",
    authorId: "1",
  },
  {
    id: "4",
    title: "Announcement 4",
    content: "This is the fourth announcement",
    authorId: "1",
  },
  {
    id: "5",
    title: "Announcement 5",
    content: "This is the fifth announcement",
    authorId: "1",
  },
];

async function main() {
  await prisma.announcementRead.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: users,
  });

  await prisma.announcement.createMany({
    data: announcements,
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
