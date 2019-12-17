import React from "react";

class Buttons extends React.Component {
  render() {
    return (
      <div className="gameButtons">
        <button className="but">
          <i className="icon-ccw"></i>
        </button>
        <div>
          <button className="but" onClick={() => this.stepInHistory(-1)}>
            <i className="icon-left-big"></i>
          </button>
          <button className="but" onClick={() => this.stepInHistory(1)}>
            <i className="icon-right-big"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default Buttons;
