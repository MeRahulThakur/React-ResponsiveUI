import React, { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import Button from '../Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseIcon?: boolean;
  showActions?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  backdropClosable?: boolean;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullScreen';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  showCloseIcon = true,
  showActions = false,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  size = 'medium',
  backdropClosable = true,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        modalRef.current?.focus();
      }, 10);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;

    const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableEls || focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  const sizeClassMap: Record<NonNullable<ModalProps['size']>, string> = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    fullScreen: styles.fullScreen,
  };

  const sizeClass = sizeClassMap[size || 'medium'];

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (backdropClosable) handleClose();
  };

  return createPortal(
    <div
      className={`${styles.modalOverlay} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`${styles.modalContent} ${sizeClass} ${isVisible ? styles.slideIn : styles.slideOut}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapFocus}
        tabIndex={-1}
        ref={modalRef}
      >
        {showCloseIcon && (
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close modal">
            &times;
          </button>
        )}
        {title && <div id="modal-title" className={styles.modalHeader}>{title}</div>}
        <div className={styles.modalBody}>{children}</div>
        {showActions && (
          <div className={styles.modalActions}>
            <Button variant="text" onClick={() => (onCancel || onClose)()}>{cancelText}</Button>
            <Button onClick={() => onConfirm?.()}>{confirmText}</Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
