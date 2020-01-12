import React from "react";
import "./styles/index.css";
import logo from "./img/logo.png";
import Board from "./components/Board.js";
import GameOver from "./components/Gameover.js";
import { getWinner, lineStyle, canComputerWin } from "./helpers/winner.js";
import getBestMove from "./helpers/switcher.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      canPlay: true
    };
  }

  clickOnSquare(i) {
    const squares = this.state.squares;
    const winner = getWinner(squares);

    if (winner || squares[i] || this.state.canPlay === false) {
      return;
    }
    squares[i] = "X";

    if (!canComputerWin(squares)) {
      squares[i] = "O";
    }

    this.setState({
      squares: squares,
      canPlay: false
    });

    if (!getWinner(squares)) {
      setTimeout(() => {
        squares[getBestMove(squares)] = "O";
        if (getWinner(squares)) {
          this.allowToMakeMove();
        }
        this.setState({ squares: squares, canPlay: true });
      }, 500);
    } else {
      this.allowToMakeMove();
    }
  }
  allowToMakeMove() {
    this.setState({ canPlay: true });
  }
  restartGame() {
    this.setState({
      squares: Array(9).fill(null)
    });
  }

  render() {
    let winner = getWinner(this.state.squares);
    let winningline = lineStyle(this.state.squares);

    return (
      <div className="container">
        <div id="logo">
          <img src={logo} alt="" />
          <h1 id="title">But You Always Loose</h1>
        </div>
        <Board
          squares={this.state.squares}
          onClick={i => this.clickOnSquare(i)}
          lineStyle={winningline}
        />
        <GameOver winner={winner} onClick={() => this.restartGame()} />
      </div>
    );
  }
}

// ========================================

export default Game;
// ReactDOM.render(<Game />, document.getElementById("root"));
