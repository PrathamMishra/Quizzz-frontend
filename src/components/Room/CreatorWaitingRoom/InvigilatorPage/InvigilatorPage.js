import zIndex from "@material-ui/core/styles/zIndex";
import React from "react";
import { useState } from "react";
function InvigilatorPage() {
  const [list, setList] = useState([
    {
      rank: 1,
      name: "tanmay",
      status: "active",
      score: 69,
      warning: 0,
      questions: 1,
      correct: 6,
      wrong: 9,
      skipped: 69,
    },
  ]);
  function handleJoin() {
    //join
  }
  const [bArr, setBArr] = useState([false]);
  return (
    <div>
      <h1>abc</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>status</th>
            <th>Score</th>
            <th>warnings</th>
            <th>questions</th>
            <th>join</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => (
            <tr
              key={index}
              onClick={(event) => {
                console.log("lodaa");
                event.preventDefault();
                const newbarr = bArr;
                newbarr[index] = !newbarr[index];
                setBArr(newbarr);
              }}
            >
              <td>{data.rank}</td>
              <td>{data.name}</td>
              <td>{data.status}</td>
              <td>{data.score}</td>
              <td>{data.warning}</td>
              <td>{data.questions}</td>
              <td>
                <button className="btn btn-primary" onClick={handleJoin}>
                  kick
                </button>
              </td>
              {bArr[index] ? (
                <td>
                  <p>{data.correct}</p>
                  <p>{data.wrong}</p>
                  <p>{data.skipped}</p>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvigilatorPage;
