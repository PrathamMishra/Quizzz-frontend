import React,{useEffect, useState} from 'react';
import queryString from 'query-string';
import io from "socket.io-client";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import CreatorWaitingRoom from './CreatorWaitingRoom/CreatorWaitingRoom';
import WaitingRoom from './WaitingRoom/WaitingRoom';
import EnableFS from './EnableFS/EnableFS';
import Question from './Question/Question';
import GetImage from './GetImage/GetImage';
import Important from './Important/Important';

let socket;
function Room({location}) {
    const fullScreenHandler = useFullScreenHandle();
    const roomCode = queryString.parse(location.search).room;
    const ENDPOINT = "http://localhost:8000/";
    const [started,setStarted] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [roomData, setRoomData] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const [importantPoints, setImportantPoints] = useState(false);
    const [imageProvided, setImageProvided] = useState(false);
    const [image, setImage] = useState("");
    const [question, setQuestion] = useState({});

    function leaveRoom(state,handle){
        console.log(state);
    }

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("profile")));
        if(fullScreenHandler.active){
            socket=io(ENDPOINT);
            socket.emit("join",{name: user?.profile?.name,roomCode},(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    if(data.creator === user.profile.name){
                        setIsCreator(true);
                    }
                    setRoomData(data);
                }
            });
            return ()=>{
                socket.disconnect();
                socket.off();
            }
        }
    },[location, fullScreenHandler.active]);

    return (
        isCreator ?
            <CreatorWaitingRoom started={started} setStarted={setStarted}/>
        :
            imageProvided?
                <FullScreen handle = {fullScreenHandler} onChange = {leaveRoom}>
                    {
                        fullScreenHandler.active?
                            !started?
                                importantPoints?
                                    <Important />
                                    :
                                    <WaitingRoom />
                            :
                            <Question question={question} setQuestion={setQuestion} />
                        :
                        <>
                            <EnableFS fullScreenHandler={fullScreenHandler}/>
                            {/* <button onClick={fullScreenHandler.enter} >Enable FullScreen</button> */}
                        </>
                    }
                </FullScreen>
                :
                <GetImage setImage={setImage}/>
    )
}

export default Room;
