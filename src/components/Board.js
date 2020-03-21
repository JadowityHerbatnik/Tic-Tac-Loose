import React from "react";
import "../fontello/css/fontello.css";

const Square = props => {
  const iconClassName = `${
    props.value === null
      ? null
      : `icon-${props.value === "X" ? "cancel-1" : "record-outline"}`
  }`;
  return (
    <button
      className="square"
      style={props.squareStyle}
      onClick={props.clickOnSquare}
      aria-label={props.arialabel}
    >
      {props.value && <i className={iconClassName} style={props.fontSize}></i>}
    </button>
  );
};

const Board = React.forwardRef((props, ref) => {
  const [height, width] = props.boardSize;
  const squareSize = Math.min(height, width) / 3.4;

  const renderSquare = i => {
    return (
      <Square
        value={props.squares[i]}
        clickOnSquare={() => props.clickOnSquare(i)}
        squareStyle={{ width: squareSize, height: squareSize }}
        fontSize={{ fontSize: squareSize / 1.5 }}
        arialabel={`board field no. ${i + 1}`}
      />
    );
  };
  const generateRows = num =>
    [...Array(num).keys()].map(index => RenderRow(index * 3));

  const RenderRow = index => {
    for (let i = index; i < index + 3; i++) {
      return (
        <div key={index} className="board-row">
          {renderSquare(index)}
          {renderSquare(index + 1)}
          {renderSquare(index + 2)}
        </div>
      );
    }
  };

  return (
    <div ref={props.boardref} className="game">
      <div className="board">
        {generateRows(3)}
        <div className="gridLines"></div>
        <div className="gridLines rotate"></div>
        <div className="line" style={props.lineStyle} />
      </div>
    </div>
  );
});
export default Board;
