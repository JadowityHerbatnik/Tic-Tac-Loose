import React, { useState, useEffect } from "react";
import "../styles/fontello/css/fontello.css";
interface Props {
  winner: boolean;
  resetGame: () => void;
}
const GameOver: React.FC<Props> = ({ winner, resetGame }) => {
  const [shouldRender, setRender] = useState(winner);
  const [style, setStyle] = useState<{}>({ opacity: "0" });

  useEffect(() => {
    if (winner) {
      setRender(true);
      setStyle({ animation: "1s ease both 2s fadein" });
    } else {
      setStyle({ animation: "1s ease both fadeout" });
    }
  }, [winner]);
  const onAnimationEnd = () => {
    if (!winner) {
      setRender(false);
    }
  };
  return !shouldRender ? null : (
    <div id="gameOver" onAnimationEnd={onAnimationEnd} style={style}>
      <p id="gameOverText">
        You
        <br />L<span>ooo</span>se
      </p>
      <button id="resetButton" className="but" onClick={() => resetGame()}>
        <i className="icon-ccw"></i>
        Try Again
      </button>
    </div>
  );
};
export default GameOver;
