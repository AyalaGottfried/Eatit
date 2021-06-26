import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function ResturantAccountNav(props) {
    return (
        <Nav activeKey={props.path} fill="true" justify="true" variant="tabs">
            <Nav.Item>
                <Nav.Link
                    eventKey="orders"
                    to="/costumer-account/orders"
                    as={Link}
                >
                    הזמנות
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    eventKey="details"
                    to="/costumer-account/details"
                    as={Link}
                >
                    פרטי לקוח
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default ResturantAccountNav;
