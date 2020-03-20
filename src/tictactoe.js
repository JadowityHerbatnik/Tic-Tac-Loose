import React, { useState, useEffect, useRef } from "react";
import "./styles/index.css";
import Header from "./components/Header.js";
import Board from "./components/Board.js";
import GameOver from "./components/Gameover.js";
import { getWinner, lineStyle, canComputerWin } from "./helpers/winner.js";
import getBestMove from "./helpers/switcher.js";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [canPlay, setCanPlay] = useState(true);
  const [winner, setWinner] = useState(false);
  const boardref = useRef(null);
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
    <div className="container">
      <Header />
      <Board
        boardref={boardref}
        squares={squares}
        clickOnSquare={i => clickOnSquare(i)}
        lineStyle={winningline}
      />
      <GameOver
        winner={winner}
        resetGame={() => setSquares(Array(9).fill(null))}
      />
    </div>
  );
}

export default Game;
