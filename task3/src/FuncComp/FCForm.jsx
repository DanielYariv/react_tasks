import React from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import "../css/register.css";

import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import SignpostRoundedIcon from "@mui/icons-material/SignpostRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";

export default function FCForm(props) {
  console.log(props.formData);
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{props.isRegister ? "Sign Up" : "Edit"} </div>
          <div className="underline"></div>
        </div>
        <Form
          noValidate
          validated={props.validated}
          onSubmit={props.handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="username">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={props.formData.username}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="[^\u0590-\u05FF]*"
                  maxLength="60"
                  onChange={props.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Only english letters, numbers and special characters
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">🔒</InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={props.formData.password}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{7,12}"
                  minLength="7"
                  maxLength="12"
                  onChange={props.handleChange}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
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

            <Form.Group as={Col} md="4" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">🔒</InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{7,12}"
                  minLength="7"
                  maxLength={props.formData.password.length}
                  isInvalid={props.confirmPasswordError !== ""}
                  onChange={props.handleChange}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                />
                <Form.Control.Feedback type="invalid">
                  {props.confirmPasswordError}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="photo">
              {!props.isRegister ? (
                <img
                  style={{ height: "50px", width: "50px" }}
                  src={props.formData.photo}
                />
              ) : (
                <Form.Label>photo</Form.Label>
              )}
              <Form.Control
                required={props.isRegister == true}
                name="photo"
                accept=".jpg, .jpeg"
                type="file"
                placeholder="photo"
                onChange={props.handleChange}
                isInvalid={props.fileError !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {props.fileError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="first name"
                  name="firstName"
                  value={props.formData.firstName}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="^[a-zA-Z\u0590-\u05FF ]+$"
                  onChange={props.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Only English/Hebrew letters
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="last name"
                  name="lastName"
                  value={props.formData.lastName}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="^[a-zA-Z\u0590-\u05FF ]+$"
                  onChange={props.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Only English/Hebrew letters
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="email">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">✉</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="email"
                  name="email"
                  value={props.formData.email}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="[a-zA-Z.@]+\.com$"
                  onChange={props.handleChange}
                  disabled={!props.isRegister}
                />
                <Form.Control.Feedback type="invalid">
                  must be valid email and without numbers
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="birthdate">
              <Form.Label>BirthDate</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">🎂</InputGroup.Text>
                <Form.Control
                  type="date"
                  placeholder="birthDate"
                  name="birthdate"
                  value={props.formData.birthdate}
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={props.handleChange}
                  isInvalid={props.birthDateError !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  {props.birthDateError}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="city">
              <Form.Label>City</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <LocationCityRoundedIcon />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="city"
                  autoComplete="on"
                  list="cities"
                  required
                  value={props.formData.city}
                  placeholder="Enter city"
                  onChange={props.handleChange}
                  isInvalid={props.cityError !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  {props.cityError}
                </Form.Control.Feedback>
                <datalist id="cities">
                  <option value="New York" />
                  <option value="Los Angeles" />
                  <option value="Chicago" />
                  <option value="Houston" />
                  <option value="Phoenix" />
                  <option value="Tel Aviv" />
                  <option value="Haifa" />
                  <option value="Netanya" />
                </datalist>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="street">
              <Form.Label>street address</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <SignpostRoundedIcon />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="street address"
                  name="street"
                  value={props.formData.street}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="[\u0590-\u05FF\s]*"
                  onChange={props.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  only hebrew letters
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="streetnumber">
              <Form.Label>street number</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <NumbersRoundedIcon />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="street number"
                  name="streetnumber"
                  value={props.formData.streetnumber}
                  aria-describedby="inputGroupPrepend"
                  required
                  min="0"
                  onChange={props.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  only positive number
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Button type="submit">{props.isRegister ? "Sign Up" : "Edit"}</Button>
        </Form>
      </div>
    </>
  );
}
