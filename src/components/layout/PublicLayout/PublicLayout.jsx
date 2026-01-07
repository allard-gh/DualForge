import React from 'react';
import { Link } from 'react-router-dom';
import './PublicLayout.css';

function PublicLayout({ children, topRightContent }) {
  return (
    <div className="public-layout">
      <header className="public-header">
        <div className="header-left">
          <Link to="/" className="brand">DualForge</Link>
        </div>
        <div className="header-right">
          {topRightContent}
        </div>
      </header>
      <main className="public-content">
        {children}
      </main>
    </div>
  );
}

export default PublicLayout;
