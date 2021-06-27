import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./OrderCourses.css";

export function OrderCourses(props) {
    return (
        <ListGroup.Item className="course-list-in-resturant-order">
            <div className="course-list-in-resturant-order-container">
                <img
                    src={props.coursesDetails.image}
                    className="course-image-in-resturant-order-list"
                />
                <div className="course-details-in-resturant-order-list">
                    <div className="name-and-amount-in-resturant-order-list">
                        <span>{props.coursesDetails.name}</span>
                        <span className="course-amount-in-resturant-order-list">
                            {props.order[props.item] + "x"}
                        </span>
                    </div>
                    <span className="course-price-in-resturant-order-list">
                        {props.coursesDetails.price * props.order[props.item] +
                            String.fromCharCode(0x20aa)}
                    </span>
                </div>
            </div>
        </ListGroup.Item>
    );
}
