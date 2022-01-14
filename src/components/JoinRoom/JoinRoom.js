import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import ContestList from "./ContestList/ContestList";
import CustomNavbar from "../CustomNavbar/CustomNavbar";

function JoinRoom() {
    const [key, setkey] = useState("");
    const [exam, setExam] = useState("");
    const [subject, setSub] = useState("");
    const [level, setLevel] = useState("");
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const history = useHistory();
    useEffect(() => {
        const query = {};
        if (exam.length) query.exam = exam;
        if (subject.length) query.subject = subject;
        if (level.length) query.level = level;
        axios
            .post(
                process.env.REACT_APP_BACKEND_URL + "/api/v1/rooms/joinRoom",
                query
            )
            .then(({ data }) => {
                console.log(data);
                if (!data.length) {
                    setError("No rooms found");
                } else setList(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [exam, subject, level]);
    function handleJoin() {
        //add
        history.push(`/Room?roomCode=${key}`);
    }

    return (
        <div>
            <CustomNavbar />
            <div>
                <input
                    value={key}
                    type="text"
                    name="key"
                    placeholder="Enter code"
                    onChange={(event) => {
                        setkey(event.target.value);
                    }}
                    align="left"
                />
                <button className="btn btn-primary" onClick={handleJoin}>
                    join room
                </button>
            </div>
            <div>
                <select
                    onChange={(event) => {
                        setExam(event.target.value);
                    }}
                >
                    <option value="term1">term1</option>
                    <option value="term2">term2</option>
                </select>
                <select
                    onChange={(event) => {
                        setSub(event.target.value);
                    }}
                >
                    <option value="hindi">hindi</option>
                    <option value="sanskrit">sanskrit</option>
                    <option value="tamil">tamil</option>
                </select>
                <select
                    onChange={(event) => {
                        setLevel(event.target.value);
                    }}
                >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                    <option value="mixed">mixed</option>
                </select>
            </div>
            <div>
                {error.length ? (
                    <div style={{ textAlign: "center" }}>{error}</div>
                ) : (
                    <ContestList list={list} />
                )}
            </div>
        </div>
    );
}

export default JoinRoom;
