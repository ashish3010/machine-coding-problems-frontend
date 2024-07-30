import React, { useState, useEffect } from "react";
import "./styles.css";

const CountdownTimer = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins, secs };
  };

  const { mins, secs } = formatTime(time);

  return (
    <div className="countdown-timer">
      <DigitWrapper current={Math.floor(mins / 10)} />
      <DigitWrapper current={mins % 10} />
      <span>:</span>
      <DigitWrapper current={Math.floor(secs / 10)} />
      <DigitWrapper current={secs % 10} />
    </div>
  );
};

const DigitWrapper = ({ current }) => {
  const [prev, setPrev] = useState(current);
  const [shouldSlide, setShouldSlide] = useState(false);

  useEffect(() => {
    if (current !== prev) {
      setShouldSlide(true);
      const timer = setTimeout(() => {
        setPrev(current);
        setShouldSlide(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [current, prev]);

  return (
    <div className="digit-wrapper">
      <div className={`digit prev ${shouldSlide ? "slide-out" : ""}`}>
        {prev}
      </div>
      <div className={`digit current ${shouldSlide ? "slide-in" : ""}`}>
        {current}
      </div>
    </div>
  );
};

export default CountdownTimer;
