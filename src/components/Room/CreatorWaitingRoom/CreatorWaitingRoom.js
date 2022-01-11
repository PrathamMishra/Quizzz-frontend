import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import InvigilatorPage from "./InvigilatorPage/InvigilatorPage";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

import {
    setRoomData,
    clearRoomData,
} from "../../../redux/roomData/roomDataAction";

let socket;
function CreatorWaitingRoom({ roomCode, setMessage, setLoading }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const roomData = useSelector((state) => state.roomData);
    const [user, setUser] = useState(
        useSelector((state) => state.auth.data.user)
    );
    const [started, setStarted] = useState(false);
    const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("join", { userId: user?._id, roomCode }, (err, data) => {
            if (err) {
                console.log(err);
                history.push("/");
            } else {
                console.log(data);
                dispatch(setRoomData(data));
            }
        });
        socket.on("list", (newRoomData) => {
            newRoomData.users.sort(compare);
            dispatch(setRoomData(newRoomData));
        });
        return () => {
            socket.emit("leaveRoom", roomCode);
            dispatch(clearRoomData());
            socket.disconnect();
            socket.off();
        };
    }, []);

    function compare(a, b) {
        if (a.score < b.score) {
            return 1;
        }
        if (a.score > b.score) {
            return -1;
        }
        if (a.time < b.time) {
            return -1;
        }
        if (a.time > b.time) {
            return 1;
        }
        return 0;
    }
    function startMatch() {
        console.log(roomData);
        console.log(roomCode);
        socket.emit("start", roomCode);
        setStarted(true);
    }
    function disbandMatch() {
        socket.emit("disband", roomCode);
        history.push("/");
    }
    return started ? (
        <InvigilatorPage roomData={roomData} socket={socket} />
    ) : (
        <div>
            Waiting Room...
            <Button variant="primary" onClick={startMatch}>
                Start Match
            </Button>
            <Button variant="primary" onClick={disbandMatch}>
                Disband Match
            </Button>
        </div>
    );
}

export default CreatorWaitingRoom;
