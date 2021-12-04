import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function ContestList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("").then((result) => {
      setList(result.data);
    });
  }, []);
  function handleStart() {
    //add
  }
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Exam</th>
          <th>subject</th>
          <th>Participants/</th>
          <th>level</th>
          <th>join</th>
        </tr>
        {/* <tr>
          <td>{list.code}</td>
          <td>{list.exam}</td>
          <td>{list.subject}</td>
          <td>{list.status}</td>
          <td>{list.level}</td>
          <td>
            <button className="btn btn-primary" onClick={handleStart}>
              start
            </button>
          </td>
        </tr> */}
        <tr>
          <td>abs</td>
          <td>term1</td>
          <td>hindi</td>
          <td>live</td>
          <td>hard</td>
          <td>
            <button className="btn btn-primary" onClick={handleStart}>
              start
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ContestList;
