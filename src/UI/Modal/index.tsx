import React, { useEffect, useState } from 'react';
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
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Map size prop to CSS classes
  const sizeClassMap: Record<NonNullable<ModalProps['size']>, string> = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    fullScreen: styles.fullScreen,
  };
  const sizeClass = sizeClassMap[size];

  // Sync rendering state with open prop
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setIsVisible(true)); // ensures animation runs
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300); // delay matches CSS transition
    }
  }, [isOpen]);

  // Escape key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = () => {
    if (backdropClosable) onClose();
  };

  if (!shouldRender) return null;

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
      >
        {showCloseIcon && (
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
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
