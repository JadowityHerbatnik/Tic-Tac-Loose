import React, { forwardRef } from "react";
import { X_tic, O_tic } from "./Svg";

interface Square {
  value: "X" | "O" | null;
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
      {active === "X" && X_tic(props.xSize)}
      {active === "O" && O_tic(props.circleSize)}
    </button>
  );
};
interface BoardProps {
  squares: Array<"X" | "O" | null>;
  clickOnSquare: (i: number) => void;
  lineStyle: {} | undefined;
  boardSize: number[];
}
const Board = forwardRef(
  (props: BoardProps, ref: React.Ref<HTMLDivElement>) => {
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
      <div ref={ref} id="game">
        <div id="board">
          {[...Array(3).keys()].map((index) => RenderRow(index * 3))}
          <div className="gridLine" id="id1"></div>
          <div className="gridLine" id="id2"></div>
          <div className="gridLine" id="id3"></div>
          <div className="gridLine" id="id4"></div>
          <div id="winningline" style={props.lineStyle} />
        </div>
      </div>
    );
  }
);
export default Board;
