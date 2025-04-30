import React from 'react';
import styles from './DatePicker.module.css';

type PickerMode = 'date' | 'time' | 'datetime-local';

interface DatePickerProps {
  id?: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  label?: string;
  isValid?: boolean;
  mode?: PickerMode;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  value,
  onChange,
  minDate,
  label,
  isValid = true,
  mode = 'date',
  placeholder
}) => {
  return (
    <div className={`${styles.wrapper} ${!isValid ? styles.invalid : ''}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input
        id={id}
        type={mode}
        placeholder={placeholder}
        className={styles.input}
        value={value}
        min={minDate}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
