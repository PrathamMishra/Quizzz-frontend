import React,{useState,useEffect} from 'react'
import {useHistory, useLocation} from 'react-router'
import axios from "axios";
import {useSelector} from "react-redux";

function CreateRoom() {
    const history = useHistory();
    const location = useLocation();
    const [Public,setPublic] = useState(false);
    const [numOfQuestion,setNumOfQuestion] = useState(0);
    const [sizeLimit,setSizeLimit] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);
    function handleClick(){
        let roomCode="";
        for(let i=0;i<4;i++){
            const offset = Math.floor(Math.random()*26);
            roomCode+=String.fromCharCode(65+offset)
        }
        axios.post("http://localhost:8000/createRoom",{
            roomCode,sizeLimit,numOfQuestion,Public,name: user.profile.name
        }).then(()=>{
            history.push(`/Room?room=${roomCode}`);
        })
    }

    return (
        <div>
            <h1> Create Room</h1>
                <label>Public</label>
                <input type="checkbox" name="public" value={Public} onChange={(e)=>setPublic(e.target.value)} />
                <input type="number" name="sizeLimit" value={sizeLimit} placeholder="size limit" onChange={(e)=>setSizeLimit(e.target.value)}/>
                <input type="number" name="numOfQuestion" value={numOfQuestion} placeholder="no. of ques" onChange={(e)=>setNumOfQuestion(e.target.value)}/>
                <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default CreateRoom
