import { useState, useEffect } from "react";
import "./App.css";

export const frameWidth = 720; // Width of one frame
export const frameHeight = 720; // Height of one frame
export const totalFrames = 156; // Total number of frames
export const animationSpeed = 50; // Speed of the animation in milliseconds

function App() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % totalFrames);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, []);

  const calculateBackgroundPosition = () => {
    return `-${frame * frameWidth}px 0px`;
  };

  return (
    <div
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
