import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import Contest from "./Contest/Contest";
import OneVsOne from "./OneVsOne/OneVsOne";
import Challenge from "./Challenge/Challenge";

function CreateRoom() {
    const [roomType, setRoomType] = useState("");
    const [user, setUser] = useState(
        useSelector((state) => state.auth.data.user)
    );
    switch (roomType) {
        case "":
            return (
                <div>
                    <h2>Select Room Type:</h2>
                    <div
                        onClick={() => {
                            setRoomType("1v1");
                        }}
                    >
                        1 v 1
                    </div>
                    <div
                        onClick={() => {
                            setRoomType("challenge");
                        }}
                    >
                        Challenge
                    </div>
                    {user.role === "teacher" ? (
                        <div
                            onClick={() => {
                                setRoomType("contest");
                            }}
                        >
                            Contest
                        </div>
                    ) : null}
                </div>
            );
        case "1v1":
            return <OneVsOne />;
        case "challenge":
            return <Challenge />;
        case "contest":
            return <Contest />;
    }
    return <div>Loading...</div>;
}

export default CreateRoom;
