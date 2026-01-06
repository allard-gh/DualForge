import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarLayout.css';

function SidebarLayout({ children }) {
  return (
    <div className="sidebar-layout">
      <nav className="sidebar">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/sign-in">Sign In</NavLink>
          </li>
          <li>
            <NavLink to="/sign-up">Sign Up</NavLink>
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
