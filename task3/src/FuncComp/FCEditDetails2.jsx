import React from "react";
import { useState, useEffect } from "react";
import FCForm from "./FCForm";
import Swal from "sweetalert2";
import { useDetailsCommonLogic } from "../Hooks/useDetailsCommonLogic";

export default function FCEditDetails2(props) {
  const {
    validated,
    setValidated,
    formData,
    setFormData,
    confirmPasswordError,
    fileError,
    birthDateError,
    cityError,
    handleChange,
    handleCityChange,
    handleConfirmPasswordChange,
    handleBirthDateChange,
    handleFileChange,
    ageCalc,
    cities,
  } = useDetailsCommonLogic();

  useEffect(() => {
    if (props.user) {
      setFormData({
        ...formData,
        username: props.user.username,
        password: props.user.password,
        confirmPassword: props.user.confirmPassword,
        photo: props.user.photo,
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        birthdate: props.user.birthdate,
        city: props.user.city,
        street: props.user.street,
        streetnumber: props.user.streetnumber,
      });
    }
  }, [props.user]);
  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    const age = ageCalc();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      formData.password !== formData.confirmPassword ||
      age < 18 ||
      age > 120 ||
      cities.includes(formData.city) == false ||
      formData.photo == "error"
    ) {
      event.stopPropagation();
      Swal.fire({
        icon: "error",
        title: "Failed To Edit ",
        text: "Please fill out all required fields correctly.",
        confirmButtonText: "OK",
      });
    } else {
      if (props.editUser(formData) == false) {
        Swal.fire({
          icon: "error",
          title: "user details not edited",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "user details updated!",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      }
    }
    setValidated(true);
  };

  return (
    <div className="container">
      <FCForm
        isRegister={false}
        //states
        user={props.user}
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
