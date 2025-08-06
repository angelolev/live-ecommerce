import React from "react";
import { CountdownItem } from "./CountdownItem";
import type { CountdownData } from "../../ecommerceMockData";
import styles from "./CountdownTimer.module.css";

interface CountdownTimerProps {
  countdown: CountdownData;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  countdown,
}) => {
  return (
    <div className={styles.countdownTimer}>
      <CountdownItem value={countdown.days} label="Days" />
      <CountdownItem value={countdown.hours} label="Hours" />
      <CountdownItem value={countdown.minutes} label="Minutes" />
      <CountdownItem value={countdown.seconds} label="Seconds" />
    </div>
  );
};
