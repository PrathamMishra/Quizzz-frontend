import React,{useEffect, useState} from 'react'
import queryString from 'query-string';
import io from "socket.io-client";


let socket;
function Room({location}) {
    const roomCode = queryString.parse(location.search).room;
    const ENDPOINT = "http://localhost:8000/";

    useEffect(()=>{
        socket=io(ENDPOINT);
        socket.emit("join",{name: `user`,roomCode},(err)=>{
            if(err){
                console.log(err);
            }
        });
        return ()=>{
            socket.disconnect();
            socket.off();
        }
    },[ENDPOINT]);

    return (
        <div>
            {roomCode}
            <button >start</button>
            <button>close</button>
        </div>
    )
}

export default Room
