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
      onClick={props.clickOnSquare}
      aria-label={props.arialabel}
    >
      {iconClassName === "null" ? null : (
        <i className={iconClassName} style={props.fontSize}></i>
      )}
    </button>
  );
}

const Board = React.forwardRef((props, ref) => {
  function renderSquare(squareSize, i) {
    return (
      <Square
        value={props.squares[i]}
        clickOnSquare={() => props.clickOnSquare(i)}
        squareStyle={{ width: squareSize, height: squareSize }}
        fontSize={{ fontSize: squareSize / 1.5 }}
        arialabel={`board field no. ${i + 1}`}
      />
    );
  }

  function renderBoard({ height, width }) {
    let shorterSide = Math.min(height, width);
    let squareSize = shorterSide / 3.4;
    return (
      <div className="board">
        <div className="board-row">
          {renderSquare(squareSize, 0)}
          {renderSquare(squareSize, 1)}
          {renderSquare(squareSize, 2)}
        </div>
        <div className="board-row">
          {renderSquare(squareSize, 3)}
          {renderSquare(squareSize, 4)}
          {renderSquare(squareSize, 5)}
        </div>
        <div className="board-row">
          {renderSquare(squareSize, 6)}
          {renderSquare(squareSize, 7)}
          {renderSquare(squareSize, 8)}
        </div>
        <div className="gridLines"></div>
        <div className="gridLines rotate"></div>
        <div className="line" style={props.lineStyle} />
      </div>
    );
  }

  {
    return (
      <SizeMe
        monitorHeight
        render={({ size }) => <div className="game">{renderBoard(size)}</div>}
      />
    );
  }
});
export default Board;
