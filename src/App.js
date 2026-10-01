import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = () => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const totalSeconds = Math.floor(time / 1000);

    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      milliseconds: String(milliseconds).padStart(2, "0"),
    };
  };

  const formattedTime = formatTime();

  return (
    <div className="app">
      <div className="stopwatch-container">
        <h1>⏱️ Stopwatch</h1>

        <p className="subtitle">React Stopwatch Timer</p>

        <div className="timer">
          <span>{formattedTime.hours}</span>
          <span className="colon">:</span>

          <span>{formattedTime.minutes}</span>
          <span className="colon">:</span>

          <span>{formattedTime.seconds}</span>
          <span className="colon">:</span>

          <span className="milliseconds">
            {formattedTime.milliseconds}
          </span>
        </div>

        <div className="labels">
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
          <span>MS</span>
        </div>

        <div className="buttons">
          {!isRunning ? (
            <button className="start-btn" onClick={startTimer}>
              ▶ Start
            </button>
          ) : (
            <button className="pause-btn" onClick={pauseTimer}>
              ⏸ Pause
            </button>
          )}

          <button className="reset-btn" onClick={resetTimer}>
            🔄 Reset
          </button>
        </div>

        <div className="status">
          Status:{" "}
          <strong>{isRunning ? "Running" : "Stopped"}</strong>
        </div>
      </div>
    </div>
  );
}

export default App;