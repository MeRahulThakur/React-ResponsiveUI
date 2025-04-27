import React, { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import Label from '../Label';
import styles from './TextInput.module.css';

interface CommonTextInputProps {
  onValueChange: (value: string) => void;
  label?: string;
  id?: string;
  required?: boolean;
  isValid?: boolean;
  multiline?: boolean;  // To toggle between input and textarea
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;  // Handle onChange for both input and textarea
}

type TextInputProps = CommonTextInputProps & 
  (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

// Forward ref to support ref usage in parent component
const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>(
  ({ 
    onChange,
    onValueChange,
    isValid = true,
    label,
    id,
    required,
    multiline = false,  // Default to single-line input
    ...props
  }, ref) => {
    const inputId = id || `textinput-${Math.random().toString(36).slice(2)}`;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onValueChange?.(e.target.value);
      onChange?.(e);  // Handle onChange for both input and textarea
    };

    return (
      <div className={styles.wrapper}>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        {multiline ? (
          <textarea
            id={inputId}
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            className={`${styles.input} ${!isValid ? styles.invalid : ''}`}
            aria-invalid={!isValid}
            onChange={handleChange}
            required={required}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}  // Ensure correct typing for textarea
          />
        ) : (
          <input
            id={inputId}
            ref={ref as React.RefObject<HTMLInputElement>}
            className={`${styles.input} ${!isValid ? styles.invalid : ''}`}
            aria-invalid={!isValid}
            type="text"
            onChange={handleChange}
            required={required}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}  // Ensure correct typing for input
          />
        )}
      </div>
    );
  }
);

export default TextInput;
