import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";

import Row from "react-bootstrap/Row";
import "../css/register.css";

import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import SignpostRoundedIcon from "@mui/icons-material/SignpostRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";

function FCRegister(props) {
  const userDet = props.user;
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Tel Aviv",
    "Netanya",
    "Haifa",
  ];

  const [validated, setValidated] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fileError, setFileError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [users, setusers] = useState(() => {
    if (localStorage["users"] !== undefined) {
      return JSON.parse(localStorage["users"]);
    } else {
      return [];
    }
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    photo: null,
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    city: "",
    street: "",
    streetnumber: "",
  });

  //----handlee changes----

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (e.target.name == "confirmPassword") {
      const confirmPas = e.target.value;
      handleConfirmPasswordChange(confirmPas);
    }

    if (e.target.name == "Photo") {
      const selectedFile = e.target.files[0];
      handleFileChange(selectedFile);
    }
    if (e.target.name == "birthdate") {
      handleBirthDateChange(value);
    }
  };

  const handleConfirmPasswordChange = (confirmPas) => {
    const password = formData.password;
    if (confirmPas == password) {
      setFormData({
        ...formData,
        confirmPassword: confirmPas,
      });
      setConfirmPasswordError("");
    } else {
      setFormData({
        ...formData,
        confirmPassword: "",
      });
      setConfirmPasswordError("Passwords do not match");
    }
  };
  const handleBirthDateChange = (birthDate) => {
    const age = ageCalc(birthDate);
    if (age >= 18 && age <= 120) {
      setFormData({
        ...formData,
        birthdate: birthDate,
      });
      setBirthDateError("");
    } else {
      setFormData({
        ...formData,
        birthdate: "",
      });
      setBirthDateError("Your age must be between 18 to 120");
    }
  };
  const handleFileChange = (selectedFile) => {
    const allowedTypes = ["image/jpeg", "image/jpg"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({
          ...formData,
          photo: base64String, // Save the Base64 string representation of the photo
        });
        setFileError("");
      };
      reader.readAsDataURL(selectedFile); // Convert the selected file to Base64
    } else {
      setFormData({
        ...formData,
        photo: null,
      });
      setFileError("Please select a valid JPG or JPEG file.");
    }
  };

  const handleCityChange = (e) => {
    const inputValue = e.target.value;
    if (cities.includes(inputValue) == false) {
      setFormData({
        ...formData,
        city: "",
      });
      setCityError("Please select a city from the list.");
    } else {
      setFormData({
        ...formData,
        city: e.target.value,
      });
      setCityError("");
    }
  };

  //----handle submit-----

  const handleSubmit = (event) => {
    event.preventDefault();
    const age = ageCalc();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      formData.password !== formData.confirmPassword ||
      age < 18 ||
      age > 120 ||
      formData.city == "" ||
      formData.photo == null
    ) {
      event.stopPropagation();
      Swal.fire({
        icon: "error",
        title: "Form submission failed!",
        text: "Please fill out all required fields correctly.",
        confirmButtonText: "OK",
      });
    } else {
      //check if the user name or email already exist
      if (registerUser() == false) {
        Swal.fire({
          icon: "error",
          title: "user name or email already exist",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Form submitted!",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      }
    }
    setValidated(true);
  };

  //register user function
  const registerUser = () => {
    let newUser = { ...formData };
    const isExist = users.find(
      (user) =>
        user.username === newUser.username || user.email === newUser.email
    );
    if (isExist) {
      return false;
    } else {
      setusers((prevUsers) => [...prevUsers, newUser]);
      return true;
    }
  };

  useEffect(() => {
    localStorage["users"] = JSON.stringify(users);
  }, [users]);

  //help function to birthdate handle
  const ageCalc = (value) => {
    const birthDate = new Date(value);
    const todayDate = new Date();
    const diff = todayDate - birthDate;
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return age;
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="username">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={props.editData ? userDet.username : formData.username}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="[^\u0590-\u05FF]*"
                  maxLength="60"
                  onChange={handleChange}
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
                  value={formData.password}
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
                  maxLength={formData.password.length}
                  isInvalid={confirmPasswordError !== ""}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {confirmPasswordError}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="Photo">
              <Form.Label>photo</Form.Label>
              <Form.Control
                required
                name="Photo"
                accept=".jpg, .jpeg"
                type="file"
                placeholder="photo"
                onChange={handleChange}
                isInvalid={fileError !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {fileError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="first name"
                  name="firstName"
                  value={formData.firstName}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="^[a-zA-Z\u0590-\u05FF ]+$"
                  onChange={handleChange}
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
                  value={formData.lastName}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="^[a-zA-Z\u0590-\u05FF ]+$"
                  onChange={handleChange}
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
                  value={formData.email}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="[a-zA-Z.@]+\.com$"
                  onChange={handleChange}
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
                  value={formData.birthdate}
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={handleChange}
                  isInvalid={birthDateError !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  {birthDateError}
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
                  placeholder="Enter city"
                  onChange={handleCityChange}
                  isInvalid={cityError !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  {cityError}
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
                  value={formData.street}
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="[\u0590-\u05FF\s]*"
                  onChange={handleChange}
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
                  value={formData.streetnumber}
                  aria-describedby="inputGroupPrepend"
                  required
                  min="0"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  only positive number
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    </>
  );
}

export default FCRegister;
