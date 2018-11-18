import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TextArea from "./TextArea";
import fractalIndustries from "./Fractal-Industries.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={fractalIndustries} className="App-logo" alt="logo" />
          <p>Thank you for challenging me :-/</p>
          <p>Test your syntax here!</p>
          <TextArea />
        </header>
      </div>
    );
  }
}

export default App;
