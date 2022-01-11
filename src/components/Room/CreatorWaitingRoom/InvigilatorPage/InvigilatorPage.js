import React from "react";
import { Button, Table } from "react-bootstrap";
import { useState } from "react";
function InvigilatorPage({ roomData, socket }) {
    function handleKick(id) {
        socket.emit("removePerson", id, roomData.roomCode);
    }
    const [bArr, setBArr] = useState([false]);
    return (
        <div>
            <h1>{roomData.name}</h1>
            <Table striped bordered hover responsive="sm">
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
                    {roomData.users.map((data, index) => (
                        <tr
                            key={index}
                            onClick={(event) => {
                                event.preventDefault();
                                const newbarr = bArr;
                                newbarr[index] = !newbarr[index];
                                setBArr(newbarr);
                            }}
                        >
                            <td>{index + 1}</td>
                            <td>{data.userData.name}</td>
                            <td>{data.status}</td>
                            <td>{data.score}</td>
                            <td>{data.warnings}</td>
                            <td>
                                {data.skipped.length +
                                    data.correct.length +
                                    data.wrong.length +
                                    1}
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        handleKick(data.socketId);
                                    }}
                                >
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
            </Table>
        </div>
    );
}

export default InvigilatorPage;
