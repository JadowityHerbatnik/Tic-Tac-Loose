import React from "react";
import { SizeMe } from "react-sizeme";
import "../fontello/css/fontello.css";

function Square(props) {
  const className = `${
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
      <div className={`tic ${props.value}`} style={props.ticFont}>
        <i className={className}></i>
      </div>
    </button>
  );
}
function LineDiv(props) {
  return <div className={props.className} style={props.lineStyle}></div>;
}

class Board extends React.Component {
  renderSquare({ height, width }, i) {
    let shorterSide = Math.min(height, width);
    let squareSize = shorterSide / 3.4;
    let squareStyle = { width: squareSize, height: squareSize };

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        squareStyle={squareStyle}
        ticFont={{ fontSize: squareSize / 15 }}
      />
    );
  }

  render() {
    return (
      <SizeMe
        monitorHeight
        render={({ size }) => (
          <div className="game">
            <div className="board">
              <div className="board-row">
                {this.renderSquare(size, 0)}
                {this.renderSquare(size, 1)}
                {this.renderSquare(size, 2)}
              </div>
              <div className="board-row">
                {this.renderSquare(size, 3)}
                {this.renderSquare(size, 4)}
                {this.renderSquare(size, 5)}
              </div>
              <div className="board-row">
                {this.renderSquare(size, 6)}
                {this.renderSquare(size, 7)}
                {this.renderSquare(size, 8)}
              </div>
              <div className="gridLines"></div>
              <div className="gridLines rotate"></div>
              <LineDiv className="line" lineStyle={this.props.lineStyle} />
            </div>
          </div>
        )}
      />
    );
  }
}
export default Board;
