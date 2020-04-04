import React from "react";
interface CircleSvg {
  circleSize: number;
}
interface XSvg {
  xSize: number;
}
const O_tic = (props: CircleSvg) => {
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
        transform={`rotate(-90, ${props.circleSize / 2}, ${
          props.circleSize / 2
        })`}
      />
    </svg>
  );
};
const Line = (props: XSvg, rotated: boolean) => {
  return (
    <line
      className="xline"
      id={rotated ? "rotated" : ""}
      x1="0"
      y1={props.xSize / 2}
      x2={props.xSize}
      y2={props.xSize / 2}
      strokeWidth={props.xSize / 8}
      strokeDasharray={props.xSize}
      strokeDashoffset={props.xSize}
      transform={`rotate(${rotated ? 135 : 45}, ${props.xSize / 2}, ${
        props.xSize / 2
      }) `}
    />
  );
};
const X_tic = (props: XSvg) => {
  return (
    <svg width={props.xSize} height={props.xSize}>
      {Line(props, false)}
      {Line(props, true)}
    </svg>
  );
};
interface Square {
  value: string | null;
  squareSize: number;
  arialabel: string;
  xSize: number;
  circleSize: number;
  clickOnSquare: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
const Square = (props: Square) => {
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
interface BoardProps {
  boardRef: any;
  squares: Array<string | null>;
  clickOnSquare: (i: number) => void;
  lineStyle: {} | undefined;
  boardSize: number[];
}
type Ref = HTMLDivElement | null;
const Board: React.FC<BoardProps> = React.forwardRef(
  (props: BoardProps, ref) => {
    const [height, width] = props.boardSize;
    const squareSize = Math.min(height, width) / 3.4;

    const renderSquare = (i: number) => {
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

    const RenderRow = (index: number) => {
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
      <div ref={props.boardRef} className="game">
        <div className="board">
          {[...Array(3).keys()].map((index) => RenderRow(index * 3))}
          <div className="gridLine" id="id1"></div>
          <div className="gridLine" id="id2"></div>
          <div className="gridLine" id="id3"></div>
          <div className="gridLine" id="id4"></div>
          <div className="line" style={props.lineStyle} />
        </div>
      </div>
    );
  }
);
export default Board;
