import React from "react";
import "./styles/index.css";
import logo from "./img/logo.png";
import Board from "./components/Board.js";
import GameOver from "./components/Gameover.js";
import { getWinner, lineStyle, canComputerWin } from "./helpers/winner.js";
import { nextMove } from "./helpers/switcher.js";

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

  clickOnSquare(i) {
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
        <Board
          squares={this.state.squares}
          onClick={i => this.clickOnSquare(i)}
          lineStyle={winningline}
        />
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
