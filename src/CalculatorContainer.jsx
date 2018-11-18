import React from "react";
import { create } from "./CalculatorService";
import { createLogger } from "./logger";

const log = createLogger("CalculatorContainer");

export class CalculatorContainer extends React.Component {
  state = null;
  service = null;

  constructor() {
    super();

    this.service = create();
    this.state = this.service.initialState;
  }

  executeAction = action => {
    log("executeAction()", { action });

    const newState = this.service.executeAction(action);

    this.setState({ ...newState });
  };

  render() {
    log("executeAction():state", JSON.stringify(this.state));

    return this.props.children({
      content: this.state.content,
      executeAction: this.executeAction
    });
  }
}
