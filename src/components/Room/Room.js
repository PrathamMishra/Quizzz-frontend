import React,{useEffect, useState} from 'react';
import queryString from 'query-string';
import io from "socket.io-client";
import axios from "axios";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import * as faceapi from 'face-api.js';

import CreatorWaitingRoom from './CreatorWaitingRoom/CreatorWaitingRoom';
import WaitingRoom from './WaitingRoom/WaitingRoom';
import EnableFS from './EnableFS/EnableFS';
import Question from './Question/Question';
import GetImage from './GetImage/GetImage';
import Important from './Important/Important';
import Loader from './Loader/Loader';

let socket;
function Room({location}) {
    const fullScreenHandler = useFullScreenHandle();
    const roomCode = queryString.parse(location.search).room;
    const ENDPOINT = "http://localhost:8000/";
    const [started,setStarted] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [roomData, setRoomData] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const [importantPoints, setImportantPoints] = useState(true);
    const [faceMatcher, setFaceMatcher] = useState(null);
    const [question, setQuestion] = useState({});
    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState("");
    const [message, setMessage] = useState("Loading...");
    
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("profile")));
        axios.get('localhost:8000/joinRoom?roomCode='+roomCode).then((data)=>{
            if(!data){
                alert('Room not found');
            }
            if(data.users.findIndex((user)=>user.name === user?.profile?.name)!==-1){
                alert('Already in room');
            }
            if(data.users.filter((user)=>user.status!=='kicked').length === data.sizeLimit){
                alert('Room Full');
            }
            if(data.started){
                alert('Match already Started');
            }
            if(data.creator===user?.profile?.name){
                setIsCreator(true);
            }
            setRoomData(data);
            console.log(data);
            setLoading(false);
        }); 
    },[location]);

    // loading face api models
    useEffect(()=>{
        if(fullScreenHandler.active){
            faceapi.nets.tinyFaceDetector.loadFromUri('/models').then(()=>{console.log("models loaded")}) 
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models').then(()=>{console.log("models loaded")}) 
            faceapi.nets.faceLandmark68Net.loadFromUri('/models').then(()=>{console.log("models loaded")}) 
            faceapi.nets.faceRecognitionNet.loadFromUri('/models').then(()=>{console.log("models loaded")})
            setTimeout(()=>{
                setImportantPoints(false);
            },5000);
        }
    },[fullScreenHandler]);

    useEffect(()=>{
        if(faceMatcher){
            socket=io(ENDPOINT);
            socket.emit("join",{name: user?.profile?.name,roomCode,img},(err,data)=>{
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
            socket.on('matchStarted',(data)=>{
                setQuestion(data.Question);
                setStarted(true);
            });
            socket.on('roomDisbanded',()=>{
                setMessage('Room disbanded by the creator.');
                setLoading(true);
                setTimeout(()=>{
                    //redirect user to home
                },3000);
            })
            socket.on('roomClosed',()=>{
                setMessage('Room closed by the creator.');
                setLoading(true);
                setTimeout(()=>{
                    //redirect user to home
                },3000);
            })
            socket.on('kickedFromRoom',()=>{
                setMessage('Sorry, You were kicked by the creator.');
                setLoading(true);
                setTimeout(()=>{
                    //redirect user to home
                },3000);
            })
            socket.on('list',(data)=>{
                data.users.sort(compare);
                setRoomData(data);
            })
        }
        return ()=>{
            if(socket){
                socket.disconnect();
                socket.off();
            }
        }
    },[faceMatcher]);

    function compare( a, b ) {
        if ( a.score < b.score ){
          return 1;
        }
        if ( a.score > b.score ){
          return -1;
        }
        if ( a.time < b.time ){
            return -1;
        }
        if ( a.time > b.time ){
            return 1;
        }
        return 0;
    }

    return (
        loading?
            <Loader message={message}/>
        :
            isCreator ?
                <CreatorWaitingRoom started={started} setStarted={setStarted}/>
            :
                <FullScreen handle = {fullScreenHandler}>
                    {
                        fullScreenHandler.active?
                            started?
                                <Question roomCode={roomCode} socket={socket} faceapi={faceapi} faceMatcher={faceMatcher} question={question} setQuestion={setQuestion} />
                            :
                                importantPoints?
                                    <Important />
                                :    
                                    faceMatcher?
                                        <WaitingRoom socket={socket} roomData={roomData} />
                                    :
                                        <GetImage faceapi={faceapi} setFaceMatcher={setFaceMatcher} setImg={setImg} />
                        :
                            <EnableFS fullScreenHandler={fullScreenHandler}/>
                    }
                </FullScreen>
    )
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