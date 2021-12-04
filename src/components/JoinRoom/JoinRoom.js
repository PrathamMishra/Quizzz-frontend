import React, { useState, useEffect, useRef } from "react";
import ContestList from "./ContestList/ContestList";

function JoinRoom() {
  const [key, setkey] = useState("");
  const [exam, setExam] = useState("");
  const [subject, setSub] = useState("");
  const [level, setLevel] = useState("");
  function handleJoin() {
    //add
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
        <ContestList />
      </div>
    </div>
  );
}

export default JoinRoom;
