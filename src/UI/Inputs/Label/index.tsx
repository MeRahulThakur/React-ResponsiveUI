import React, { LabelHTMLAttributes } from 'react';
import styles from './Label.module.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, required, ...props }) => {
  return (
    <label className={styles.label} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
};

export default Label;
