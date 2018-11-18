import React from "react";
import ReactDOM from "react-dom";
import { CalculatorContainer } from "./CalculatorContainer";
import { Calculator } from "./Calculator";
import { createLogger } from "./logger";
import "./styles.css";

const log = createLogger('App');

function App() {
  log('render()');

  return (
    <div className="App">
      <CalculatorContainer>
        {({
          executeAction,
          content
        }) => (
          <Calculator 
            logoUrl={'https://www.equalexperts.com/wp-content/themes/equalexperts/assets/logo.svg'} 
            onButtonClick={executeAction}
            content={content}
          />
        )}
      </CalculatorContainer>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
