import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [time, setTime] = useState();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let timerFun;
    if (Number(timer) > 0) {
      timerFun = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => {
      clearInterval(timerFun);
    };
  }, [timer]);

  const formatTime = (time) => {
    let rem = time;
    let hrs = Math.floor(rem / 3600) || 0;
    rem = rem % 3600;
    let min = Math.floor(rem / 60) || 0;
    rem = rem % 60;
    let sec = rem;
    return `${hrs < 10 ? `0${hrs}` : hrs}:${min < 10 ? `0${min}` : min}:${
      sec < 10 ? `0${sec}` : sec
    }`;
  };

  return (
    <div className="App">
      <div>
        <input
          type="number"
          value={time}
          placeholder="enter seconds"
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          onClick={() => {
            setTimer(Math.ceil(Number(time)));
            setTime("");
          }}
        >
          start
        </button>
      </div>
      <div>
        <p>{formatTime(timer)}</p>
      </div>
      <button
        onClick={() => {
          setTime("");
          setTimer(0);
        }}
      >
        reset
      </button>
    </div>
  );
}
