import { Component } from "react";

export default class Q1Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
    };
  }
  chgcolor = (color) => {
    this.setState({ color: color });
  };
  render() {
    return (
      <>
        <h2>Q1:</h2>
        <div
          style={{
            backgroundColor: this.state.color,
            border: "1px solid black",
            marginTop: "20px",
            marginBottom: "100px",
            padding: "15px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={() => this.chgcolor("red")}>red</button>
          <button onClick={() => this.chgcolor("green")}>green</button>
          <button onClick={() => this.chgcolor("blue")}>blue</button>
          <button onClick={() => this.chgcolor("yellow")}>yellow</button>
          <button onClick={() => this.chgcolor("brown")}>brown</button>
          <button onClick={() => this.chgcolor("orange")}>orange</button>
          <button onClick={() => this.chgcolor("purple")}>purple</button>
          <button onClick={() => this.chgcolor("black")}>black</button>
        </div>
      </>
    );
  }
}
