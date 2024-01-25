import { Component } from "react";
import Q1Component from "./q1Component";
import Q2Component from "./q2Component";
import Q3Component from "./q3Component";
export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Q1Component />
        <Q2Component />
        <Q3Component />
      </>
    );
  }
}
