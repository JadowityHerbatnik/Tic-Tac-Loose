import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./Board.js";
import toe from "./toe.png";
import titac from "./tictac.ico";
import { getWinner } from "./winner.js";
import { lineStyle } from "./winner.js";
import { nextMove } from "./switcher.js";
import { switcher } from "./switcher.js";

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
      player: "X"
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = getWinner(current.squares);

    if (winner || squares[i]) {
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
      xIsNext: !this.state.xIsNext
    });

    if (this.state.stepNumber === 3) {
      if (switcher(squares) !== 100) {
        this.setState({ player: "O" });
        // squares[i] = this.state.player;
        squares[i] = "O";
      }
    } else {
      squares[i] = this.state.player;
    }

    if (!getWinner(squares)) {
      setTimeout(() => {
        squares[nextMove(squares)] = "O";
        this.setState({ squares: squares });
      }, 500);
    } else {
      this.setState({ player: "X" });
    }
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
    const winner = getWinner(current.squares);

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

    winningline = lineStyle();
    // if (winner) {
    //   winningline = lineStyle();

    //   status = "Winner: " + winner;
    // } else if (this.state.stepNumber === 9) {
    //   status = "Draw!";
    // } else {
    //   status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    // }
    if (winner) {
      winningline = lineStyle();
    }

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
