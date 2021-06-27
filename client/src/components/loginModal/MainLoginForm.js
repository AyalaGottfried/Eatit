import { Login } from "./login/Login";
import React, { useState, useEffect } from "react";
import "./MainLoginForm.css";
import GoogleLogin from "react-google-login";
import Nav from "react-bootstrap/Nav";
import CostumerRegister from "./register/costumerRegister/CostumerRegister";
import ResturantRegister from "./register/resturantRegister/ResturantRegister";

function MainLoginForm(props) {
    const [loginEventKey, setLoginEventKey] = useState("login");

    return (
        <div className="login-container">
            <Nav
                justify
                variant="tabs"
                defaultActiveKey="login"
                onSelect={(eventKey) => setLoginEventKey(eventKey)}
            >
                <Nav.Item>
                    <Nav.Link eventKey="register" className="nav-link-login">
                        {props.type == "costumer"
                            ? "הרשמה כלקוח"
                            : "הרשמה כמסעדה"}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="login" className="nav-link-login">
                        {props.type == "costumer"
                            ? "כניסה כלקוח"
                            : "כניסה כמסעדה"}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="login-form-content">
                {loginEventKey == "login" && (
                    <Login
                        onSuccessLogin={async (id) => {
                            await props.onSuccessLoginFromModal(id, true);
                        }}
                        type={props.type}
                    />
                )}
                {loginEventKey == "register" && props.type == "costumer" && (
                    <CostumerRegister
                        onSuccessLogin={async (id) => {
                            await props.onSuccessLoginFromModal(id, true);
                        }}
                    />
                )}
                {loginEventKey == "register" && props.type == "resturant" && (
                    <ResturantRegister
                        closeModal={props.closeModal}
                        onSuccessLogin={async (id, close) => {
                            await props.onSuccessLoginFromModal(id, close);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default MainLoginForm;
