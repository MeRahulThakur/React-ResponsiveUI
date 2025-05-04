import React from 'react';
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
  fullScreen?: boolean;
  backdropClosable?: boolean;
  children: React.ReactNode;
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
  fullScreen = false,
  backdropClosable = true,
  children,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (backdropClosable) onClose();
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div
        className={`${styles.modalContent} ${fullScreen ? styles.fullScreen : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseIcon && (
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        )}
        {title && <div className={styles.modalHeader}>{title}</div>}
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
