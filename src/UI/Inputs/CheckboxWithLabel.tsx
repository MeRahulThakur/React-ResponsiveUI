import React from 'react';
import styles from './CheckboxWithLabel.module.css';

interface CheckboxWithLabelProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  id?: string;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({ checked, onChange, label, id }) => {
  const checkboxId = id || `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <label htmlFor={checkboxId} className={styles.checkboxLabel}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
      />
      <span className={styles.customCheck} />
      {label}
    </label>
  );
};

export default CheckboxWithLabel;
