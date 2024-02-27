import React, { useState } from "react";


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import FCEditDetails2 from "./FCEditDetails2";

export default function FCProfile(props) {
  console.log(props);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div style={{ height: "500px" }}>
      <Card style={{ width: "35rem", height: "100%", margin: "auto" }}>
        <Card.Img
          variant="top"
          style={{
            borderRadius: "50%",
            height: "35%",
            width: "35%",
            margin: "auto",
          }}
          src={props.user.photo}
        />
        <Card.Body style={{ height: "100%" }}>
          <Card.Title>
            {props.user.firstName} {props.user.lastName}
          </Card.Title>
          <div>
            <p>✉{props.user.email}</p>
            <p>
              <LocationCityRoundedIcon />
              {props.user.street} {props.user.streetnumber} , {props.user.city}
            </p>
            <p>🎂{props.user.birthdate}</p>
          </div>
          <Button variant="primary" onClick={() => props.setIsEdit(true)}>
            Update Details
          </Button>
          <a href="https://poki.com/il/g/bubble-trouble-3#" target="_blank">
            {" "}
            <Button variant="secondary">To The Game</Button>{" "}
          </a>
          <Button variant="danger" onClick={props.onlogout}>
            Log out
          </Button>{" "}
        </Card.Body>
      </Card>{" "}
      {!isEdit ? null : <FCEditDetails2 user={props.user} isRegister={true} />}
    </div>
  );
}
