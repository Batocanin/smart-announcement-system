"use client";

import { createContext, useContext } from "react";
import { User } from "../../../shared/types/User";

interface SessionContext {
  user: User;
}

const SessionContext = createContext<SessionContext | null>(null);

function UserContext({ children, user }: React.PropsWithChildren<{ user: SessionContext }>) {
  return <SessionContext.Provider value={user}>{children}</SessionContext.Provider>;
}

export function useUserSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a Session Provider");
  }
  return context;
}

export default UserContext;
