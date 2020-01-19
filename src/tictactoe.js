import React, { useState } from "react";
import "./styles/index.css";
import logo from "./img/logo.webp";
import Board from "./components/Board.js";
import GameOver from "./components/Gameover.js";
import { getWinner, lineStyle, canComputerWin } from "./helpers/winner.js";
import getBestMove from "./helpers/switcher.js";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [canPlay, setCanPlay] = useState(true);

  function clickOnSquare(i) {
    const squareCopy = [...squares];
    const winner = getWinner(squareCopy);

    if (winner || squareCopy[i] || canPlay === false) {
      return;
    }
    squareCopy[i] = "X";

    if (!canComputerWin(squareCopy)) {
      squareCopy[i] = "O";
    }

    setSquares(squareCopy);
    setCanPlay(false);

    if (!getWinner(squareCopy)) {
      setTimeout(() => {
        squareCopy[getBestMove(squareCopy)] = "O";
        if (getWinner(squareCopy)) {
          allowToMakeMove(true);
        }
        setSquares(squareCopy);
        allowToMakeMove(true);
      }, 500);
    } else {
      allowToMakeMove(true);
    }
  }

  function allowToMakeMove(TrueOrFalse) {
    setCanPlay(TrueOrFalse);
  }
  function restartGame() {
    setSquares(Array(9).fill(null));
  }

  let winner = getWinner(squares);
  let winningline = lineStyle(squares);

  return (
    <div className="container">
      <div id="logo">
        <img src={logo} alt="" />
        <h1 id="title">But You Always Loose</h1>
      </div>
      <Board
        squares={squares}
        onClick={i => clickOnSquare(i)}
        lineStyle={winningline}
      />
      <GameOver winner={winner} onClick={() => restartGame()} />
    </div>
  );
}

export default Game;
