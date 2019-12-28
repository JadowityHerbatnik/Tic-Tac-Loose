import React from "react";

class Buttons extends React.Component {
  render() {
    return (
      <div className="gameButtons">
        <button
          className="but"
          onClick={() => this.props.stepInHistory(this.props.currentStep * -1)}
        >
          <i className="icon-ccw"></i>
        </button>
        <div id="historyButtons">
          <button className="but" onClick={() => this.props.stepInHistory(-1)}>
            <i className="icon-left-big"></i>
          </button>
          <button className="but" onClick={() => this.props.stepInHistory(1)}>
            <i className="icon-right-big"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default Buttons;
