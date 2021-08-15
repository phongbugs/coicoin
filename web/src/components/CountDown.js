import React, { useState, useEffect, useRef } from 'react';
export default function CountDown({ countdown }) {
  const [timeLeft, setTimeLeft] = useState(countdown);
  const timerRef = useRef();
  useEffect(() => {
    clearTimeout(timerRef.current);
    setTimeLeft(countdown);
  }, [countdown]);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else setTimeLeft(countdown);
  }, [timeLeft]);

  return <>{timeLeft}</>;
}
