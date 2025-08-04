"use client";
import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUserSession } from "./user-context";
import { UserRole } from "../../../shared/types/User";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const SocketContext = createContext<{ socket: Socket | null; isConnected: boolean }>({
  socket: null,
  isConnected: false,
});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { user } = useUserSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    if (user?.role === UserRole.STUDENT) {
      socketInstance.on("new-announcement", (data: { title: string; author: string }) => {
        queryClient.invalidateQueries({ queryKey: ["announcements"] });
        toast.success(`New announcement: ${data.title} by ${data.author}`);
      });
    }

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user?.id, user?.role]);

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
