import { useEffect, useRef, useState } from "react";
import { fetchCountdown } from "../api";

function splitTime(totalSeconds) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer() {
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [released, setReleased] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // Sync with server once on load (avoids client clock drift)
  useEffect(() => {
    fetchCountdown()
      .then((data) => {
        setSecondsRemaining(data.seconds_remaining);
        setReleased(data.released);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Local ticking, independent of the network after initial sync
  useEffect(() => {
    if (secondsRemaining === null) return;

    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setReleased(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [secondsRemaining === null]);

  if (error) return <div className="error">Error: {error}</div>;
  if (secondsRemaining === null) return <div className="loading">Loading...</div>;
  if (released) return <div className="released">GTA 6 IS OUT NOW 🎮</div>;

  const { days, hours, minutes, seconds } = splitTime(secondsRemaining);

  return (
    <div className="countdown">
      <div className="unit">
        <span className="value">{days}</span>
        <span className="label">Days</span>
      </div>
      <div className="unit">
        <span className="value">{String(hours).padStart(2, "0")}</span>
        <span className="label">Hours</span>
      </div>
      <div className="unit">
        <span className="value">{String(minutes).padStart(2, "0")}</span>
        <span className="label">Minutes</span>
      </div>
      <div className="unit">
        <span className="value">{String(seconds).padStart(2, "0")}</span>
        <span className="label">Seconds</span>
      </div>
    </div>
  );
}