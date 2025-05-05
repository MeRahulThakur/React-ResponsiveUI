import React, { forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'text' | 'contained' | 'outlined';
type ButtonSize = 'sm' | 'md' | 'lg';
type ColorVariant = 'default' | 'danger' | 'success';
type ButtonShape = 'rounded' | 'rectangular';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ColorVariant;
  shape?: ButtonShape;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  ariaLabel?: string;
}

// Using forwardRef to expose the DOM element
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  onClick,
  variant = 'text',
  size = 'md',
  color = 'default',
  shape = 'rectangular',
  type = 'button',
  disabled = false,
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  ariaLabel,
}, ref) => {
  const handleClick = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  const classList = [
    styles.button,
    styles[variant],
    styles[size],
    styles[color],
    styles[shape],
    fullWidth ? styles.fullWidth : '',
    disabled || loading ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      onClick={handleClick}
      className={classList}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {loading ? (
        <span className={styles.loader} aria-hidden="true" />
      ) : (
        <>
          {startIcon && <span className={styles.icon}>{startIcon}</span>}
          <span>{children}</span>
          {endIcon && <span className={styles.icon}>{endIcon}</span>}
        </>
      )}
    </button>
  );
});
Button.displayName = 'Button'; // Important for debugging and HMR

export default Button;
