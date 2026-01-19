import React from 'react';
import './StatusIndicator.css';

const StatusIndicator = ({ variant, className = '' }) => {
  const variantClass = variant ? `status-indicator--${variant}` : '';

  return (
    <div
      className={`status-indicator ${variantClass} ${className}`.trim()}
    ></div>
  );
};

export default StatusIndicator;
