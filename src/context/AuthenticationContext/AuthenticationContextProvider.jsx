import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthenticationContext } from './AuthenticationContext';

function AuthenticationContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('dualforgeToken');
    const savedCreatedAt = localStorage.getItem('dualforgeTokenCreatedAt');

    if (savedToken && !savedCreatedAt) {
      localStorage.removeItem('dualforgeToken');
      localStorage.removeItem('dualforgeRole');
      localStorage.removeItem('dualforgeTokenCreatedAt');
      return null;
    }

    if (savedToken && savedCreatedAt) {
      const expired = Date.now() - Number(savedCreatedAt) > 3 * 60 * 60 * 1000;
      if (expired) {
        localStorage.removeItem('dualforgeToken');
        localStorage.removeItem('dualforgeRole');
        localStorage.removeItem('dualforgeTokenCreatedAt');
        return null;
      }
    }

    return savedToken || null;
  });

  const [role, setRole] = useState(() => {
    const savedToken = localStorage.getItem('dualforgeToken');
    if (!savedToken) return null;
    return localStorage.getItem('dualforgeRole') || null;
  });

  const [status, setStatus] = useState('done');

  function signOut() {
    setToken(null);
    setRole(null);
    localStorage.removeItem('dualforgeToken');
    localStorage.removeItem('dualforgeRole');
    localStorage.removeItem('dualforgeTokenCreatedAt');
    setStatus('done');
  }

  useEffect(() => {
    if (!token) return;

    const savedCreatedAt = localStorage.getItem('dualforgeTokenCreatedAt');
    if (!savedCreatedAt) return;

    const remainingTime = 3 * 60 * 60 * 1000 - (Date.now() - Number(savedCreatedAt));

    const timeoutId = setTimeout(() => {
      signOut();
    }, Math.max(0, remainingTime));

    return () => clearTimeout(timeoutId);
  }, [token]);

  const isUserAuthenticated = Boolean(token);

  const signIn = async (credentials) => {
    if (!credentials || !credentials.email || !credentials.password) {
      setStatus('error');
      return;
    }

    setStatus('pending');

    try {
      const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
        email: credentials.email,
        password: credentials.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'novi-education-project-id': 'c8c123e6-beb1-4124-9d9f-b3c03ec31a1a',
        },
      });

      const result = response.data;
      const newToken = result.token;
      const roles = result.user && result.user.roles ? result.user.roles : [];
      const newRole = Array.isArray(roles) && roles.length > 0 ? roles[0] : null;

      if (!newToken) {
        setToken(null);
        setRole(null);
        localStorage.removeItem('dualforgeToken');
        localStorage.removeItem('dualforgeRole');
        localStorage.removeItem('dualforgeTokenCreatedAt');
        setStatus('error');
        return;
      }

      setToken(newToken);
      setRole(newRole);
      setStatus('done');

      localStorage.setItem('dualforgeToken', newToken);
      localStorage.setItem('dualforgeTokenCreatedAt', String(Date.now()));
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
      localStorage.removeItem('dualforgeTokenCreatedAt');
      setStatus('error');
    }
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
