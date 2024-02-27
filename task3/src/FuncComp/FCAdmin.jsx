import React from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function FCAdmin(props) {
  console.log(props);

  const handleSelectedUser = (selectedUser) => {
    props.onSelectUser(selectedUser);
    props.setIsAdminEdit(true);
  };

  return (
    <>
      <Button variant="danger" onClick={props.onlogout}>
        Log out
      </Button>{" "}
      <Table striped bordered hover>
        {console.log(props.users)}
        <thead>
          <tr>
            <th>Photo</th>
            <th>User Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>BirthDate</th>
            <th>Address</th>
            <th>Password</th>
            <th>Delete User</th>
            <th>Edit User</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <tr key={index}>
              <td>
                <img src={user.photo}></img>
              </td>
              <td>{user.username}</td>
              <td>{user.firstName + " " + user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.birthdate}</td>
              <td>
                {user.city + ", " + user.street + " " + user.streetnumber}
              </td>
              <td>{user.password}</td>
              <td>
                <DeleteOutlineIcon
                  onClick={() => props.deleteUser(user.email)}
                />
              </td>
              <td>
                <ModeEditIcon onClick={() => handleSelectedUser(user)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
