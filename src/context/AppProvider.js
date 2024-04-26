'use client';
import { createContext, useState } from 'react';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [currentRole, setCurrentRole] = useState('');
  const valueToShare = {
    userData,
    setUserData,
    currentRole,
    setCurrentRole,
  };

  return (
    <AppContext.Provider value={valueToShare}>{children}</AppContext.Provider>
  );
};
export { AppProvider };
export default AppContext;
