import React, { useState, useEffect, useRef } from "react";
import "../styles/index.css";
import Header from "./Header.js";
import Board from "./Board.js";
import GameOver from "./Gameover.js";
import { getWinner, lineStyle, canComputerWin } from "../helpers/winner.js";
import getBestMove from "../helpers/switcher.js";

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [canPlay, setCanPlay] = useState(true);
  const [winner, setWinner] = useState(false);
  const [boardSize, setBoardSize] = useState([0, 0]);
  const boardref = useRef(null);
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const recalculate = () => {
      const { width, height } = boardref.current.getBoundingClientRect();
      setVh(window.innerHeight);
      setBoardSize([height, width]);
    };
    window.addEventListener("resize", recalculate);
    recalculate();
    return () => window.removeEventListener("resize", recalculate);
  }, [vh]);
  useEffect(() => {
    setWinner(getWinner(squares) ? true : false);
    if (!getWinner(squares) && !canPlay) {
      setTimeout(() => {
        setSquares(previous => {
          previous[getBestMove(previous)] = "O";
          return previous;
        });
        setCanPlay(true);
      }, 500);
    }
  }, [squares, canPlay]);
  function clickOnSquare(i) {
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
    <div className="container" style={{ height: vh }}>
      <Header />
      <Board
        boardref={boardref}
        squares={squares}
        clickOnSquare={i => clickOnSquare(i)}
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
