import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import Label from '../Label';
import styles from './TextInput.module.css';

//interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange: (value: string) => void;
  label?: string;
  id?: string;
  required?: boolean;
  isValid?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ 
  onChange,
  onValueChange,
  isValid = true,
  label,
  id,
  required,
  ...props
 }) => {
  const inputId = id || `textinput-${Math.random().toString(36).slice(2)}`;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <input
        id={inputId}
        className={`${styles.input} ${!isValid ? styles.invalid : ''}`}
        aria-invalid={!isValid}
        type="text"
        onChange={handleChange}
        required={required}
        {...props}
      />
    </div>
  )
};

export default TextInput;
