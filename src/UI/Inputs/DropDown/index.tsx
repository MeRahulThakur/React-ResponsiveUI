import React, { useState, useEffect, useRef, useId } from 'react';
import styles from './DropDown.module.css';

export type Option = {
  label: string;
  value: string;
};

interface DropDownProps {
  id?: string; 
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  defaultSelected?: string | string[];
  onChange: (selected: Option | Option[] | null) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  isMulti = false,
  placeholder = 'Select...',
  defaultSelected,
  onChange,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | Option[] | null>(isMulti ? [] : null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generatedId = useId();
  const dropdownId = id || generatedId;

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    if (isMulti) {
      const selectedArray = selected as Option[];
      const exists = selectedArray.some((o) => o.value === option.value);
      const newSelection = exists
        ? selectedArray.filter((o) => o.value !== option.value)
        : [...selectedArray, option];
      setSelected(newSelection);
      onChange(newSelection);
    } else {
      setSelected(option);
      onChange(option);
      setIsOpen(false);
    }
  };

  const isSelected = (option: Option) =>
    isMulti
      ? (selected as Option[]).some((o) => o.value === option.value)
      : (selected as Option)?.value === option.value;

  // Default selection effect
  useEffect(() => {
    if (defaultSelected) {
      if (isMulti && Array.isArray(defaultSelected)) {
        const initialSelection = options.filter((opt) => defaultSelected.includes(opt.value));
        setSelected(initialSelection);
        onChange(initialSelection);
      } else if (!isMulti && typeof defaultSelected === 'string') {
        const initial = options.find((opt) => opt.value === defaultSelected) || null;
        setSelected(initial);
        onChange(initial);
      }
    }
    // Run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button id={dropdownId} className={styles.toggle} onClick={toggleOpen} aria-haspopup="listbox" aria-expanded={isOpen}>
        {isMulti
          ? (selected as Option[]).map((o) => o.label).join(', ') || placeholder
          : (selected as Option)?.label || placeholder}
        <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${isSelected(option) ? styles.selected : ''}`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={isSelected(option)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSelect(option);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
