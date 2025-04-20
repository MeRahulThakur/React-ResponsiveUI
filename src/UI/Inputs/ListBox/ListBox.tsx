import React, { useEffect, useState, useRef, useId } from 'react';
import styles from './ListBox.module.css';

export type Option = {
  label: string;
  value: string;
};

interface ListBoxProps {
  id?: string; 
  options: Option[];
  isMulti?: boolean;
  defaultSelected?: string | string[];
  onChange: (selected: Option | Option[] | null) => void;
  height?: string|number;
  width?: string|number;
  isValid?: boolean;
}

const ListBox: React.FC<ListBoxProps> = ({
  options,
  isMulti = false,
  defaultSelected,
  onChange,
  height = '200px',
  width = '200px',
  id,
  isValid = true
}) => {
  const [selected, setSelected] = useState<Option[]>([]);
  const isDefaultApplied = useRef(false); // prevent resetting after initial apply

  const generatedId = useId();
  const listBoxId = id || generatedId;

  useEffect(() => {
    if (!defaultSelected || options.length === 0 || isDefaultApplied.current) return;

    let initialSelected: Option[] = [];

    if (Array.isArray(defaultSelected)) {
      initialSelected = options.filter(opt => defaultSelected.includes(opt.value));
    } else {
      const match = options.find(opt => opt.value === defaultSelected);
      if (match) initialSelected = [match];
    }

    setSelected(initialSelected);
    isDefaultApplied.current = true;
  }, [defaultSelected, options]);

  useEffect(() => {
    onChange(isMulti ? selected : selected[0] || null);
  }, [selected, isMulti, onChange]);

  const handleSelect = (option: Option) => {
    setSelected(prev => {
      if (isMulti) {
        const exists = prev.some(o => o.value === option.value);
        return exists ? prev.filter(o => o.value !== option.value) : [...prev, option];
      } else {
        return [option];
      }
    });
  };

  const isSelected = (option: Option) => selected.some(o => o.value === option.value);

  return (
    <div id={listBoxId} className={`${styles.listbox} ${!isValid ? styles.invalid : ''}`} style={{ maxHeight: height, maxWidth: width }} role="listbox">
      {options.map(option => (
        <div
          key={option.value}
          className={`${styles.option} ${isSelected(option) ? styles.selected : ''}`}
          role="option"
          aria-selected={isSelected(option)}
          onClick={() => handleSelect(option)}
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSelect(option)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ListBox;
