import React, { useState } from "react";
import FCRegister from "./FCRegister";

export default function FCEditDetails(props) {
  const userStartData = {
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
  };
  return (
    <div>
      FCEditDetails
      <FCRegister editData="true" user={userStartData} />
    </div>
  );
}
