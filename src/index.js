import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fontello/css/fontello.css";
import toe from "./img/toe.png";
import titac from "./img/tictac.ico";
import Board from "./Board.js";
import Buttons from "./buttons.js";
import { getWinner, lineStyle } from "./winner.js";
import { nextMove, switcher } from "./switcher.js";

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
  stepInHistory(direction) {
    const history = this.state.history;
    const currentStep = this.state.stepNumber;
    if (
      (direction === 1 && currentStep === history.length - 1) ||
      (direction === -1 && currentStep === 0)
    ) {
      return 1;
    }
    this.setState({
      stepNumber: currentStep + direction
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let winningline;

    winningline = lineStyle(current.squares);

    return (
      <div className="container">
        <div id="logo">
          <img src={titac} className="tictac" alt="" />
          <img src={toe} className="logo" alt="" />
          <p id="title">But You Always Loose</p>
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              lineStyle={winningline}
            />
          </div>
          <Buttons
            currentStep={this.state.stepNumber}
            stepInHistory={direction => this.stepInHistory(direction)}
          />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
