import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

import "./MyPaginateComponent.css";

function MyPaginateComponent({
    currentQuestion,
    setCurrentQuestion,
    currentPage,
    setCurrentPage,
    addedQuestionsValid,
    numOfQuestion,
}) {
    const [previousDis, setPreviousDis] = useState(true);
    const [nextDis, setNextDis] = useState(false);
    const [firstDis, setFirstDis] = useState(true);
    const [lastDis, setLastDis] = useState(false);
    const [pItems, setPItems] = useState([]);

    useEffect(() => {
        setCurrentPage(1);
        setCurrentQuestion(1);
        setPreviousDis(true);
        setFirstDis(true);
        if (numOfQuestion > 5) {
            setNextDis(false);
            setLastDis(false);
        }
    }, [numOfQuestion]);
    useEffect(() => {
        let newPItems = [];
        setPItems(newPItems);
        if (currentPage === 1) {
            setFirstDis(true);
            setPreviousDis(true);
        } else {
            setFirstDis(false);
            setPreviousDis(false);
        }
        if (numOfQuestion <= 5 * currentPage) {
            setLastDis(true);
            setNextDis(true);
            for (let i = 5 * (currentPage - 1) + 1; i <= numOfQuestion; i++) {
                newPItems.push(
                    <Pagination.Item
                        className={
                            addedQuestionsValid[i - 1] && i !== currentQuestion
                                ? "completedQuestion"
                                : i === currentQuestion
                                ? "currentQuestion"
                                : null
                        }
                        key={i}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
            setPItems(newPItems);
        } else {
            setLastDis(false);
            setNextDis(false);
            for (let i = 5 * (currentPage - 1) + 1; i <= 5 * currentPage; i++) {
                newPItems.push(
                    <Pagination.Item
                        className={
                            addedQuestionsValid[i - 1] && i !== currentQuestion
                                ? "completedQuestion"
                                : i === currentQuestion
                                ? "currentQuestion"
                                : null
                        }
                        key={i}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        }
    }, [currentPage, currentQuestion, addedQuestionsValid]);

    function moveToFirstPage() {
        if (numOfQuestion > 5) {
            setNextDis(false);
            setLastDis(false);
        }
        setPreviousDis(true);
        setFirstDis(true);
        setCurrentPage(1);
        setCurrentQuestion(1);
    }
    function moveToLastPage() {
        setPreviousDis(false);
        setFirstDis(false);
        if (numOfQuestion % 5) {
            setCurrentPage(parseInt(numOfQuestion / 5) + 1);
            setCurrentQuestion(parseInt(numOfQuestion / 5) * 5 + 1);
        } else {
            setCurrentPage(parseInt(numOfQuestion / 5));
            setCurrentQuestion((parseInt(numOfQuestion / 5) - 1) * 5 + 1);
        }
    }
    function moveToPrevPage() {
        if (numOfQuestion > 5) {
            setNextDis(false);
            setLastDis(false);
        }
        if (currentPage <= 2) setPreviousDis(true);
        if (currentPage <= 2) setFirstDis(true);
        setCurrentPage(currentPage - 1);
        setCurrentQuestion((currentPage - 2) * 5 + 1);
    }
    function moveToNextPage() {
        setPreviousDis(false);
        setFirstDis(false);
        setCurrentPage(currentPage + 1);
        setCurrentQuestion(currentPage * 5 + 1);
    }
    return (
        <div>
            <Pagination>
                <Pagination.First disabled onClick={moveToFirstPage} />
                <Pagination.Prev disabled onClick={moveToPrevPage} />
                {pItems}
                <Pagination.Next disabled onClick={moveToNextPage} />
                <Pagination.Last disabled onClick={moveToLastPage} />
            </Pagination>
        </div>
    );
}

export default MyPaginateComponent;
