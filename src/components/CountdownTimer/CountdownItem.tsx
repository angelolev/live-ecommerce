import React from 'react';
import styles from './CountdownItem.module.css';

interface CountdownItemProps {
  value: number;
  label: string;
}

export const CountdownItem: React.FC<CountdownItemProps> = ({ value, label }) => {
  return (
    <div className={styles.countdownItem}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};