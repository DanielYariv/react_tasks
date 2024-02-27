import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import FCLogin from "./FuncComp/FCLogin";
import FCProfile from "./FuncComp/FCProfile";
import FCRegister2 from "./FuncComp/FCRegister2";
import FCEditDetails2 from "./FuncComp/FCEditDetails2";
import FCAdmin from "./FuncComp/FCAdmin";
function App() {
  //get user details from session storage
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [selectedUserByAdmin, setselectedUserByAdmin] = useState([null]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdminEdit, setIsAdminEdit] = useState(false);

  // const EditMode = () => {
  //   setIsEdit(true);
  // };
  // get register users from local storage
  const loadUsers = () => {
    let users = [];
    if (localStorage["users"] !== undefined) {
      users = JSON.parse(localStorage["users"]);
    }
    return users;
  };

  // //for render register users when page loading for the first time
  // useEffect(() => {
  //   const users = loadUsers();
  //   console.log(users);
  // }, []);

  const handleUserSelectByAdmin = (userSelected) => {
    setselectedUserByAdmin(userSelected);
  };
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    sessionStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    setIsEdit(false);
  };

  const editUser = (editedUser) => {
    let users = loadUsers();
    const index = users.findIndex((user) => user.email === editedUser.email);

    if (index !== -1) {
      // If user with the same email is found, update it
      users[index] = { ...users[index], ...editedUser };

      // Update the users array in local storage
      localStorage.setItem("users", JSON.stringify(users));

      //if the admin makes the change i dont want the session storage to think that normal user is made log in
      if (isAdminEdit == false) {
        sessionStorage.setItem("user", JSON.stringify(editedUser));
      }

      return true; // Indicate that the user was successfully edited
    } else {
      return false; // Indicate that the user was not found
    }
  };
  const deleteUser = (userEmail) => {
    let users = loadUsers();
    const index = users.findIndex((user) => user.email === userEmail);
    if (index !== -1) {
      users.splice(index, 1);

      // Update the users array in local storage
      localStorage.setItem("users", JSON.stringify(users));
      window.location.reload();
    }
  };
  return (
    <>
      {!user && (
        <div className="card">
          <div>
            <FCRegister2 />
          </div>
        </div>
      )}
      <div className="card">
        <div>
          {user ? (
            user.username === "admin" && user.password === "Ad!12343211a" ? (
              <FCAdmin
                setIsAdminEdit={setIsAdminEdit}
                users={loadUsers()}
                deleteUser={deleteUser}
                onlogout={handleLogout}
                editUser={editUser}
                onSelectUser={handleUserSelectByAdmin}
              />
            ) : (
              <FCProfile
                user={user}
                onlogout={handleLogout}
                setIsEdit={setIsEdit}
              />
            )
          ) : (
            <FCLogin onLogin={handleLogin} />
          )}
          {isEdit ? <FCEditDetails2 user={user} editUser={editUser} /> : null}
          {isAdminEdit ? (
            <FCEditDetails2 user={selectedUserByAdmin} editUser={editUser} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
