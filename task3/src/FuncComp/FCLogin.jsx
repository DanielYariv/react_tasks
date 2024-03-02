import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";

import Row from "react-bootstrap/Row";
import "../css/register.css";

export default function FCLogin(props) {
  const [validated, setValidated] = useState(false);
  const [loginDetails, setloginDetails] = useState({
    username: "",
    password: "",
  });

  const [users, setusers] = useState(() => {
    if (localStorage["users"] !== undefined) {
      return JSON.parse(localStorage["users"]);
    } else {
      return [];
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      loginUser(loginDetails.username, loginDetails.password);
    }
    setValidated(true);
  };

  const loginUser = (username, password) => {
    console.log(username, password);
    let user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log("User logged in:", user);
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        text: "Welcome back, " + user.username + "!",
        confirmButtonText: "OK",
      });
      //pass the loggin user details to the parant function handleLogin (app component)
      props.onLogin(user);
    } else if (username == "admin" && password == "Ad!12343211a") {
      user = { username: "admin", password: "Ad!12343211a" };
      sessionStorage.setItem("user", JSON.stringify(user));
      props.onLogin(user);
    } else {
      // User not found or invalid credentials
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: "Check username or password.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="usernamelogin">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                aria-describedby="inputGroupPrepend"
                required
                pattern="[^\u0590-\u05FF]*"
                maxLength="60"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Only foreign letters, numbers and special characters
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="passwordlogin">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">🔒</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                aria-describedby="inputGroupPrepend"
                required
                pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{7,12}"
                minLength="7"
                maxLength="12"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                <ul>
                  <li>between 7 and 12 characters.</li>
                  <li>one special character</li>
                  <li>capital letter</li>
                  <li>number</li>
                </ul>
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}
