import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const useTab = () => {
  return useContext(TabContext);
};

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
