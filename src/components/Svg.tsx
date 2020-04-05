import React from "react";

export const O_tic = (circleSize: number) => {
  return (
    <svg width={circleSize} height={circleSize}>
      <circle
        className="circle"
        cx={circleSize / 2}
        cy={circleSize / 2}
        strokeWidth={circleSize / 13}
        strokeDasharray={(circleSize / 4) * 6.28}
        strokeDashoffset={(circleSize / -4) * 6.28}
        r={circleSize / 4}
        transform={`rotate(-90, ${circleSize / 2}, ${circleSize / 2})`}
      />
    </svg>
  );
};
export const X_tic = (xSize: number) => {
  return (
    <svg width={xSize} height={xSize}>
      {Line(xSize, false)}
      {Line(xSize, true)}
    </svg>
  );
};
const Line = (xSize: number, rotated: boolean) => {
  return (
    <line
      className="xline"
      id={rotated ? "rotated" : ""}
      x1="0"
      y1={xSize / 2}
      x2={xSize}
      y2={xSize / 2}
      strokeWidth={xSize / 8}
      strokeDasharray={xSize}
      strokeDashoffset={xSize}
      transform={`rotate(${rotated ? 135 : 45}, ${xSize / 2}, ${xSize / 2}) `}
    />
  );
};
