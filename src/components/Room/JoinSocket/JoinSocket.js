import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import WaitingRoom from "../WaitingRoom/WaitingRoom";
import Question from "../Question/Question";
import {
    setRoomData,
    clearRoomData,
} from "../../../redux/roomData/roomDataAction";
import CompleteWaitingRoom from "./CompleteWaitingRoom/CompleteWaitingRoom";

let socket;
function JoinSocket({
    faceapi,
    faceMatcher,
    setLoading,
    setMessage,
    roomCode,
}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const roomData = useSelector((state) => state.roomData);
    const [user, setUser] = useState(
        useSelector((state) => state.auth.data.user)
    );
    const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
    const [started, setStarted] = useState(false);
    const [question, setQuestion] = useState({});
    const [completed, setCompleted] = useState(false);

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
        socket.on("matchStarted", (data) => {
            console.log(data);
            setQuestion(data);
            setStarted(true);
        });
        socket.on("roomDisbanded", () => {
            setMessage("Room disbanded by the creator.");
            setLoading(true);
            setTimeout(() => {
                history.push("/");
            }, 3000);
        });
        socket.on("roomClosed", () => {
            setMessage("Room closed by the creator.");
            setLoading(true);
            setTimeout(() => {
                history.push("/");
            }, 3000);
        });
        socket.on("kickedFromRoom", () => {
            setMessage("Sorry, You were kicked by the creator.");
            setLoading(true);
            setTimeout(() => {
                history.push("/");
            }, 3000);
        });
        socket.on("list", (newRoomData) => {
            newRoomData.users.sort(compare);
            dispatch(setRoomData(newRoomData));
        });
        return () => {
            if (!completed) {
                socket.emit("cheated", roomCode);
                setMessage("Sorry, You Cheated.");
                setLoading(true);
                setTimeout(() => {
                    history.push("/");
                }, 3000);
            }
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

    return started ? (
        !completed ? (
            <Question
                roomCode={roomCode}
                socket={socket}
                faceapi={faceapi}
                faceMatcher={faceMatcher}
                question={question}
                setQuestion={setQuestion}
                setCompleted={setCompleted}
            />
        ) : (
            <CompleteWaitingRoom />
        )
    ) : (
        <WaitingRoom socket={socket} roomData={roomData} />
    );
}

export default JoinSocket;
