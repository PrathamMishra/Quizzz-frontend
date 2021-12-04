import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Auth from "../Auth/Auth";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../actions/authActions";
import { useHistory } from "react-router";

function Home() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/auth");
    }
  }, [user]);
  function handleLogOut() {
    dispatch(logOutAction());
    setUser(null);
  }
  return (
    <div>
      <div>
        Home <Link to="/createRoom">Create Room</Link>
        <button onClick={handleLogOut}>logout</button>
      </div>
    </div>
  );
}

export default Home;
