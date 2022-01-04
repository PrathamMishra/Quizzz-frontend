import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Auth from "../Auth/Auth";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../actions/authActions";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import CustomNavbar from "../CustomNavbar/CustomNavbar";

function Home() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const redirectToCreateRoom = () => {
        history.push("/createRoom");
    };
    const redirectToJoinRoom = () => {
        history.push("/joinRoom");
    };
    const redirectToAddQuestion = () => {
        history.push("/createRoom");
    };
    return (
        <div>
            <div>
                <CustomNavbar />
                <Button variant="primary" onClick={redirectToCreateRoom}>
                    Create Room
                </Button>
                <Button variant="primary" onClick={redirectToJoinRoom}>
                    Join Room
                </Button>
                <Button variant="primary" onClick={redirectToAddQuestion}>
                    Add questions
                </Button>
            </div>
        </div>
    );
}

export default Home;
