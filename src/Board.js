import React from "react";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
function LineDiv(props) {
  return <div className={props.className} style={props.lineStyle}></div>;
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderlineStyle() {
    return <LineDiv className="chuj" lineStyle={this.props.lineStyle} />;
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>{this.renderlineStyle()}</div>
      </div>
    );
  }
}
export default Board;
