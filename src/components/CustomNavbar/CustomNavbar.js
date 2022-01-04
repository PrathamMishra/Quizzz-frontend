import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authAction";

function CustomNavbar() {
    const dispatch = useDispatch();
    function handleLogOut() {
        dispatch(logOut());
    }
    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Navbar.Brand href="/">
                <img
                    src="/Bronze.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Brand Name logo"
                />
                Qurious
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-collapse-id" />
            <Navbar.Collapse
                id="navbar-collapse-id"
                className="justify-content-end"
            >
                <Button variant="primary" onClick={handleLogOut}>
                    logout
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
