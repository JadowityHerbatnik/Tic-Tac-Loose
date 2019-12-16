import Minimax from "tic-tac-toe-minimax";
import Engine from "thaw-tic-tac-toe-engine";

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
function ifSwitch(squares) {
  const board = Array(9).fill(" ");
  squares.forEach((value, index) => {
    if (value === null) {
      board[index] = " ";
    } else {
      board[index] = value;
    }
  });
  var board2string = board.join("");
  let result = Engine.findBestMove(board2string, 4);
  return result.bestScore;
}
export const nextMove = getMove;
export const switcher = ifSwitch;
