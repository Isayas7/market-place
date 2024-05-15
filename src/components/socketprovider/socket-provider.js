"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ url, options, children }) => {
  const session = useSession();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url, options);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [url, options]);

  useEffect(() => {
    session.status === "authenticated" &&
      socket?.emit("addUser", session?.data?.user);
  }, [session, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
