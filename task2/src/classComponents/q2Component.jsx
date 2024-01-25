import { Component } from "react";
export default class Q2Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: "",
      pFamilyN: "",
      pFirstN: "",
      pPsychG: "",
      pAorF: "",
      pAorFColor: "",
    };
  }
  focusField = (fieldName) => {
    if (fieldName == "Family Name") {
      this.setState({
        fieldName: fieldName,
        pFamilyN: `Please fill the ${fieldName} field`,
      });
    }
    if (fieldName == "First Name") {
      this.setState({
        fieldName: fieldName,
        pFirstN: `Please fill the ${fieldName} field`,
      });
    }
    if (fieldName == "Psychometric Grade") {
      this.setState({
        fieldName: fieldName,
        pPsychG: `Please fill the ${fieldName} field`,
      });
    }
  };
  blurField = () => {
    this.setState({
      pFirstN: "",
      pFamilyN: "",
      pPsychG: "",
    });
  };
  checkGrade = (e) => {
    const grade = Number(e.target.value);
    const message =
      grade > 555
        ? "Congratulations, you can be accepted for studies"
        : "Unfortunatly, you must try next year";

    this.setState({
      pAorF: message,
      pAorFColor: grade > 555 ? "green" : "red",
    });
  };
  render() {
    return (
      <>
        <h2>Q2:</h2>

        <form
          style={{
            marginTop: "20px",
            marginBottom: "100px",
            border: "2px solid black",
          }}
        >
          <p style={{ color: "red" }}>{this.state.pFamilyN}</p>
          Family Name:
          <input
            className="inputsStyle"
            type="text"
            style={{
              width: "90%",
              margin: "0.9vw 0",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            onFocus={() => {
              this.focusField("Family Name");
            }}
            onBlur={() => {
              this.blurField();
            }}
          />
          <p style={{ color: "red" }}>{this.state.pFirstN}</p>
          First Name:
          <input
            type="text"
            style={{
              width: "90%",
              margin: "0.9vw 0",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            onFocus={() => {
              this.focusField("First Name");
            }}
            onBlur={() => {
              this.blurField();
            }}
          />
          <p style={{ color: "red" }}>{this.state.pPsychG}</p>
          Psychometric Grade
          <input
            type="number"
            style={{
              width: "90%",
              margin: "0.9vw 0",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            onFocus={() => {
              this.focusField("Psychometric Grade");
            }}
            onBlur={(event) => {
              this.blurField();
              this.checkGrade(event);
            }}
          />
          <p style={{ color: this.state.pAorFColor }}>{this.state.pAorF}</p>
        </form>
      </>
    );
  }
}
