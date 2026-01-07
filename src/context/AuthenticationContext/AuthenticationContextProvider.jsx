import React, { useState } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

function AuthenticationContextProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const signIn = () => {
    setIsUserAuthenticated(true);
  };

  const signOut = () => {
    setIsUserAuthenticated(false);
  };

  const value = {
    isUserAuthenticated,
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
