import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ContestList from "./ContestList/ContestList";
import { useHistory } from "react-router";

function JoinRoom() {
  const [key, setkey] = useState("");
  const [exam, setExam] = useState("");
  const [subject, setSub] = useState("");
  const [level, setLevel] = useState("");
  const [list, setList] = useState([]);
  const history = useHistory();
  useEffect(()=>{
    const query = {
      exam,
      subject,
      level
    };
    axios.post('localhost:8000/joinRoom',query,(data)=>{
      if(!data.length){
          alert('No rooms found');
      }
      setList(data);
    }); 
  },[]);
  function handleJoin() {
    //add
    history.push(`localhost:3000/Room?roomCode=${key}`);
  }

  return (
    <div>
      <div>#navbar</div>
      <div>
        <input
          value={key}
          type="text"
          name="key"
          placeholder="enter code"
          onChange={(event) => {
            setkey(event.target.value);
          }}
          align="left"
        />
        <button className="btn btn-primary" onClick={handleJoin}>
          join room
        </button>
      </div>
      <div>
        <select
          onChange={(event) => {
            setExam(event.target.value);
          }}
        >
          <option value="term1">term1</option>
          <option value="term2">term2</option>
        </select>
        <select
          onChange={(event) => {
            setSub(event.target.value);
          }}
        >
          <option value="hindi">hindi</option>
          <option value="sanskrit">sanskrit</option>
          <option value="tamil">tamil</option>
        </select>
        <select
          onChange={(event) => {
            setLevel(event.target.value);
          }}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
          <option value="mixed">mixed</option>
        </select>
      </div>
      <div>
        <ContestList list={list} />
      </div>
    </div>
  );
}

export default JoinRoom;