import React from "react";
import { useState, useEffect } from "react";
import FCForm from "./FCForm";
import Swal from "sweetalert2";

export default function FCRegisterrrr() {
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
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>{" "}
      <FCForm
        //states
        formData={formData}
        confirmPasswordError={confirmPasswordError}
        validated={validated}
        fileError={fileError}
        birthDateError={birthDateError}
        cityError={cityError}
        
        //functions
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        handleBirthDateChange={handleBirthDateChange}
        handleFileChange={handleFileChange}
        handleCityChange={handleCityChange}
      />
    </div>
  );
}
