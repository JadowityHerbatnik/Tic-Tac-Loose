declare module "tic-tac-toe-minimax";
interface winningLine {
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  transform?: string;
}
type Squares = Array<"X" | "O" | null>;
type lineStyle = winningLine | undefined;
