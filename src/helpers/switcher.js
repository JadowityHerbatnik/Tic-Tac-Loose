import Minimax from "tic-tac-toe-minimax";

function getBestMove(squares) {
  const { ComputerMove } = Minimax;

  const symbols = {
    huPlayer: "X",
    aiPlayer: "O"
  };
  const difficulty = "Hard";
  const board = squares.map((value, index) => {
    return value ? value : index;
  });
  return ComputerMove(board, symbols, difficulty);
}
export default getBestMove;
