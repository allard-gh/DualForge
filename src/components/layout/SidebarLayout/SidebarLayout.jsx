import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './SidebarLayout.css';

function SidebarLayout({ children }) {
  return (
    <div className="sidebar-layout">
      <nav className="sidebar">
        <ul>
          <li>
            <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
          </li>
        </ul>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default SidebarLayout;
