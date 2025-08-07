import React, { useState, useEffect } from "react";
import { CountdownItem } from "./CountdownItem";
import { calculateTimeUntil, type CountdownData } from "../../ecommerceMockData";
import styles from "./CountdownTimer.module.css";

interface CountdownTimerProps {
  targetDate?: Date;
  title?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title = "Flash Sale Ends In:"
}) => {
  // Default to 3 days from now if no target date provided
  const defaultTargetDate = new Date();
  defaultTargetDate.setDate(defaultTargetDate.getDate() + 3);
  
  const actualTargetDate = targetDate || defaultTargetDate;
  
  // Validate that we have a valid date
  const isValidDate = actualTargetDate instanceof Date && !isNaN(actualTargetDate.getTime());
  
  const [countdown, setCountdown] = useState<CountdownData>(() => {
    if (!isValidDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return calculateTimeUntil(actualTargetDate);
  });

  useEffect(() => {
    if (!isValidDate) {
      return;
    }

    const interval = setInterval(() => {
      const newCountdown = calculateTimeUntil(actualTargetDate);
      setCountdown(newCountdown);
      
      // Stop the timer if countdown reaches zero
      if (newCountdown.days === 0 && newCountdown.hours === 0 && 
          newCountdown.minutes === 0 && newCountdown.seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [actualTargetDate, isValidDate]);

  return (
    <div className={styles.countdownContainer}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.countdownTimer}>
        <CountdownItem value={countdown.days} label="Días" />
        <CountdownItem value={countdown.hours} label="Horas" />
        <CountdownItem value={countdown.minutes} label="Minutos" />
        <CountdownItem value={countdown.seconds} label="Segundos" />
      </div>
    </div>
  );
};
