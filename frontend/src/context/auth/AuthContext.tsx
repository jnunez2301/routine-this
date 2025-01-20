/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useState } from "react";
import { UserSession } from "../../model/User"
import { sessionTokenName } from "../../hooks/useApi";

type SessionContextState = {
  session: UserSession | null;
  setSession: (user: UserSession) => void;
  clearSession: () => void;
}

export const SessionContext = createContext<SessionContextState | undefined>(undefined);

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  function setSession(user: UserSession){
    setUser(user)
  }
  function clearSession(){
    setUser(null);
    localStorage.removeItem(sessionTokenName);
  }
  const values: SessionContextState = {
    clearSession,
    setSession,
    session: user
  }
  return <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
}
