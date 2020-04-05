import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import Header from "./Header";
import Board from "./Board";
import GameOver from "./Gameover";
import "../styles/index.css";
import { getWinner, lineStyle, canComputerWin } from "../helpers/winner";
import getBestMove from "../helpers/switcher";
const Game: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(
    Array(9).fill(null)
  );
  const [canPlay, setCanPlay] = useState(true);
  const [winner, setWinner] = useState(false);
  const [boardSize, setBoardSize] = useState([0, 0]);
  const boardRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    const recalculate = debounce(() => {
      if (boardRef.current) {
        const { width, height } = boardRef.current.getBoundingClientRect();
        setBoardSize([height, width]);
      }
      setInnerHeight(window.innerHeight);
    }, 100);
    window.addEventListener("resize", recalculate);
    recalculate();
    return () => window.removeEventListener("resize", recalculate);
  }, [innerHeight]);

  useEffect(() => {
    setWinner(getWinner(squares) ? true : false);
    if (!getWinner(squares) && !canPlay) {
      setTimeout(() => {
        setSquares((previous) => {
          previous[getBestMove(previous)] = "O";
          return previous;
        });
        setCanPlay(true);
      }, 500);
    }
  }, [squares, canPlay]);
  function clickOnSquare(i: number) {
    const squareCopy = [...squares];

    if (getWinner(squareCopy) || squareCopy[i] || canPlay === false) {
      return;
    }
    squareCopy[i] = "X";

    if (!canComputerWin(squareCopy)) {
      squareCopy[i] = "O";
    }

    setSquares(squareCopy);
    setCanPlay(false);
  }

  let winningline = lineStyle(squares);

  return (
    <div className="container" style={{ height: innerHeight }}>
      <Header />
      <Board
        ref={boardRef}
        squares={squares}
        clickOnSquare={(i) => clickOnSquare(i)}
        lineStyle={winningline}
        boardSize={boardSize}
      />
      <GameOver
        winner={winner}
        resetGame={() => {
          setCanPlay(true);
          setSquares(Array(9).fill(null));
        }}
      />
    </div>
  );
};

export default Game;
