import React from "react";
import "./index.css";
import "./fontello/css/fontello.css";
import logo from "./img/logo.png";
import Board from "./Board.js";
import GameOver from "./gameover.js";
import { getWinner, lineStyle, canComputerWin } from "./winner.js";
import { nextMove } from "./switcher.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      stepNumber: 0,
      player: "X",
      canPlay: true
    };
  }

  handleClick(i) {
    const squares = this.state.squares;
    const winner = getWinner(squares);

    if (winner || squares[i] || this.state.canPlay === false) {
      return;
    }
    squares[i] = this.state.player;
    this.setState({
      squares: squares,
      stepNumber: this.state.stepNumber + 1,
      canPlay: false
    });

    if (!canComputerWin(squares)) {
      squares[i] = "O";
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
  restartGame() {
    this.setState({
      squares: Array(9).fill(null),
      stepNumber: 0
    });
  }

  render() {
    let winner = getWinner(this.state.squares);
    let winningline = lineStyle(this.state.squares);

    return (
      <div className="container">
        <div id="logo">
          <img src={logo} alt="" />
          <p id="title">But You Always Loose</p>
        </div>
        <div className="game">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
            lineStyle={winningline}
          />
        </div>
        <GameOver
          winner={winner}
          currentStep={this.state.stepNumber}
          onClick={() => this.restartGame()}
        />
      </div>
    );
  }
}

// ========================================

export default Game;
// ReactDOM.render(<Game />, document.getElementById("root"));
