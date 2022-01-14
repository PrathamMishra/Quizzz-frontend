import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { InputGroup, Button, Form, Row, Col } from "react-bootstrap";

function AddedQuestion({
    currentQuestion,
    setCurrentQuestion,
    setCurrentPage,
    addedQuestions,
    setAddedQuestions,
    setAddedQuestionsValid,
    numOfQuestion,
}) {
    const questionRef = useRef(null);
    const [questionFU, setQuestionFU] = useState(0);
    const explanationRef = useRef(null);
    const [explanationFU, setExplanationFU] = useState(0);
    const optionOneRef = useRef(null);
    const optionTwoRef = useRef(null);
    const optionThreeRef = useRef(null);
    const optionFourRef = useRef(null);
    const [optionOneFU, setOptionOneFU] = useState(0);
    const [optionTwoFU, setOptionTwoFU] = useState(0);
    const [optionThreeFU, setOptionThreeFU] = useState(0);
    const [optionFourFU, setOptionFourFU] = useState(0);
    const [marks, setMarks] = useState(1);
    const [negativeMarks, setNegativeMarks] = useState(0);
    const [timeLimit, setTimeLimit] = useState(30);
    const [chapterOf, setChapterOf] = useState(0);
    const [previousRecord, setPreviousRecord] = useState("");
    const [validated, setValidated] = useState(false);
    const [question, setQuestion] = useState("");
    const [question_img, setQuestionImg] = useState("");
    const [answer, setAnswer] = useState(-1);
    const [explanation, setExplanation] = useState("");
    const [explanation_img, setExplanationImg] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [option_img, setOptionImg] = useState(["", "", "", ""]);

    function getB64(data) {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            return e.target.result;
        });
        FR.readAsDataURL(data);
    }
    function questionFileUploaded(e) {
        if (e.target.value) {
            if (e.target.files[0]?.size / 1024 > 50) {
                setQuestionFU(-1);
            } else {
                setQuestionImg(getB64(e.target.files[0]));
                setQuestionFU(1);
            }
        } else {
            setQuestionFU(0);
        }
    }
    function explanationFileUploaded(e) {
        if (e.target.value) {
            if (e.target.files[0]?.size / 1024 > 50) {
                setExplanationFU(-1);
            } else {
                setExplanationImg(getB64(e.target.files[0]));
                setExplanationFU(1);
            }
        } else {
            setExplanationFU(0);
        }
    }
    function optionFileUploaded(e, index) {
        if (e.target.value) {
            if (e.target.files[0]?.size / 1024 > 50) {
                if (index === 0) setOptionOneFU(-1);
                if (index === 1) setOptionTwoFU(-1);
                if (index === 2) setOptionThreeFU(-1);
                if (index === 3) setOptionFourFU(-1);
            } else {
                const newOptionImg = option_img;
                newOptionImg[index] = getB64(e.target.files[0]);
                setOptionImg(newOptionImg);
                if (index === 0) setOptionOneFU(1);
                if (index === 1) setOptionTwoFU(1);
                if (index === 2) setOptionThreeFU(1);
                if (index === 3) setOptionFourFU(1);
            }
        } else {
            if (index === 0) setOptionOneFU(0);
            if (index === 1) setOptionTwoFU(0);
            if (index === 2) setOptionThreeFU(0);
            if (index === 3) setOptionFourFU(0);
        }
    }

    function handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            setAddedQuestionsValid((prevArr) => {
                const newArr = prevArr;
                newArr[currentQuestion - 1] = false;
                return prevArr;
            });
            event.stopPropagation();
        } else {
            axios
                .post(
                    process.env.REACT_APP_BACKEND_URL +
                        "/api/v1/questions/createTempQuestion",
                    {
                        question,
                        question_img,
                        answer,
                        options,
                        option_img,
                        explanation,
                        explanation_img,
                        timeLimit,
                        marks,
                        negativeMarks,
                        chapterOf,
                        previousRecord,
                    }
                )
                .then((res) => {
                    setAddedQuestions((prevArr) => {
                        const newArr = prevArr;
                        newArr[currentQuestion] = res.data.data.id;
                        return newArr;
                    });
                    setAddedQuestionsValid((prevArr) => {
                        const newArr = prevArr;
                        newArr[currentQuestion - 1] = true;
                        return prevArr;
                    });
                    if (
                        currentQuestion !== numOfQuestion &&
                        currentQuestion % 5 === 0
                    )
                        setCurrentPage((prev) => prev + 1);
                    if (currentQuestion === numOfQuestion) {
                        setCurrentQuestion(1);
                        setCurrentPage(1);
                    } else {
                        setCurrentQuestion((prev) => prev + 1);
                    }
                });
        }
        setValidated(true);
    }
    return (
        <div>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="m-3"
            >
                <Row>
                    <Col className="mb-3" xs="6" sm>
                        <Form.Control
                            type="number"
                            placeholder="Marks"
                            max={20}
                            min={1}
                            onChange={(e) => setMarks(e.target.value)}
                            required
                        />
                    </Col>
                    <Col className="mb-3" xs="6" sm>
                        <Form.Control
                            type="number"
                            placeholder="Negative Marks"
                            max={10}
                            min={0}
                            onChange={(e) => setNegativeMarks(e.target.value)}
                            required
                        />
                    </Col>
                    <Col className="mb-3" xs="6" sm>
                        <Form.Control
                            type="number"
                            placeholder="Time Limit in Seconds"
                            onChange={(e) => setTimeLimit(e.target.value)}
                            max={1800}
                            min={30}
                            required
                        />
                    </Col>
                    <Col className="mb-3" xs="6" sm>
                        <Form.Control
                            type="number"
                            placeholder="C.O. (Chapter Of)"
                            onChange={(e) => setChapterOf(e.target.value)}
                            max={20}
                            min={1}
                        />
                    </Col>
                    <Col className="mb-3" xs="6" sm>
                        <Form.Control
                            type="text"
                            placeholder="Previous Record (eg. JEE 2018)"
                            onChange={(e) => setPreviousRecord(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3">
                        <InputGroup hasValidation>
                            <Form.Control
                                as="textarea"
                                placeholder="Add Your Question"
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            />
                            <Form.Control
                                className="d-none"
                                ref={questionRef}
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={questionFileUploaded}
                                name="question"
                                isInvalid={
                                    questionFU === -1 &&
                                    questionRef.current?.files[0]?.size
                                }
                            />
                            <Button
                                variant={
                                    questionFU === 1
                                        ? "outline-success"
                                        : questionFU === 0
                                        ? "outline-secondary"
                                        : "outline-danger"
                                }
                                id="button-addon1"
                                onClick={() => {
                                    questionRef.current?.click();
                                }}
                            >
                                Upload Image
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                File size should be less than 50kb
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3" sm="6">
                        <InputGroup hasValidation>
                            <InputGroup.Text>A</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Option 1"
                                onChange={(e) => {
                                    const newOptions = options;
                                    newOptions[0] = e.target.value;
                                    setOptions(newOptions);
                                }}
                                required
                            />
                            <Form.Control
                                className="d-none"
                                type="file"
                                ref={optionOneRef}
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => {
                                    optionFileUploaded(e, 0);
                                }}
                                name="option1"
                                isInvalid={
                                    optionOneFU === -1 &&
                                    optionOneRef.current?.files[0]?.size
                                }
                            />
                            <Button
                                variant={
                                    optionOneFU === 1
                                        ? "outline-success"
                                        : optionOneFU === 0
                                        ? "outline-secondary"
                                        : "outline-danger"
                                }
                                onClick={() => {
                                    optionOneRef.current?.click();
                                }}
                            >
                                Upload Image
                            </Button>
                            <InputGroup.Radio
                                name="answer"
                                value="0"
                                onClick={() => setAnswer(0)}
                            />
                            <Form.Control.Feedback type="invalid">
                                File size should be less than 50kb
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" sm="6">
                        <InputGroup hasValidation>
                            <InputGroup.Text>B</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Option 2"
                                onChange={(e) => {
                                    const newOptions = options;
                                    newOptions[1] = e.target.value;
                                    setOptions(newOptions);
                                }}
                                required
                            />
                            <Form.Control
                                className="d-none"
                                type="file"
                                ref={optionTwoRef}
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => {
                                    optionFileUploaded(e, 1);
                                }}
                                name="option2"
                                isInvalid={
                                    optionTwoFU === -1 &&
                                    optionTwoRef.current?.files[0]?.size
                                }
                            />
                            <Button
                                variant={
                                    optionTwoFU === 1
                                        ? "outline-success"
                                        : optionTwoFU === 0
                                        ? "outline-secondary"
                                        : "outline-danger"
                                }
                                onClick={() => {
                                    optionTwoRef.current?.click();
                                }}
                            >
                                Upload Image
                            </Button>
                            <InputGroup.Radio
                                name="answer"
                                value="1"
                                required
                                onClick={() => setAnswer(1)}
                            />
                            <Form.Control.Feedback type="invalid">
                                File size should be less than 50kb
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3" sm="6">
                        <InputGroup hasValidation>
                            <InputGroup.Text>C</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Option 3"
                                onChange={(e) => {
                                    const newOptions = options;
                                    newOptions[2] = e.target.value;
                                    setOptions(newOptions);
                                }}
                                required
                            />
                            <Form.Control
                                className="d-none"
                                type="file"
                                ref={optionThreeRef}
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => {
                                    optionFileUploaded(e, 2);
                                }}
                                name="option3"
                                isInvalid={
                                    optionThreeFU === -1 &&
                                    optionThreeRef.current?.files[0]?.size
                                }
                            />
                            <Button
                                variant={
                                    optionThreeFU === 1
                                        ? "outline-success"
                                        : optionThreeFU === 0
                                        ? "outline-secondary"
                                        : "outline-danger"
                                }
                                onClick={() => {
                                    optionThreeRef.current?.click();
                                }}
                            >
                                Upload Image
                            </Button>
                            <InputGroup.Radio
                                name="answer"
                                value="2"
                                onClick={() => setAnswer(2)}
                            />
                            <Form.Control.Feedback type="invalid">
                                File size should be less than 50kb
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    <Col className="mb-3" sm="6">
                        <InputGroup hasValidation>
                            <InputGroup.Text>D</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Option 4"
                                onChange={(e) => {
                                    const newOptions = options;
                                    newOptions[3] = e.target.value;
                                    setOptions(newOptions);
                                }}
                                required
                            />
                            <Form.Control
                                className="d-none"
                                type="file"
                                ref={optionFourRef}
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => {
                                    optionFileUploaded(e, 3);
                                }}
                                name="option4"
                                isInvalid={
                                    optionFourFU === -1 &&
                                    optionFourRef.current?.files[0]?.size
                                }
                            />
                            <Button
                                variant={
                                    optionFourFU === 1
                                        ? "outline-success"
                                        : optionFourFU === 0
                                        ? "outline-secondary"
                                        : "outline-danger"
                                }
                                onClick={() => {
                                    optionFourRef.current?.click();
                                }}
                            >
                                Upload Image
                            </Button>
                            <InputGroup.Radio
                                name="answer"
                                value="3"
                                onClick={() => setAnswer(3)}
                            />
                            <Form.Control.Feedback type="invalid">
                                File size should be less than 50kb
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3">
                        <InputGroup hasValidation>
                            <Form.Control
                                as="textarea"
                                placeholder="Explanation..."
                                onChange={(e) => setExplanation(e.target.value)}
                                required
                            />
                            <Form.Control
                                className="d-none"
                                type="file"
                                ref={explanationRef}
                                accept=".jpg,.jpeg,.png"
                                onChange={explanationFileUploaded}
                                name="explanation"
                                isInvalid={
                                    explanationFU === -1 &&
                                    explanationRef.current?.files[0]?.size
                                }
                            />
                            <Button
                                variant={
                                    explanationFU === 1
                                        ? "outline-success"
                                        : explanationFU === 0
                                        ? "outline-secondary"
                                        : "outline-danger"
                                }
                                id="button-addon1"
                                onClick={() => {
                                    explanationRef.current?.click();
                                }}
                            >
                                Upload Image
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                File size should be less than 50kb
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Save and Next
                </Button>
            </Form>
        </div>
    );
}

export default AddedQuestion;
