// Tooltip.tsx
import React, { useRef, useState, useEffect } from 'react';
import styles from './Tooltip.module.css';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  placement?: Placement;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, placement = 'top', children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && wrapperRef.current && tooltipRef.current) {
      const triggerRect = wrapperRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spacing = 8;

      const positions = {
        top: {
          top: triggerRect.top - tooltipRect.height - spacing,
          left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        },
        bottom: {
          top: triggerRect.bottom + spacing,
          left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        },
        left: {
          top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
          left: triggerRect.left - tooltipRect.width - spacing,
        },
        right: {
          top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
          left: triggerRect.right + spacing,
        },
      };

      setPosition(positions[placement]);
    }
  }, [visible, placement]);

  return (
    <span
      ref={wrapperRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} ${styles[placement]}`}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            zIndex: 1000,
          }}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
