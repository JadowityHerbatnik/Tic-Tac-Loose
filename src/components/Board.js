import React from "react";
import { SizeMe } from "react-sizeme";
import "../fontello/css/fontello.css";

function Square(props) {
  const iconClassName = `${
    props.value === null
      ? null
      : `icon-${props.value === "X" ? "cancel-1" : "record-outline"}`
  }`;
  return (
    <button
      className="square"
      style={props.squareStyle}
      onClick={props.onClick}
    >
      <div className={`tic ${props.value}`} style={props.fontSize}>
        <i className={iconClassName}></i>
      </div>
    </button>
  );
}

class Board extends React.Component {
  renderSquare(squareSize, i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        squareStyle={{ width: squareSize, height: squareSize }}
        fontSize={{ fontSize: squareSize / 15 }}
      />
    );
  }

  renderBoard({ height, width }) {
    let shorterSide = Math.min(height, width);
    let squareSize = shorterSide / 3.4;
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(squareSize, 0)}
          {this.renderSquare(squareSize, 1)}
          {this.renderSquare(squareSize, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(squareSize, 3)}
          {this.renderSquare(squareSize, 4)}
          {this.renderSquare(squareSize, 5)}
        </div>
        <div className="board-row">
          {this.renderSquare(squareSize, 6)}
          {this.renderSquare(squareSize, 7)}
          {this.renderSquare(squareSize, 8)}
        </div>
        <div className="gridLines"></div>
        <div className="gridLines rotate"></div>
        <div className="line" style={this.props.lineStyle} />
      </div>
    );
  }

  render() {
    return (
      <SizeMe
        monitorHeight
        render={({ size }) => (
          <div className="game">{this.renderBoard(size)}</div>
        )}
      />
    );
  }
}
export default Board;
