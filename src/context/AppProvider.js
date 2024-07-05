"use client";
import { createContext, useState } from "react";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [currentRole, setCurrentRole] = useState("");
  const [userProfileCount, setUserProfileCount] = useState({});
  const [completedSections, setCompletedSections] = useState(new Set());
  const [profileCompletionCount, setProfileCompletionCount] = useState({});

  

  const valueToShare = {
    userData,
    setUserData,
    currentRole,
    setCurrentRole,
    userProfileCount,
    completedSections,
    setUserProfileCount,
    setCompletedSections,
    profileCompletionCount,
    setProfileCompletionCount
  };

  return (
    <AppContext.Provider value={valueToShare}>{children}</AppContext.Provider>
  );
};
export { AppProvider };
export default AppContext;
