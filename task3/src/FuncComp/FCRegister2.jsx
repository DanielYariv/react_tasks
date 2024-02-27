import React from "react";
import { useState, useEffect } from "react";
import FCForm from "./FCForm";
import Swal from "sweetalert2";
import { useDetailsCommonLogic } from "../Hooks/useDetailsCommonLogic";

export default function FCRegister2() {
  //all the rellevant useStates and functions from the useDetailsCommonHook
  const {
    validated,
    formData,
    confirmPasswordError,
    fileError,
    birthDateError,
    cities,
    cityError,
    users,
    setValidated,
    setusers,
    handleChange,
    handleCityChange,
    handleConfirmPasswordChange,
    handleBirthDateChange,
    handleFileChange,
    ageCalc,
  } = useDetailsCommonLogic();

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
      cities.includes(formData.city) == false ||
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
          title: "Registration successful!",
          text: "You are now logged in!",
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
      sessionStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
  };

  useEffect(() => {
    localStorage["users"] = JSON.stringify(users);
  }, [users]);

  return (
    <div className="container">
      <FCForm
        isRegister={true}
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
