import React, { useRef, useState, useEffect } from 'react';
import styles from './Tooltip.module.css';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  placement?: Placement;
  children: React.ReactNode;
}

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const Tooltip: React.FC<TooltipProps> = ({ content, placement = 'top', children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState<Placement>(placement);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && wrapperRef.current && tooltipRef.current) {
      const triggerRect = wrapperRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spacing = 8;

      const calcPosition = (place: Placement) => {
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
        return positions[place];
      };

      let pos = calcPosition(placement);
      const fitsOnScreen = (
        pos.top >= 0 &&
        pos.left >= 0 &&
        pos.left + tooltipRect.width <= window.innerWidth &&
        pos.top + tooltipRect.height <= window.innerHeight
      );

      if (!fitsOnScreen) {
        const fallbackPlacements: Placement[] = (['top', 'bottom', 'right', 'left'] as Placement[]).filter(p => p !== placement);
        for (const fallback of fallbackPlacements) {
          const altPos = calcPosition(fallback);
          const fits = (
            altPos.top >= 0 &&
            altPos.left >= 0 &&
            altPos.left + tooltipRect.width <= window.innerWidth &&
            altPos.top + tooltipRect.height <= window.innerHeight
          );
          if (fits) {
            pos = altPos;
            setActualPlacement(fallback);
            break;
          }
        }
      } else {
        setActualPlacement(placement);
      }

      setPosition(pos);
    }
  }, [visible, placement]);

  useEffect(() => {
    if (visible && isTouchDevice()) {
      const timer = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const eventHandlers = isTouchDevice()
    ? {
        onClick: () => setVisible(prev => !prev),
      }
    : {
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
      };

  return (
    <span
      ref={wrapperRef}
      {...eventHandlers}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} ${styles[actualPlacement]}`}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            zIndex: 1000,
            maxWidth: '80vw',
            wordBreak: 'break-word',
          }}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
