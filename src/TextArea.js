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
    this.handleParenth();
    this.handleCurlyBraces();
    this.handleSquareBrackets();
    this.closingCurlyFirst();
    this.closingParenthFirst();
    this.closingSquareFirst();
  };

  getLengths = (openChar, closeChar) => {
    const { value } = this.state;
    const valueArray = value.split("");
    const openingChar = valueArray.filter(char => char === openChar);
    const closingChar = valueArray.filter(char => char === closeChar);
    return openingChar.length === closingChar.length;
  };

  // Makes sure there are the same number of opening and closing curly braces
  handleCurlyBraces = braceError => {
    if (!this.getLengths("{", "}")) {
      this.setState(state => (state.braceError = true));
    } else if (this.getLengths("{", "}")) {
      this.setState(state => (state.braceError = false));
    }
  };

  // Makes sure there are the same number of opening and closing parentheses
  handleParenth = () => {
    if (!this.getLengths("(", ")")) {
      this.setState(state => (state.parenthError = true));
    } else if (this.getLengths("(", ")")) {
      this.setState(state => (state.parenthError = false));
    }
  };

  // Ensures same number of opening and closing square brackets
  handleSquareBrackets = () => {
    if (!this.getLengths("[", "]")) {
      this.setState(state => (state.squareError = true));
    } else if (this.getLengths("[", "]")) {
      this.setState(state => (state.squareError = false));
    }
  };

  // Ensures that there aren't any closing curlies before opening ones
  closingCurlyFirst = () => {
    let curly = 0;
    const { value } = this.state;
    const valueArray = value.split("");
    valueArray.forEach(char => {
      if (char === "}") {
        curly -= 1;
        if (curly <= -1) {
          this.setState(state => (state.closeCurlyFirst = true));
        } else if (curly > -1) {
          this.setState(state => (state.closeCurlyFirst = false));
        }
      } else if (char === "{") {
        curly += 1;
      }
      return curly;
    });
  };

  // ensures no closing parentheses before opening
  closingParenthFirst = () => {
    let parenth = 0;
    const { value } = this.state;
    const valueArray = value.split("");
    valueArray.forEach(char => {
      if (char === ")") {
        parenth -= 1;
        if (parenth <= -1) {
          this.setState(state => (state.closeParenthFirst = true));
        } else {
          this.setState(state => (state.closeParenthFirst = false));
        }
      } else if (char === "(") {
        parenth += 1;
      }
      return parenth;
    });
  };

  // ensures no closing square brackets before opening
  closingSquareFirst = () => {
    let square = 0;
    const { value } = this.state;
    const valueArray = value.split("");
    valueArray.forEach(char => {
      if (char === "]") {
        square -= 1;
        if (square <= -1) {
          this.setState(state => (state.closeSquareFirst = true));
        } else {
          this.setState(state => (state.closeSquareFirst = false));
        }
      } else if (char === "[") {
        square += 1;
      }
      return square;
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
