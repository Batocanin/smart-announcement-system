import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { app } from "./app";

const port = process.env.PORT || 4000;

const httpServer = createServer(app);

export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.APPLICATION_URL,
    credentials: true,
  },
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
