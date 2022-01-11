import React, { useEffect, useState } from "react";
import MyPaginateComponent from "./MyPaginateComponent/MyPaginateComponent";

function AddOwnQuestions({ numOfQuestion, setAddedQuestions }) {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    return (
        <div>
            <MyPaginateComponent
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                numOfQuestion={numOfQuestion}
            />
        </div>
    );
}

export default AddOwnQuestions;
