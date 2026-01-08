import React, { useState } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

function AuthenticationContextProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const signIn = () => {
    setIsUserAuthenticated(true);
    setRole('admin');
  };

  const signOut = () => {
    setIsUserAuthenticated(false);
    setRole(null);
  };

  const value = {
    isUserAuthenticated,
    role,
    signIn,
    signOut,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;
