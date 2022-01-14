import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Loader({ message }) {
    return (
        <Row
            style={{
                textAlign: "center",
                display: "inline-table",
                height: "95vh",
                width: "100vw",
            }}
        >
            <Col style={{ display: "table-cell", verticalAlign: "middle" }}>
                <h1>{message}</h1>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Col>
        </Row>
    );
}

export default Loader;
