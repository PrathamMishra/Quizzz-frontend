import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import * as faceapi from "face-api.js";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import CreatorWaitingRoom from "./CreatorWaitingRoom/CreatorWaitingRoom";
import EnableFS from "./EnableFS/EnableFS";
import GetImage from "./GetImage/GetImage";
import Important from "./Important/Important";
import Loader from "./Loader/Loader";
import "./Room.css";
import JoinSocket from "./JoinSocket/JoinSocket";

function Room({ location }) {
    const history = useHistory();
    const fullScreenHandler = useFullScreenHandle();
    const roomCode = queryString.parse(location.search).roomCode;
    const [user, setUser] = useState(
        useSelector((state) => state.auth.data.user)
    );
    const [started, setStarted] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [importantPoints, setImportantPoints] = useState(true);
    const [faceMatcher, setFaceMatcher] = useState(null);
    const [faceFound, setFaceFound] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        axios
            .get(
                process.env.REACT_APP_BACKEND_URL +
                    `/api/v1/rooms/joinRoom?roomCode=${roomCode}`
            )
            .then(({ data }) => {
                console.log(data);
                if (!data) {
                    setMessage("Room not found");
                    setLoading(true);
                    setTimeout(() => {
                        history.push("/");
                    }, 3000);
                    return;
                }
                if (
                    data?.users?.findIndex(
                        (userData) => userData.userData._id === user?._id
                    ) !== -1
                ) {
                    setMessage("Already in room");
                    setLoading(true);
                    setTimeout(() => {
                        history.push("/");
                    }, 3000);
                }
                if (
                    data?.users?.filter(
                        (userData) => userData.status !== "kicked"
                    ).length === data.sizeLimit
                ) {
                    setMessage("Room Full");
                    setLoading(true);
                    setTimeout(() => {
                        history.push("/");
                    }, 3000);
                }
                if (data?.started) {
                    setMessage("Match already Started");
                    setLoading(true);
                    setTimeout(() => {
                        history.push("/");
                    }, 3000);
                }
                if (data?.creator?._id === user?._id) {
                    setIsCreator(true);
                }
                setLoading(false);
            });
    }, []);

    // loading face api models
    useEffect(() => {
        async function helper() {
            if (fullScreenHandler.active && !modelsLoaded) {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
                setModelsLoaded(true);
                setTimeout(() => {
                    setImportantPoints(false);
                }, 5000);
            }
        }
        helper();
    }, [fullScreenHandler]);

    return loading ? (
        <Loader message={message} />
    ) : isCreator ? (
        <CreatorWaitingRoom
            roomCode={roomCode}
            setMessage={setMessage}
            setLoading={setLoading}
        />
    ) : (
        <FullScreen handle={fullScreenHandler}>
            {fullScreenHandler.active ? (
                importantPoints ? (
                    <Important />
                ) : !faceFound ? (
                    <GetImage
                        faceapi={faceapi}
                        setFaceMatcher={setFaceMatcher}
                        setFaceFound={setFaceFound}
                    />
                ) : (
                    <JoinSocket
                        roomCode={roomCode}
                        setMessage={setMessage}
                        setLoading={setLoading}
                        faceapi={faceapi}
                        faceMatcher={faceMatcher}
                    />
                )
            ) : (
                <EnableFS fullScreenHandler={fullScreenHandler} />
            )}
        </FullScreen>
    );
}

export default Room;
