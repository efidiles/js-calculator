import React from "react";
import './Calculator.css';

export class Calculator extends React.Component {
    onClick = e => {
      this.props.onButtonClick(e.target.innerText);
    }
  
    render() {
      return (
        <div className="Calculator__root">
          <div className="Calculator__logo-container">
            <img src={this.props.logoUrl} alt="Equal Experts logo" height="30px" />
          </div>
          <h1 className="Calculator__content">{this.props.content}</h1>
          <div className="Calculator__btn-layout">
            <div className="Calculator__btn-container">
              <button className="Calculator__btn Calculator__btn-1" onClick={this.onClick}>1</button>
              <button className="Calculator__btn Calculator__btn-2" onClick={this.onClick}>2</button>
              <button className="Calculator__btn Calculator__btn-3" onClick={this.onClick}>3</button>
              <button className="Calculator__btn Calculator__btn-4" onClick={this.onClick}>4</button>
              <button className="Calculator__btn Calculator__btn-5" onClick={this.onClick}>5</button>
              <button className="Calculator__btn Calculator__btn-6" onClick={this.onClick}>6</button>
              <button className="Calculator__btn Calculator__btn-7" onClick={this.onClick}>7</button>
              <button className="Calculator__btn Calculator__btn-8" onClick={this.onClick}>8</button>
              <button className="Calculator__btn Calculator__btn-9" onClick={this.onClick}>9</button>
              <button className="Calculator__btn Calculator__btn-0" onClick={this.onClick}>0</button>
            </div>
          <div className="Calculator__operations-container">
            <button className="Calculator__btn Calculator__btn-reset" onClick={this.onClick}>AC</button>
            <button className="Calculator__btn Calculator__btn-plus" onClick={this.onClick}>+</button>
            <button className="Calculator__btn Calculator__btn-minus" onClick={this.onClick}>-</button>
            <button className="Calculator__btn Calculator__btn-times" onClick={this.onClick}>*</button>
            <button className="Calculator__btn Calculator__btn-div" onClick={this.onClick}>/</button>
            <button className="Calculator__btn Calculator__btn-dot" onClick={this.onClick}>.</button>
            <button className="Calculator__btn Calculator__btn-equal" onClick={this.onClick}>=</button>
          </div>
        </div>
      </div>
    );
  }
}