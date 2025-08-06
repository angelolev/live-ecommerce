import React from 'react';
import { Button } from '../Button/Button';
import styles from './HeroBanner.module.css';

export const HeroBanner: React.FC = () => {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.content}>
        <h1 className={styles.title}>Black Friday Sale</h1>
        <p className={styles.subtitle}>Up to 70% off on selected items. Limited time only!</p>
        <Button size="large" onClick={() => console.log('Shop Now clicked')}>
          Shop Now
        </Button>
      </div>
    </section>
  );
};