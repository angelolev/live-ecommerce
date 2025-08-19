import React, { useState, useEffect } from "react";
import { CountdownItem } from "./CountdownItem";
import { useActiveCountdownTimer } from "../../hooks/queries";
import styles from "./CountdownTimer.module.css";

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeUntil = (targetDate: Date): CountdownData => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export const CountdownTimer: React.FC = () => {
  const { data: activeTimer, isLoading, error } = useActiveCountdownTimer();
  const [countdown, setCountdown] = useState<CountdownData>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!activeTimer) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const updateCountdown = () => {
      const newCountdown = calculateTimeUntil(activeTimer.endDate);
      setCountdown(newCountdown);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [activeTimer]);

  if (isLoading) {
    return null;
  }

  if (error || !activeTimer) {
    return null;
  }

  const isExpired = countdown.days === 0 && countdown.hours === 0 && 
                   countdown.minutes === 0 && countdown.seconds === 0;

  if (isExpired) {
    return null;
  }

  return (
    <div className={styles.countdownContainer}>
      <h3 className={styles.title}>{activeTimer.title}</h3>
      <div className={styles.countdownTimer}>
        <CountdownItem value={countdown.days} label="Días" />
        <CountdownItem value={countdown.hours} label="Horas" />
        <CountdownItem value={countdown.minutes} label="Minutos" />
        <CountdownItem value={countdown.seconds} label="Segundos" />
      </div>
    </div>
  );
};