import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./Board.js";
import { getWinner, lineStyle } from "./winner.js";
import { nextMove, switcher } from "./switcher.js";
import toe from "./toe.png";
import titac from "./tictac.ico";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      player: "X",
      canPlay: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = getWinner(current.squares);
    const switchNumber = 3;

    if (winner || squares[i] || this.state.canPlay === false) {
      return;
    }
    squares[i] = this.state.player;
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      canPlay: false
    });

    if (this.state.stepNumber === switchNumber) {
      if (switcher(squares) !== 100) {
        this.setState({ player: "O" });
        squares[i] = "O";
      }
    } else {
      squares[i] = this.state.player;
    }

    if (!getWinner(squares)) {
      setTimeout(() => {
        squares[nextMove(squares)] = "O";
        if (getWinner(squares)) {
          this.reset();
        }
        this.setState({ squares: squares, canPlay: true });
      }, 500);
    } else {
      this.reset();
    }
  }
  reset() {
    this.setState({ player: "X", canPlay: true });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button className="but" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    let winningline;

    winningline = lineStyle(current.squares);

    return (
      <div className="game">
        <div className="game-board">
          <div>
            <img src={titac} className="tictac" alt="" />
            <img src={toe} className="logo" alt="" />
          </div>
          <div id="stat">{status}</div>
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            lineStyle={winningline}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
