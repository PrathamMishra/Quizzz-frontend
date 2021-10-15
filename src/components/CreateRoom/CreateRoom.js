import React,{useState} from 'react'
import { useHistory} from 'react-router'
import axios from "axios";

function CreateRoom() {
    const history = useHistory();
    const [name,setName] = useState("");
    const [Public,setPublic] = useState(false);
    const [numOfQuestion,setNumOfQuestion] = useState(0);
    const [sizeLimit,setSizeLimit] = useState(0);
    function handleClick(){
        let roomCode="";
        for(let i=0;i<4;i++){
            const offset = Math.floor(Math.random()*26);
            roomCode+=String.fromCharCode(65+offset)
        }
        axios.post("http://localhost:8000/createRoom",{
            roomCode,sizeLimit,numOfQuestion,Public,name,user: [name]
        }).then(()=>{
            history.push(`/Room?room=${roomCode}`);
        })
    }
    return (
        <div>
            <h1> Create Room</h1>
                <input type="text" name="name" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <label>Public</label>
                <input type="checkbox" name="public" value={Public} onChange={(e)=>setPublic(e.target.value)} />
                <input type="number" name="sizeLimit" value={sizeLimit} placeholder="size limit" onChange={(e)=>setSizeLimit(e.target.value)}/>
                <input type="number" name="numOfQuestion" value={numOfQuestion} placeholder="no. of ques" onChange={(e)=>setNumOfQuestion(e.target.value)}/>
                <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default CreateRoom
