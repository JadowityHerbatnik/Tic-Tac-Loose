import React from "react";

class GameOver extends React.Component {
  render() {
    // let style = { opacity: 0, pointerEvents: "none" };
    let style = {};
    if (this.props.winner) {
      style.opacity = 1;
      style.pointerEvents = "auto";
      style.transitionDelay = "2s";
    }
    return (
      <div id="gameOver" style={style}>
        <p id="gameOverText">
          You
          <br />
          Loose
        </p>
        <button
          id="resetButton"
          className="but"
          onClick={() => this.props.onClick()}
        >
          Try Again
        </button>
      </div>
    );
  }
}
export default GameOver;
