import React from "react";
import { useHistory } from "react-router";

function ContestList({ list }) {
    const history = useHistory();
    function handleStart(roomCode) {
        //add
        history.push(`/Room?roomCode=${roomCode}`);
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Exam</th>
                        <th>subject</th>
                        <th>Participants</th>
                        <th>level</th>
                        <th>join</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((listItem) => {
                        <tr>
                            <td>{listItem.name}</td>
                            <td>{listItem.exam}</td>
                            <td>{listItem.subject}</td>
                            <td>{listItem.status}</td>
                            <td>{listItem.level}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleStart(listItem.roomCode)}
                                >
                                    Join
                                </button>
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ContestList;
