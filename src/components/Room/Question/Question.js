import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
};
let timeout;

//for tab change
let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function Question({
    socket,
    faceapi,
    faceMatcher,
    question,
    setQuestion,
    roomCode,
}) {
    const webcamRef = useRef(null);
    const imgRef = useRef(null);
    const [img, setImg] = useState("");
    const [time, setTime] = useState(0);
    const [Warning, setWarning] = useState("");
    let warnTime = 0;
    useEffect(() => {
        document.addEventListener(
            visibilityChange,
            handleVisibilityChange,
            false
        );
        timeout = setInterval(async () => {
            setTime((prev) => prev + 1);
            const imageSrc = webcamRef.current.getScreenshot();
            setImg(imageSrc);
            const faces = await faceapi
                .detectAllFaces(imgRef.current)
                .withFaceLandmarks()
                .withFaceDescriptors();
            if (faces.length > 1) {
                if (warnTime === 0) {
                    socket.emit("warning", (banned) => {
                        if (banned) {
                            //redirect to student waiting room
                        }
                    });
                }
                warnTime++;
                if (warnTime === 5) {
                    socket.emit("cheated", roomCode);
                    //redirect to student waiting room
                }
                setWarning(
                    `More than 1 person, You'll be banned in ${6 - warnTime}`
                );
            } else if (faces.length === 0) {
                if (warnTime === 0) {
                    socket.emit("warning", (banned) => {
                        if (banned) {
                            //redirect to student waiting room
                        }
                    });
                }
                warnTime++;
                if (warnTime === 5) {
                    socket.emit("cheated", roomCode);
                    //redirect to student waiting room
                }
                setWarning(
                    `No Face found, You'll be banned in ${6 - warnTime}`
                );
            } else {
                const bestMatch = faceMatcher.findBestMatch(
                    faces[0].descriptor
                );
                if (bestMatch.lable === "unknown") {
                    if (warnTime === 0) {
                        socket.emit("warning", (banned) => {
                            if (banned) {
                                //redirect to student waiting room
                            }
                        });
                    }
                    warnTime++;
                    if (warnTime === 5) {
                        socket.emit("cheated", roomCode);
                        //redirect to student waiting room
                    }
                    setWarning(
                        `Wrong Person, You'll be banned in ${6 - warnTime}`
                    );
                } else {
                    warnTime = 0;
                    setWarning("");
                }
            }
        }, 1000);
        return () => {
            document.removeEventListener(
                visibilityChange,
                handleVisibilityChange
            );
            if (timeout) {
                clearInterval(timeout);
            }
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            socket.emit(
                "userAnswered",
                -1,
                true,
                roomCode,
                time,
                (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (data.message === "Quiz Complete") {
                            //redirect to student waiting room
                        } else {
                            setQuestion(data.Question);
                        }
                    }
                }
            );
        }, question.timeLimit * 1000);
    }, [question]);

    function handleSubmit(ans) {
        socket.emit("userAnswered", ans, false, roomCode, time, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data.message === "Quiz Complete") {
                    //redirect to student waiting room
                } else {
                    setQuestion(data.Question);
                }
            }
        });
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            socket.emit("warning", (banned) => {
                setWarning("Dont change tabs otherwise you'll be kicked.");
                if (banned) {
                    //redirect to student waiting room
                }
            });
        } else {
            setTimeout(() => {
                setWarning("");
            }, 3000);
        }
    }
    return (
        <div>
            <Webcam
                style={{ display: "none" }}
                audio={false}
                height={200}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={220}
                videoConstraints={videoConstraints}
            />
            <img src={img} style={{ display: "none" }} alt="" ref={imgRef} />
            {Warning.length ? (
                <h1>{Warning}</h1>
            ) : (
                <div>
                    <h2>{question?.question}</h2>
                    <p>{`${time / 60}:${time % 60}`}</p>
                    {question?.question_img?.length
                        ? question.question_img.map((img) => (
                              <img src={img} alt="questionImg" />
                          ))
                        : null}
                    <div
                        onClick={() => {
                            handleSubmit(0);
                        }}
                    >
                        {question.options[0]}
                        {question?.option_img[0] ? (
                            <img src={question?.option_img[0]} alt="option" />
                        ) : null}
                    </div>
                    <div
                        onClick={() => {
                            handleSubmit(1);
                        }}
                    >
                        {question.options[1]}
                        {question?.option_img[1] ? (
                            <img src={question?.option_img[1]} alt="option" />
                        ) : null}
                    </div>
                    <div
                        onClick={() => {
                            handleSubmit(2);
                        }}
                    >
                        {question.options[2]}
                        {question?.option_img[2] ? (
                            <img src={question?.option_img[2]} alt="option" />
                        ) : null}
                    </div>
                    <div
                        onClick={() => {
                            handleSubmit(3);
                        }}
                    >
                        {question.options[3]}
                        {question?.option_img[3] ? (
                            <img src={question?.option_img[3]} alt="option" />
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Question;
