import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { AuthenticationContext } from '../../../context/AuthenticationContext/AuthenticationContext.js';
import './SidebarLayout.css';

function SidebarLayout({ children }) {
  const { isUserAuthenticated, signOut } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="sidebar-layout">
      <nav className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
          </li>
        </ul>
        {isUserAuthenticated && (
          <div className="sidebar-footer">
            <button type="button" onClick={handleSignOut} className="sign-out-button">Sign Out</button>
          </div>
        )}
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default SidebarLayout;
