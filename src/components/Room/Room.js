import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import axios from "axios";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import * as faceapi from "face-api.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CreatorWaitingRoom from "./CreatorWaitingRoom/CreatorWaitingRoom";
import WaitingRoom from "./WaitingRoom/WaitingRoom";
import EnableFS from "./EnableFS/EnableFS";
import Question from "./Question/Question";
import GetImage from "./GetImage/GetImage";
import Important from "./Important/Important";
import Loader from "./Loader/Loader";
import "./Room.css";

let socket;
function Room({ location }) {
    const history = useHistory();
    const fullScreenHandler = useFullScreenHandle();
    const roomCode = queryString.parse(location.search).roomCode;
    const ENDPOINT = "http://localhost:8000/";
    const [started, setStarted] = useState(false);
    const [user, setUser] = useState(
        useSelector((state) => state.auth.data.user)
    );
    const [roomData, setRoomData] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const [importantPoints, setImportantPoints] = useState(true);
    const [faceMatcher, setFaceMatcher] = useState(null);
    const [faceFound, setFaceFound] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [question, setQuestion] = useState({});
    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState("");
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        axios
            .post("http://localhost:8000/api/v1/rooms/joinRoom", {
                roomCode,
            })
            .then(({ data }) => {
                console.log(data);
                if (!data) {
                    alert("Room not found");
                }
                if (
                    data?.users?.findIndex(
                        (userData) => userData.userData._id === user?._id
                    ) !== -1
                ) {
                    alert("Already in room");
                }
                if (
                    data?.users?.filter(
                        (userData) => userData.status !== "kicked"
                    ).length === data.sizeLimit
                ) {
                    alert("Room Full");
                }
                if (data?.started) {
                    alert("Match already Started");
                }
                if (data?.creator?._id === user?._id) {
                    setIsCreator(true);
                }
                setRoomData(data);
                setLoading(false);
            });
    }, [location]);

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

    useEffect(() => {
        if (faceFound || isCreator) {
            socket = io(ENDPOINT);
            socket.emit(
                "join",
                { userId: user?._id, roomCode, img },
                (err, data) => {
                    if (err) {
                        console.log(err);
                        history.push("/");
                    } else {
                        console.log(data);
                        if (data?.creator === user?._id) {
                            setIsCreator(true);
                        }
                        setRoomData(data);
                    }
                }
            );
            socket.on("matchStarted", (data) => {
                setQuestion(data.Question);
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
            socket.on("list", (list) => {
                list.sort(compare);
                console.log(list);
                setRoomData({ ...roomData, users: list });
            });
        }
        return () => {
            if (socket) {
                socket.disconnect();
                socket.off();
            }
        };
    }, [isCreator, faceFound]);

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

    return loading ? (
        <Loader message={message} />
    ) : isCreator ? (
        <CreatorWaitingRoom
            socket={socket}
            started={started}
            setStarted={setStarted}
            roomData={roomData}
        />
    ) : (
        <FullScreen handle={fullScreenHandler}>
            {fullScreenHandler.active ? (
                started ? (
                    <Question
                        roomCode={roomCode}
                        socket={socket}
                        faceapi={faceapi}
                        faceMatcher={faceMatcher}
                        question={question}
                        setQuestion={setQuestion}
                    />
                ) : importantPoints ? (
                    <Important />
                ) : faceFound ? (
                    <WaitingRoom socket={socket} roomData={roomData} />
                ) : (
                    <GetImage
                        faceapi={faceapi}
                        setFaceMatcher={setFaceMatcher}
                        setFaceFound={setFaceFound}
                        setImg={setImg}
                    />
                )
            ) : (
                <EnableFS fullScreenHandler={fullScreenHandler} />
            )}
        </FullScreen>
    );
}

export default Room;

// alternative

// (
//     loading?
//         <Loader />
//     :
//         isCreator ?
//             <CreatorWaitingRoom started={started} setStarted={setStarted}/>
//         :
//             faceMatcher?
//                 <FullScreen handle = {fullScreenHandler}>
//                     {
//                         fullScreenHandler.active?
//                             started?
//                                 <Question faceapi={faceapi} faceMatcher={faceMatcher} question={question} setQuestion={setQuestion} />
//                             :
//                                 importantPoints?
//                                     <Important />
//                                     :
//                                     <WaitingRoom />
//                         :
//                         <>
//                             <EnableFS fullScreenHandler={fullScreenHandler}/>
//                         </>
//                     }
//                 </FullScreen>
//                 :
//                 <GetImage faceapi={faceapi} setFaceMatcher={setFaceMatcher} />
// )
