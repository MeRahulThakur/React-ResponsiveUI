import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SnackBar.module.css';

interface SnackBarProps {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  message?: string;
  children?: React.ReactNode;
  anchorOrigin?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  showCloseIcon?: boolean;
}

const SnackBar: React.FC<SnackBarProps> = ({
  open,
  autoHideDuration = 3000,
  onClose,
  message,
  children,
  anchorOrigin = 'bottom-center',
  variant = 'default',
  showCloseIcon = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingTimeRef = useRef(autoHideDuration);
  const pauseStartTime = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback((duration: number) => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      remainingTimeRef.current = autoHideDuration;
      startTimer(autoHideDuration);
    } else {
      clearTimer();
      setIsVisible(false);
    }
  
    return clearTimer;
  }, [open, autoHideDuration, startTimer]);

  const handleMouseEnter = () => {
    clearTimer();
    pauseStartTime.current = Date.now();
  };

  const handleMouseLeave = () => {
    if (pauseStartTime.current !== null && open) {
      const elapsed = Date.now() - pauseStartTime.current;
      remainingTimeRef.current = Math.max(remainingTimeRef.current - elapsed, 0);
      pauseStartTime.current = null;

      if (remainingTimeRef.current > 0) {
        startTimer(remainingTimeRef.current);
      } else {
        // If time elapsed during pause, dismiss immediately
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }
    //if (open) startTimer(remainingTimeRef.current || autoHideDuration);
  };

  const originClass = styles[anchorOrigin.replace('-', '')];
  const directionClass = anchorOrigin.startsWith('top')
    ? isVisible ? styles.showFromTop : styles.appearFromTop
    : isVisible ? styles.showFromBottom : styles.appearFromBottom;
  const variantClass = styles[variant];

  return (
    <div className={`${styles.snackBarWrapper} ${originClass}`}>
      <div
        className={`${styles.snackBar} ${variantClass} ${directionClass} ${isVisible ? styles.visible : ''}`}
        role="status"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.message}>
          {message || children}
        </div>
        {showCloseIcon && (
          <button
            className={styles.closeButton}
            onClick={() => {
              clearTimer();
              onClose();
            }}
            aria-label="Close snackbar"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default SnackBar;
