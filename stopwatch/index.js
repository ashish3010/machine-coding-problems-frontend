import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(true);
  const [timeStamp, setTimeStamp] = useState([]);
  const timerRef = useRef();

  useEffect(() => {
    if (start && !pause) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }
    return () => {
      if (start) {
        clearInterval(timerRef.current);
      }
    };
  }, [start, pause]);

  const handleButtons = (state) => {
    if (state === "start") {
      setStart(true);
      setPause(false);
      return;
    }
    if (state === "pause") {
      setStart(false);
      setPause(true);
      return;
    }
    setTimer(0);
    setPause(true);
    setStart(false);
  };

  const formatTime = (time) => {
    let rem = time;
    let hrs = Math.floor(rem / 3600000) || 0;
    rem = rem % 3600000;
    let min = Math.floor(rem / 60000) || 0;
    rem = rem % 60000;
    let sec = Math.floor(rem / 1000) || 0;
    rem = rem % 1000;
    let millisec = rem;
    return `${hrs < 10 ? `0${hrs}` : hrs} : ${min < 10 ? `0${min}` : min} : ${
      sec < 10 ? `0${sec}` : sec
    } : ${
      millisec < 10
        ? `00${millisec}`
        : millisec < 100
        ? `0${millisec}`
        : millisec
    }`;
  };

  return (
    <div className="App">
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          padding: 16,
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button disabled={start} onClick={() => handleButtons("start")}>
            Start
          </button>
          <button disabled={pause} onClick={() => handleButtons("pause")}>
            Pause
          </button>
          <button onClick={() => handleButtons("reset")}>Reset</button>
          <button
            disabled={!timer}
            onClick={() =>
              setTimeStamp((prev) => [
                { id: timeStamp.length + 1, time: formatTime(timer) },
                ...prev,
              ])
            }
          >
            Flag
          </button>
          <button
            disabled={!timeStamp?.length}
            onClick={() => setTimeStamp([])}
          >
            Clear Timestamp
          </button>
        </div>
        <h2>{formatTime(timer)}</h2>
      </div>
      <div style={{ width: 200, margin: "20px auto" }}>
        {timeStamp.map(({ time, id }) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>{id}</h4>
            <h4>{time}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
