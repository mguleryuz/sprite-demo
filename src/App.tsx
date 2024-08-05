import { useState, useEffect, useRef } from "react";
import "./App.css";

export const frameWidth = 720; // Width of one frame
export const frameHeight = 720; // Height of one frame
export const totalFrames = 156; // Total number of frames
export const animationSpeed = 50; // Speed of the animation in milliseconds

const seq = {
  idle: {
    start: 0,
    end: 61,
  },
  punch: {
    start: 62,
    end: 87,
  },
  phaseBack: {
    start: 88,
    end: 156,
  },
};

function App() {
  const [state, setState] = useState<"idle" | "punch" | "phaseBack">("idle");
  const [frame, setFrame] = useState(0);
  const timeoutRef = useRef<Timer | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => {
        const { start, end } = seq[state];
        return prevFrame < end ? prevFrame + 1 : start;
      });
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [state]);

  const calculateBackgroundPosition = () => {
    return `-${frame * frameWidth}px 0px`;
  };

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setState("punch");
    setFrame(seq.punch.start);

    timeoutRef.current = setTimeout(() => {
      setState("phaseBack");
      setFrame(seq.phaseBack.start);

      timeoutRef.current = setTimeout(() => {
        setState("idle");
        setFrame(seq.idle.start);
      }, animationSpeed * (seq.phaseBack.end - seq.phaseBack.start));
    }, animationSpeed * (seq.punch.end - seq.punch.start));
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="sprite"
        style={{
          backgroundPosition: calculateBackgroundPosition(),
        }}
      ></div>
    </div>
  );
}

export default App;
