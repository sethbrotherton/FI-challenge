import React from "react";
import "./TextArea.css";

class TextArea extends React.Component {
  state = {
    value: "",
    braceError: false,
    squareError: false,
    parenthError: false,
    closeCurlyFirst: false,
    closeParenthFirst: false,
    closeSquareFirst: false
  };

  handleInput = e => {
    this.setState(
      {
        value: e.target.value
      },
      () => {
        this.handleSyntax();
      }
    );
  };

  // these functions are called on keydown event
  handleSyntax = e => {
    this.handlePairs("{", "}", "braceError");
    this.handlePairs("[", "]", "squareError");
    this.handlePairs("(", ")", "parenthError");
    this.refactored("}", "{", "closeCurlyFirst");
    this.refactored(")", "(", "closingParenthFirst");
    this.refactored("]", "[", "closingSquareFirst");
  };

  getLengths = (openChar, closeChar) => {
    const { value } = this.state;
    const valueArray = value.split("");
    const openingChar = valueArray.filter(char => char === openChar);
    const closingChar = valueArray.filter(char => char === closeChar);
    return openingChar.length === closingChar.length;
  };

  handlePairs = (open, close, propString) => {
    if (!this.getLengths(open, close)) {
      this.setState(state => (state[propString] = true));
    } else {
      this.setState(state => (state[propString] = false));
    }
  };

  refactored = (key1, key2, propString) => {
    let curly = 0;
    const { value } = this.state;
    const valueArray = value.split("");
    valueArray.forEach(char => {
      if (char === key1) {
        curly -= 1;
        if (curly <= -1) {
          this.setState(state => (state[propString] = true));
        } else if (curly > -1) {
          this.setState(state => (state[propString] = false));
        }
      } else if (char === key2) {
        curly += 1;
      }
      return curly;
    });
  };

  render() {
    return (
      <div>
        <textarea
          className="text-area"
          rows="14"
          cols="40"
          value={this.state.value}
          onChange={this.handleInput}
        />
        <div className="errors-description">
          {this.state.braceError ? (
            <p className="error">Your curly braces are unbalanced</p>
          ) : (
            <p className="no-error">Curly braces are balanced</p>
          )}
          {this.state.parenthError ? (
            <p className="error">Your parentheses are unbalanced</p>
          ) : (
            <p className="no-error">Parentheses are balanced</p>
          )}
          {this.state.squareError ? (
            <p className="error">Your square brackets are unbalanced</p>
          ) : (
            <p className="no-error">Square brackets are balanced</p>
          )}
          {this.state.closeCurlyFirst ? (
            <p className="error">
              You have a closing curly brace before an opening
            </p>
          ) : (
            <p className="no-error">No out of order curlies</p>
          )}
          {this.state.closeSquareFirst ? (
            <p className="error">
              You have a closing square bracket before an opening
            </p>
          ) : (
            <p className="no-error">No out of order square brackets</p>
          )}
          {this.state.closeParenthFirst ? (
            <p className="error">
              You have a closing parenthesis before an opening
            </p>
          ) : (
            <p className="no-error">No out of order parentheses</p>
          )}
        </div>
      </div>
    );
  }
}

export default TextArea;
