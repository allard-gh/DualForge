import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { AuthenticationContext } from '../../../context/AuthenticationContext/AuthenticationContext.js';
import './SidebarLayout.css';

function SidebarLayout({ children }) {
  const { isUserAuthenticated, signOut } = useContext(AuthenticationContext);

  return (
    <div className="sidebar-layout">
      <nav className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
          </li>
          {!isUserAuthenticated && (
            <>
              <li>
                <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
        {isUserAuthenticated && (
          <div className="sidebar-footer">
            <button type="button" onClick={signOut} className="sign-out-button">Sign Out</button>
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
