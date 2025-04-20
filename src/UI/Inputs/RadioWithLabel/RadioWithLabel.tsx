import React from 'react';
import styles from './RadioWithLabel.module.css';

interface RadioWithLabelProps {
  id?: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RadioWithLabel: React.FC<RadioWithLabelProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}) => {
  const inputId = id || `radio-${name}-${value}`;

  return (
    <label htmlFor={inputId} className={styles.option}>
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radio}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioWithLabel;
