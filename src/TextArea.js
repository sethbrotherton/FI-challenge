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
    this.setState({
      value: e.target.value
    });
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

  // Makes sure there are the same number of opening and closing curly braces
  handleCurlyBraces = () => {
    const { value } = this.state;
    const valueArray = value.split("");
    const openBraces = valueArray.filter(char => char === "{");
    const closeBraces = valueArray.filter(char => char === "}");
    if (openBraces.length !== closeBraces.length) {
      this.setState({
        braceError: true
      });
    } else if (openBraces.length === closeBraces.length) {
      this.setState({
        braceError: false
      });
    }
  };

  // Makes sure there are the same number of opening and closing parentheses
  handleParenth = () => {
    const { value } = this.state;
    const valueArray = value.split("");
    const openParenth = valueArray.filter(char => char === "(");
    const closeParenth = valueArray.filter(char => char === ")");
    if (openParenth.length !== closeParenth.length) {
      this.setState({
        parenthError: true
      });
    } else if (openParenth.length === closeParenth.length) {
      this.setState({
        parenthError: false
      });
    }
  };

  // Ensures same number of opening and closing square brackets
  handleSquareBrackets = () => {
    const { value } = this.state;
    const valueArray = value.split("");
    const openSquare = valueArray.filter(char => char === "[");
    const closeSquare = valueArray.filter(char => char === "]");
    if (openSquare.length !== closeSquare.length) {
      this.setState({
        squareError: true
      });
    } else if (openSquare.length === closeSquare.length) {
      this.setState({
        squareError: false
      });
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
          return this.setState({
            closeCurlyFirst: true
          });
        } else {
          this.setState({
            closeCurlyFirst: false
          });
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
          return this.setState({
            closeParenthFirst: true
          });
        } else {
          this.setState({
            closeParenthFirst: false
          });
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
          return this.setState({
            closeSquareFirst: true
          });
        } else {
          this.setState({
            closeSquareFirst: false
          });
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
          onKeyDown={this.handleSyntax}
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
