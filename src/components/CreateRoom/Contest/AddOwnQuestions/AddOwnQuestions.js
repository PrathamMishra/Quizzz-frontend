import React, { useEffect, useState } from "react";
import AddedQuestion from "./AddedQuestion/AddedQuestion";
import MyPaginateComponent from "./MyPaginateComponent/MyPaginateComponent";

function AddOwnQuestions({
    numOfQuestion,
    addedQuestions,
    setAddedQuestions,
    addedQuestionsValid,
    setAddedQuestionsValid,
}) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div>
            <MyPaginateComponent
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                addedQuestionsValid={addedQuestionsValid}
                numOfQuestion={numOfQuestion}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <AddedQuestion
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                addedQuestions={addedQuestions}
                setAddedQuestions={setAddedQuestions}
                setAddedQuestionsValid={setAddedQuestionsValid}
                numOfQuestion={numOfQuestion}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default AddOwnQuestions;
