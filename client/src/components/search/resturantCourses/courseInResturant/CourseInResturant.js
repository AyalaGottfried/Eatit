import React, { useState, useEffect } from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CourseInResturant.css";
import ListGroup from "react-bootstrap/ListGroup";

function CourseInResturant(props) {
    const initAmount = () => {
        let cart = JSON.parse(localStorage.cart);
        if (!(props.resturantId in cart)) return 0;
        if (!(props.course.id in cart[props.resturantId])) return 0;
        return cart[props.resturantId][props.course.id];
    };

    const [amount, setAmount] = useState(initAmount());
    const [isPlusButtonDisplay, setIsPlusButtonDisplay] = useState(amount == 0);

    const addCourseToCart = () => {
        props.onAddToCart(amount + 1);
        setAmount(amount + 1);
        setIsPlusButtonDisplay(false);
    };

    const removeCourseFromCart = () => {
        setIsPlusButtonDisplay(amount == 1);
        props.onAddToCart(amount - 1);
        setAmount(amount - 1);
    };

    useEffect(() => {
        //updates the course amount from cart
        let newAmount;
        let cart = JSON.parse(localStorage.cart);
        if (!(props.resturantId in cart)) newAmount = 0;
        else if (!(props.course.id in cart[props.resturantId])) newAmount = 0;
        else
            newAmount = JSON.parse(localStorage.cart)[props.resturantId][
                props.course.id
            ];
        setAmount(newAmount);
        if (newAmount == 0) setIsPlusButtonDisplay(true);
    }, [props.update]);

    return (
        <ListGroup.Item className="course-in-resturant-list-item">
            <div className="add-button-and-details-div">
                <div className="amount-div">
                    {isPlusButtonDisplay && (
                        <button
                            className="add-course-to-cart-button"
                            onClick={addCourseToCart}
                        >
                            +
                        </button>
                    )}
                    {!isPlusButtonDisplay && (
                        <div className="amount-manage-in-course-in-resturant">
                            <FontAwesomeIcon
                                icon={faCaretUp}
                                className="up-arrow-icon-in-course-in-resturant"
                                onClick={addCourseToCart}
                                size="lg"
                            />
                            <p className="item-amount-in-course-in-resturant">
                                {amount}
                            </p>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className="up-arrow-icon-in-course-in-resturant"
                                onClick={removeCourseFromCart}
                                size="lg"
                            />
                        </div>
                    )}
                </div>
                <div className="course-details-in-list-item">
                    <p className="course-card-name">{props.course.name}</p>
                    <p className="course-card-cost">
                        {props.course.price + String.fromCharCode(0x20aa)}
                    </p>
                </div>
            </div>
            <img src={props.course.image} className="course-card-image" />
        </ListGroup.Item>
    );
}

export default CourseInResturant;
