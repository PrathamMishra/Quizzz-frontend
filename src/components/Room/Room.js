import React,{useEffect, useState} from 'react';
import queryString from 'query-string';
import io from "socket.io-client";
import {FullScreen, useFullScreenHandle} from "react-full-screen";

let socket;
function Room({location}) {
    const fullScreenHandler = useFullScreenHandle();
    const roomCode = queryString.parse(location.search).room;
    const ENDPOINT = "http://localhost:8000/";
    const [started,setStarted] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [roomData, setRoomData] = useState({});
    const [isCreator, setIsCreator] = useState(false);

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
        <FullScreen handle = {fullScreenHandler} onChange = {leaveRoom}>
            {
                fullScreenHandler.active?
                    !started?
                        isCreator?
                        <>
                            <button onClick = {()=>{setStarted(true)}}>start</button>
                            <button>close</button>
                        </>
                        :
                        <>
                            <button>Leave</button>
                        </>
                    :
                        <>
                            <h1>Quiz</h1>
                        </>
                :
                    <button onClick={fullScreenHandler.enter} >Enable FullScreen</button>
            }
        </FullScreen>
    )
}

export default Room
