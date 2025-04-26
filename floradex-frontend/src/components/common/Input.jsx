import { useState } from 'react';
import styles from './Input.module.css';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = ''
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${error ? styles.error : ''} ${focused ? styles.focused : ''}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};