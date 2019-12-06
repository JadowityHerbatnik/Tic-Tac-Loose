let winnerSquares = [];

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  winnerSquares = [];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winnerSquares = [a, c];
      return squares[a];
    }
  }
  return null;
}

function getLineStyle() {
  if (winnerSquares.length > 0) {
    const lineStyle = {
      boxSizing: "border-box",
      position: "absolute",
      opacity: "0.8",
      top: "calc(100%*5/6)",
      left: "0",
      width: "100%",
      height: "1vmax",
      // content: "",
      background: "#c00",
      transform: "rotate(0deg)"
    };

    const start = winnerSquares[0];
    const end = winnerSquares[1];
    const thickness = "0.3vmax";
    const length = "90%";
    const margin = ((100 - parseInt(length)) / 2).toString() + "%";
    const lineDirection = getLineDirection(start, end);

    switch (lineDirection) {
      case "horizontal":
        const topOffset = 1 + (start / 3) * 2;
        lineStyle.top = `calc(100%*${topOffset}/6)`;
        lineStyle.left = margin;
        break;
      case "vertical":
        const leftOffset = 1 + start * 2;
        lineStyle.left = `calc(100%*${leftOffset}/6)`;
        lineStyle.top = margin;
        break;
      case "diagonal":
        lineStyle.top = "50%";
        start === 0
          ? (lineStyle.transform = "rotate(45deg)")
          : (lineStyle.transform = "rotate(135deg)");
        break;
    }

    function getLineDirection(start, end) {
      if (start % 3 === end % 3) {
        lineStyle.height = length;
        lineStyle.width = thickness;
        return "vertical";
      } else if (Math.floor(start / 3) === Math.floor(end / 3)) {
        lineStyle.width = length;
        lineStyle.height = thickness;
        return "horizontal";
      } else {
        lineStyle.width = "100%";
        lineStyle.height = thickness;
        return "diagonal";
      }
    }
    console.log(lineDirection);

    return lineStyle;
  }
}

export const getWinner = calculateWinner;
export const lineStyle = getLineStyle;
