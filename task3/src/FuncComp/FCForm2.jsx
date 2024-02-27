import React, { useEffect, useState } from "react";

export default function FCForm2(props) {
  const [user, setUser] = useState();
  useEffect(() => {
    if (props.isEdit) setUser(props.user);
  }, []);

  return (
    <div>
      <form>
        <input
          type="email"
          placeholder="email"
          value={user?.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input type="password" placeholder="password" value={user?.password} />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={user?.confirmPassword}
          onChange={props.handleChange}
        />
      </form>
    </div>
  );
}
