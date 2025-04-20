import React, { useEffect, useState } from 'react';
import styles from './GroupedCheckBox.module.css';
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel';

export type Option = {
  label: string;
  value: string;
};

interface GroupedCheckBoxProps {
  options: Option[];
  defaultSelected?: string[];
  onChange: (selected: Option[]) => void;
  isValid?: boolean;
  orientation?: 'row' | 'column';
  id?: string;
}

const GroupedCheckBox: React.FC<GroupedCheckBoxProps> = ({
  options,
  defaultSelected = [],
  onChange,
  isValid = true,
  orientation = 'column',
  id,
}) => {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  useEffect(() => {
    const selectedOptions = options.filter(opt => selected.includes(opt.value));
    onChange(selectedOptions);
  }, [selected, onChange, options]);

  const handleToggle = (value: string) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <div
      className={`${styles.group} ${orientation === 'row' ? styles.row : styles.column}`}
      data-invalid={!isValid ? true : false} 
      id={id}
    >
      {options.map(option => (
        <CheckboxWithLabel
          key={option.value}
          id={`${id}-${option.value}`}
          label={option.label}
          checked={selected.includes(option.value)}
          onChange={() => handleToggle(option.value)}
        />
      ))}
    </div>
  );
};

export default GroupedCheckBox;
