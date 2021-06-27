import React from "react";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";

function ResturantAccountNav(props) {
    let history = useHistory();
    return (
        <Nav
            activeKey={props.path}
            onSelect={(selectedKey) => {
                history.push("/resturant-account/" + selectedKey);
            }}
            fill="true"
            justify="true"
            variant="tabs"
        >
            <Nav.Item>
                <Nav.Link
                    eventKey="management"
                    to="/resturant-account/management"
                >
                    ניהול
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="details" to="/resturant-account/details">
                    פרטי מסעדה
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="courses" to="/resturant-account/courses">
                    מנות
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default ResturantAccountNav;
