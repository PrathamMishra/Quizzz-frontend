import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import InvigilatorPage from "./InvigilatorPage/InvigilatorPage";

function CreatorWaitingRoom({ started, setStarted, roomData, socket }) {
    const history = useHistory();
    function startMatch() {
        socket.emit("start", roomData.roomCode);
        setStarted(true);
    }
    function disbandMatch() {
        socket.emit("disband", roomData.roomCode);
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
