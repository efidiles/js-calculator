import { createLogger } from "./logger";
import Big from "big.js";

const log = createLogger("CalculatorService");

export function create() {
  let state = getDefaultState();

  return {
    initialState: state,
    executeAction: action => executeAction(action)
  };

  function executeAction(action) {
    log("executeAction()", { action });

    if (isResetAction(action)) {
      log("executeAction():isResetAction");

      reset();
      return state;
    }

    if (isQueryResultAction(action)) {
      log("executeAction():isQueryResultAction");

      const isStateValid = state.operation !== null && state.operand1 !== null;

      if (!isStateValid) {
        log("executeAction():isQueryResultAction: state is invalid");
        makeInvalid();
        return state;
      }

      computeDataFromState(null);
      return state;
    }

    if (isNumberTypingAction(action)) {
      log("executeAction():isNumberTypingAction");

      if (state.resetContent) {
        log("executeAction():isNumberTypingAction: reseting content");

        setState({
          content: action,
          resetContent: false
        });

        return state;
      }

      setState({
        content: state.content !== "0" ? state.content + action : action
      });

      return state;
    }

    if (isOperationAction(action)) {
      log("executeAction():isOperationAction");

      const hasDataToPerformComputation = state.operation !== null;

      if (hasDataToPerformComputation) {
        log("executeAction():isOperationAction: computing the state");

        computeDataFromState(action);
        return state;
      }

      let newOperand1;

      try {
        newOperand1 = new Big(state.content);
      } catch (_ignore) {
        makeInvalid();

        return state;
      }

      setState({
        operation: action,
        operand1: newOperand1,
        resetContent: true
      });

      return state;
    }

    throw new Error(`The action '${action}' can not be handled`);
  }

  function computeDataFromState(nextOperationToSet) {
    const operand2 = new Big(state.content);
    const result = executeOperation(state.operation, state.operand1, operand2);

    log("computeDataFromState()", { result: result.toString() });

    if (isNaN(result)) {
      makeInvalid();
      return;
    }

    setState({
      content: result.toString(),
      operand1: result,
      operand2: null,
      operation: nextOperationToSet,
      resetContent: true
    });
  }

  function reset() {
    state = getDefaultState();
  }

  function setState(newState) {
    state = { ...state, ...newState };
  }

  function makeInvalid() {
    setState({
      ...getDefaultState(),
      content: "Invalid",
      resetContent: true
    });
  }
}

export function getDefaultState() {
  return {
    content: "0",
    operand1: null,
    operand2: null,
    operation: null,
    resetContent: false
  };
}

function isNumberTypingAction(content) {
  if (content === ".") {
    return true;
  }

  return !isNaN(parseFloat(content)) && isFinite(content);
}

function isOperationAction(content) {
  return ["+", "-", "*", "/"].includes(content);
}

function isQueryResultAction(content) {
  return content === "=";
}

function isResetAction(content) {
  return content === "AC";
}

export function executeOperation(operation, operand1, operand2) {
  log("executeOperation()", {
    operation,
    operand1: operand1.toString(),
    operand2: operand2.toString()
  });

  const bigJsOperation = {
    "+": "plus",
    "-": "minus",
    "*": "times",
    "/": "div"
  }[operation];

  let result;

  try {
    result = operand1[bigJsOperation](operand2);
  } catch (_ignore) {
    return NaN;
  }

  return result;
}
