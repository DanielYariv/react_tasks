import { Component } from "react";

export default class Q3Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderWidth: "100%",
    };
  }
  widthChange = (widthPercent) => {
    this.setState({ borderWidth: `${widthPercent}` });
  };
  render() {
    return (
      <>
        <h2>Q3:</h2>
        <table
          border="1"
          style={{ width: this.state.borderWidth }}
          onClick={() => {
            this.widthChange("50%");
          }}
          onDoubleClick={() => {
            this.widthChange("100%");
          }}
        >
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
