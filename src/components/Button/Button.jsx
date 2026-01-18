import React from 'react';
import './Button.css';

function Button({
  type = "button",
  disabled = false,
  onClick,
  children,
  className = ""
}) {
  const combinedClassName = `button ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}

export default Button;
