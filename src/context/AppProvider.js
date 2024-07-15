'use client';
import usePersistState from '@/hooks/usePersistState';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const session = useSession();
  const [userData, setUserData] = useState({});
  const [currentRole, setCurrentRole] = useState('');
  const [userProfileCount, setUserProfileCount] = useState({});
  const [completedSections, setCompletedSections] = useState(new Set());
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [profileCompletionCount, setProfileCompletionCount] = usePersistState(
    {},
    'profileCount',
  );

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
    setProfileCompletionCount,
    openSuccessModal,
    setOpenSuccessModal
  };

  return (
    <AppContext.Provider value={valueToShare}>{children}</AppContext.Provider>
  );
};
export { AppProvider };
export default AppContext;
