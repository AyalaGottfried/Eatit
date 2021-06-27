import React, { useState, useEffect } from "react";
import { getUserDetailsByIndex } from "./../../../../../service/users";
import ListGroup from "react-bootstrap/ListGroup";
import "./OrderItem.css";
import status1 from "./../../../../../assests/images/order-status/1.png";
import status2 from "./../../../../../assests/images/order-status/2.png";
import status3 from "./../../../../../assests/images/order-status/3.png";
import status4 from "./../../../../../assests/images/order-status/4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function OrderItem(props) {
    const [resturantDetails, setResturantDetails] = useState(null);

    useEffect(async () => {
        let resturant = await getUserDetailsByIndex(
            "resturant",
            props.order.resturantId
        );
        setResturantDetails(resturant);
    }, []);

    return (
        <div className="order-item-container">
            {resturantDetails == null && (
                <div className="loader-account">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
            {resturantDetails != null && (
                <div>
                    <p className="resturant-name-in-order-item">
                        {resturantDetails.name}
                    </p>
                    <p className="date-and-time-order">{props.order.date}</p>
                    <ListGroup
                        variant="flush"
                        className="courses-list-in-order-item-container"
                    >
                        {Object.keys(props.order.order)
                            .filter(
                                (courseId) => props.order.order[courseId] > 0
                            )
                            .map((courseKey) => {
                                let course = resturantDetails.courses.find(
                                    (x) => x.id == courseKey
                                );
                                if (course == null)
                                    return (
                                        <ListGroup.Item>
                                            פריט זה לא קיים יותר
                                        </ListGroup.Item>
                                    );
                                return (
                                    <ListGroup.Item
                                        key={courseKey}
                                        className="courses-list-in-order-item"
                                    >
                                        <div className="course-item-in-order-item-list">
                                            <img
                                                src={course.image}
                                                className="course-image-in-order-item-list"
                                            />
                                            <div className="course-details-in-order-item-list">
                                                <div className="name-and-amount-in-order-item-list">
                                                    <span>{course.name}</span>
                                                    <span className="course-amount-in-order-item-list">
                                                        {props.order.order[
                                                            course.id
                                                        ] + "x"}
                                                    </span>
                                                </div>
                                                <span className="course-price-in-order-item-list">
                                                    {course.price *
                                                        props.order.order[
                                                            course.id
                                                        ] +
                                                        String.fromCharCode(
                                                            0x20aa
                                                        )}
                                                </span>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                    </ListGroup>
                    <div className="order-fee-in-order-item">
                        {props.order.fee + String.fromCharCode(0x20aa)}
                    </div>
                    <div className="order-status-in-order-item">
                        <img
                            className="status-image"
                            src={
                                props.order.status == "ordered"
                                    ? status1
                                    : props.order.status == "packeded"
                                    ? status2
                                    : props.order.status == "sent"
                                    ? status3
                                    : status4
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
