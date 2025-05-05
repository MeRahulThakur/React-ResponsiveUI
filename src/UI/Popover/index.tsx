import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Popover.module.css';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  preferredPlacement?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onClose,
  anchorRef,
  preferredPlacement = 'bottom',
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, visibility: 'hidden' });
  const [actualPlacement, setActualPlacement] = useState(preferredPlacement);

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current || !popoverRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const popoverEl = popoverRef.current;
    const popoverRect = popoverEl.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const placements = ['bottom', 'top', 'right', 'left'] as const;
    const fits = {
      top: anchorRect.top >= popoverRect.height + 8,
      bottom: viewportHeight - anchorRect.bottom >= popoverRect.height + 8,
      left: anchorRect.left >= popoverRect.width + 8,
      right: viewportWidth - anchorRect.right >= popoverRect.width + 8,
    };

    const bestFit = [preferredPlacement, ...placements].find(p => fits[p]);
    const placement = bestFit ?? preferredPlacement;
    setActualPlacement(placement);

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = anchorRect.top + scrollY - popoverRect.height - 8;
        left = anchorRect.left + scrollX + anchorRect.width / 2 - popoverRect.width / 2;
        break;
      case 'right':
        top = anchorRect.top + scrollY + anchorRect.height / 2 - popoverRect.height / 2;
        left = anchorRect.right + scrollX + 8;
        break;
      case 'left':
        top = anchorRect.top + scrollY + anchorRect.height / 2 - popoverRect.height / 2;
        left = anchorRect.left + scrollX - popoverRect.width - 8;
        break;
      case 'bottom':
      default:
        top = anchorRect.bottom + scrollY + 8;
        left = anchorRect.left + scrollX + anchorRect.width / 2 - popoverRect.width / 2;
        break;
    }

    setPosition({ top, left, visibility: 'visible' });
  }, [isOpen, preferredPlacement, anchorRef]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={popoverRef}
      className={`${styles.popover} ${styles[actualPlacement]} ${styles.show}`}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        visibility: position.visibility as 'visible' | 'hidden',
        zIndex: 9999,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={`${styles.arrow} ${styles[`arrow-${actualPlacement}`]}`} />
      <button className={styles.closeButton} onClick={onClose} aria-label="Close popover">
        ×
      </button>
      <div className={styles.content}>{children}</div>
    </div>,
    document.body
  );
};

export default Popover;
