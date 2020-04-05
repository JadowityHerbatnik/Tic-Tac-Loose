import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import Header from "./Header";
import Board from "./Board";
import GameOver from "./Gameover";
import "../styles/index.css";
import {
  getWinningSquares,
  lineStyle,
  canComputerWin,
} from "../helpers/winner";
import getBestMove from "../helpers/switcher";

const Game: React.FC = () => {
  const [squares, setSquares] = useState<Squares>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
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
    setWinner(getWinningSquares(squares) ? true : false);
    if (!getWinningSquares(squares) && !playerTurn) {
      setTimeout(() => {
        setSquares((previous) => {
          previous[getBestMove(previous)] = "O";
          return previous;
        });
        setPlayerTurn(true);
      }, 500);
    }
  }, [squares, playerTurn]);
  const clickOnSquare = (i: number) => {
    const squaresCopy = [...squares];

    if (
      getWinningSquares(squaresCopy) ||
      squaresCopy[i] ||
      playerTurn === false
    ) {
      return;
    }
    squaresCopy[i] = "X";

    if (!canComputerWin(squaresCopy)) {
      squaresCopy[i] = "O";
    }

    setSquares(squaresCopy);
    setPlayerTurn(false);
  };
  return (
    <div className="container" style={{ height: innerHeight }}>
      <Header />
      <Board
        ref={boardRef}
        squares={squares}
        clickOnSquare={(i) => clickOnSquare(i)}
        lineStyle={lineStyle(squares)}
        boardSize={boardSize}
      />
      <GameOver
        winner={winner}
        resetGame={() => {
          setPlayerTurn(true);
          setSquares(Array(9).fill(null));
        }}
      />
    </div>
  );
};

export default Game;
