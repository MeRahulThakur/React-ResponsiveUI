import React, { useEffect, useState } from 'react';
import styles from './GroupedRadio.module.css';

export type Option = {
  label: string;
  value: string;
};

interface GroupedRadioProps {
  id?: string;
  options: Option[];
  defaultSelected?: string;
  onChange: (selected: Option | null) => void;
  isValid?: boolean;
  label?: string;
  orientation?: 'row' | 'column';
}

const GroupedRadio: React.FC<GroupedRadioProps> = ({
  id,
  options,
  defaultSelected,
  onChange,
  isValid = true,
  label,
  orientation = 'column'
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (defaultSelected) {
      setSelected(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    const selectedOption = options.find(opt => opt.value === selected) || null;
    onChange(selectedOption);
  }, [selected, onChange, options]);

  return (
    <div className={`${styles.groupedRadio} ${orientation === 'row' ? styles.row : styles.column} ${isValid === false ? styles.invalid : ''}`} data-invalid={!isValid ? true : false} role="radiogroup" aria-labelledby={id}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      {options.map(option => (
        <label key={option.value} className={styles.option}>
          <input
            type="radio"
            name={id}
            value={option.value}
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default GroupedRadio;
