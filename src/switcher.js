import Minimax from "tic-tac-toe-minimax";

function getMove(squares) {
  const { ComputerMove } = Minimax;

  const symbols = {
    huPlayer: "X",
    aiPlayer: "O"
  };
  const difficulty = "Hard";
  const board = Array(9).fill(null);
  squares.forEach((value, index) => {
    board[index] = value ? value : index;
  });
  const nextMove = ComputerMove(board, symbols, difficulty);
  return nextMove;
}
export const nextMove = getMove;
