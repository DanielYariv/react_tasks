import { useState, useEffect } from "react";
//use it to handle common things between register and edit

//help function to birthdate handle
const ageCalc = (value) => {
  const birthDate = new Date(value);
  const todayDate = new Date();
  const diff = todayDate - birthDate;
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  return age;
};

export const useDetailsCommonLogic = () => {
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
    console.log(name, value);

    if (name == "confirmPassword") {
      handleConfirmPasswordChange(value);
    } else if (name == "photo") {
      const selectedFile = e.target.files[0];
      handleFileChange(selectedFile);
    } else if (name == "birthdate") {
      handleBirthDateChange(value);
    } else if (name == "city") {
      handleCityChange(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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
        photo: "error",
      });
      setFileError("Please select a valid JPG or JPEG file.");
    }
  };

  const handleCityChange = (value) => {
    if (cities.includes(value) == false) {
      setFormData({
        ...formData,
        city: value,
      });
      setCityError("Please select a city from the list.");
    } else {
      setFormData({
        ...formData,
        city: value,
      });
      setCityError("");
    }
  };

  return {
    validated,
    formData,
    setFormData,
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
  };
};
