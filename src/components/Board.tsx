import React, { forwardRef } from "react";
import { Square } from "./Square";

interface BoardProps {
  squares: Square[];
  clickOnSquare: (i: number) => void;
  lineStyle: lineStyle | undefined;
  boardSize: number[];
}
const Board = forwardRef((props: BoardProps, ref: React.Ref<HTMLDivElement>) => {
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
  const RenderGridLines = (number: number) =>
    [...Array(number).keys()].map((index) => (
      <div key={index} className="gridLine" id={`id${index}`} />
    ));

  return (
    <div ref={ref} id="game">
      <div id="board">
        {[...Array(3).keys()].map((index) => RenderRow(index * 3))}
        {RenderGridLines(4)}
        <div id="winningline" style={props.lineStyle} />
      </div>
    </div>
  );
});
export default Board;
