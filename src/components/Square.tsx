import React from "react";
import { X_tic, O_tic } from "./Svg";

interface SquareProps {
  value: Square;
  squareSize: number;
  arialabel: string;
  xSize: number;
  circleSize: number;
  clickOnSquare: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const Square = (props: SquareProps) => {
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
