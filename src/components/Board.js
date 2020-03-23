import React from "react";

const O_tic = props => {
  return (
    <svg width={props.circleSize} height={props.circleSize}>
      <circle
        className="circle"
        cx={props.circleSize / 2}
        cy={props.circleSize / 2}
        strokeWidth={props.circleSize / 13}
        strokeDasharray={(props.circleSize / 4) * 6.28}
        strokeDashoffset={(props.circleSize / -4) * 6.28}
        r={props.circleSize / 4}
        transform={`rotate(-90, ${props.circleSize / 2}, ${props.circleSize /
          2})`}
      />
    </svg>
  );
};
const Line = (props, rotated) => {
  return (
    <line
      className="xline"
      id={rotated ? "rotated" : null}
      x1="0"
      y1={props.xSize / 2}
      x2={props.xSize}
      y2={props.xSize / 2}
      strokeWidth={props.xSize / 8}
      strokeDasharray={props.xSize}
      strokeDashoffset={props.xSize}
      transform={`rotate(${rotated ? 135 : 45}, ${props.xSize /
        2}, ${props.xSize / 2}) `}
    />
  );
};
const X_tic = props => {
  return (
    <svg width={props.xSize} height={props.xSize}>
      {Line(props, false)}
      {Line(props, true)}
    </svg>
  );
};
const Square = props => {
  const active = props.value;
  return (
    <button
      className="square"
      style={{ width: props.squareSize, height: props.squareSize }}
      onClick={props.clickOnSquare}
      aria-label={props.arialabel}
    >
      {active === "X" && X_tic(props)}
      {active === "O" && O_tic(props)}
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
        squareSize={squareSize}
        circleSize={squareSize / 1.2}
        xSize={squareSize / 2}
        arialabel={`board field no. ${i + 1}`}
      />
    );
  };

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
        {[...Array(3).keys()].map(index => RenderRow(index * 3))}
        <div className="gridLine" id="id1"></div>
        <div className="gridLine" id="id2"></div>
        <div className="gridLine" id="id3"></div>
        <div className="gridLine" id="id4"></div>
        <div className="line" style={props.lineStyle} />
      </div>
    </div>
  );
});
export default Board;
