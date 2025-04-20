import React from 'react';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  id?: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  label?: string;
  isValid?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  value,
  onChange,
  minDate,
  label,
  isValid = true,
}) => {
  return (
    <div className={`${styles.wrapper} ${!isValid ? styles.invalid : ''}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input
        id={id}
        type="date"
        className={styles.input}
        value={value}
        min={minDate}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
