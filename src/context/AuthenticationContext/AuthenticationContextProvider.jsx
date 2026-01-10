import React, { useState } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

function AuthenticationContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('dualforgeToken') || null);
  const [role, setRole] = useState(localStorage.getItem('dualforgeRole') || null);
  const [status, setStatus] = useState('done');

  const isUserAuthenticated = Boolean(token);

  const signIn = async (credentials) => {
    if (!credentials || !credentials.email || !credentials.password) {
      setStatus('error');
      return;
    }

    setStatus('pending');

    try {
      const response = await fetch('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'novi-education-project-id': 'c8c123e6-beb1-4124-9d9f-b3c03ec31a1a',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        setToken(null);
        setRole(null);
        localStorage.removeItem('dualforgeToken');
        localStorage.removeItem('dualforgeRole');
        setStatus('error');
        return;
      }

      const result = await response.json();
      const newToken = result.token;
      const roles = result.user && result.user.roles ? result.user.roles : [];
      const newRole = Array.isArray(roles) && roles.length > 0 ? roles[0] : null;

      if (!newToken) {
        setToken(null);
        setRole(null);
        localStorage.removeItem('dualforgeToken');
        localStorage.removeItem('dualforgeRole');
        setStatus('error');
        return;
      }

      setToken(newToken);
      setRole(newRole);
      setStatus('done');

      localStorage.setItem('dualforgeToken', newToken);
      if (newRole) {
        localStorage.setItem('dualforgeRole', newRole);
      } else {
        localStorage.removeItem('dualforgeRole');
      }
    } catch (error) {
      setToken(null);
      setRole(null);
      localStorage.removeItem('dualforgeToken');
      localStorage.removeItem('dualforgeRole');
      setStatus('error');
    }
  };

  const signOut = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('dualforgeToken');
    localStorage.removeItem('dualforgeRole');
    setStatus('done');
  };

  const value = {
    isUserAuthenticated,
    token,
    role,
    status,
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
