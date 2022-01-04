import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import AddOwnQuestions from "./AddOwnQuestions/AddOwnQuestions";
import { useSelector } from "react-redux";

function Contest() {
    const history = useHistory();
    const [Public, setPublic] = useState(false);
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("mixed");
    const [numOfQuestion, setNumOfQuestion] = useState(20);
    const [sizeLimit, setSizeLimit] = useState(20);
    const [field, setField] = useState("");
    const [exam, setExam] = useState("");
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [questionType, setQuestionType] = useState("random");
    const [addedQuestions, setAddedQuestions] = useState([]);
    const [validated, setValidated] = useState(false);
    const selectData = {
        Engineering: {
            "GATE CSE": {
                DBMS: ["ER DIAGRAM", "Normalization", "Keys", "Miscellaneous"],
                "Computer Networks": ["ISO OSI model", "Miscellaneous"],
                Mixed: ["Miscellaneous"],
            },
        },
    };
    const [user, setUser] = useState(
        useSelector((state) => state.auth.data.user)
    );

    function handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        let roomCode = "";
        for (let i = 0; i < 4; i++) {
            const offset = Math.floor(Math.random() * 26);
            roomCode += String.fromCharCode(65 + offset);
        }
        axios
            .post("http://localhost:8000/api/v1/rooms/createRoom/", {
                roomCode,
                roomType: "contest",
                sizeLimit,
                numOfQuestion,
                Public,
                creator: user._id,
                subject,
                topic,
                exam,
                field,
                addedQuestions,
                difficulty,
                questionType,
                name,
            })
            .then((data) => {
                history.push(`/Room?roomCode=${roomCode}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="m-3"
        >
            <Row>
                <Col md className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name of Contest"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Please Enter Name..."
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required
                        />
                    </FloatingLabel>
                </Col>
                <Col md className="mb-3">
                    <Form.Group controlId="form-group-id">
                        <FloatingLabel
                            label="Difficulty"
                            controlId="floatingInput"
                        >
                            <Form.Select
                                aria-label="Difficulty select"
                                onChange={(e) => setDifficulty(e.target.value)}
                                value={difficulty}
                                disabled={questionType === "added"}
                            >
                                <option value="mixed">Mixed</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group
                    as={Col}
                    controlId="form-group-id"
                    md
                    className="mb-3"
                >
                    <Form.Label>Size limit: {sizeLimit}</Form.Label>
                    <Form.Range
                        min={20}
                        max={100}
                        onChange={(e) => setSizeLimit(e.target.value)}
                        value={sizeLimit}
                        required
                    />
                </Form.Group>
                <Form.Group
                    as={Col}
                    controlId="form-group-id"
                    md
                    className="mb-3"
                >
                    <Form.Label>
                        Number of Questions: {numOfQuestion}
                    </Form.Label>
                    <Form.Range
                        min={20}
                        max={50}
                        onChange={(e) => setNumOfQuestion(e.target.value)}
                        value={numOfQuestion}
                        required
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group
                    as={Col}
                    controlId="form-group-id"
                    md={3}
                    sm={6}
                    className="mb-3"
                >
                    <Form.Label>Choose Field Of interest</Form.Label>
                    <Form.Select
                        aria-label="Field select"
                        onChange={(e) => {
                            setField(e.target.value);
                            setExam("");
                            setSubject("");
                            setTopic("");
                        }}
                        value={field}
                        required
                    >
                        <option value="">Please Select...</option>
                        {Object.keys(selectData).map((item) => {
                            return <option value={item}>{item}</option>;
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    as={Col}
                    controlId="form-group-id"
                    md={3}
                    sm={6}
                    className="mb-3"
                >
                    <Form.Label>Choose Exam:</Form.Label>
                    <Form.Select
                        aria-label="Exam select"
                        onChange={(e) => {
                            setExam(e.target.value);
                            setSubject("");
                            setTopic("");
                        }}
                        disabled={field === ""}
                        value={exam}
                        required
                    >
                        <option value="">Please Select...</option>
                        {field !== ""
                            ? Object.keys(selectData[field]).map((item) => {
                                  return <option value={item}>{item}</option>;
                              })
                            : null}
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    as={Col}
                    controlId="form-group-id"
                    md={3}
                    sm={6}
                    className="mb-3"
                >
                    <Form.Label>Choose Subject:</Form.Label>
                    <Form.Select
                        aria-label="Subject select"
                        onChange={(e) => {
                            setSubject(e.target.value);
                            setTopic("");
                        }}
                        disabled={exam === "" || field === ""}
                        value={subject}
                        required
                    >
                        <option value="">Please Select...</option>
                        {exam !== "" && field !== ""
                            ? Object.keys(selectData[field][exam]).map(
                                  (item) => {
                                      return (
                                          <option value={item}>{item}</option>
                                      );
                                  }
                              )
                            : null}
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    as={Col}
                    controlId="form-group-id"
                    md={3}
                    sm={6}
                    className="mb-3"
                >
                    <Form.Label>Choose Topic:</Form.Label>
                    <Form.Select
                        aria-label="Topic select"
                        onChange={(e) => setTopic(e.target.value)}
                        disabled={subject === "" || exam === "" || field === ""}
                        value={topic}
                        required
                    >
                        <option value="">Please Select...</option>
                        {subject !== "" && exam !== "" && field !== ""
                            ? selectData[field][exam][subject].map((item) => {
                                  return <option value={item}>{item}</option>;
                              })
                            : null}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Col md>
                    <Form.Group controlId="form-group-id">
                        <Form.Check
                            type="switch"
                            onChange={(e) => {
                                setDifficulty("mixed");
                                if (e.target.checked) {
                                    setQuestionType("added");
                                } else {
                                    setQuestionType("random");
                                }
                            }}
                            value={!Public}
                            label="Want to Add Your Own Questions?"
                        />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group controlId="form-group-id">
                        <Form.Check
                            type="switch"
                            onChange={(e) => setPublic(!e.target.checked)}
                            value={!Public}
                            label="Private Contest"
                        />
                    </Form.Group>
                </Col>
            </Row>
            {questionType === "added" ? (
                <Row className="mb-3">
                    <AddOwnQuestions setAddedQuestions={setAddedQuestions} />
                </Row>
            ) : null}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Contest;
