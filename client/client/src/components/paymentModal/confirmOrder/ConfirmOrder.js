import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ViewCourse from "../../viewCourse/ViewCourse";
import "./ConfirmOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export function ConfirmOrder(props) {
    return (
        <div className="confirm-order-container">
            <div className="payment-stage">1</div>
            <span className="payment-stage-title">אישור הזמנה</span>
            {props.resturantDetails == null && (
                <div className="loader-payment">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
            {props.resturantDetails != null && (
                <ListGroup variant="flush">
                    {Object.keys(props.order)
                        .filter((courseId) => props.order[courseId] > 0)
                        .map((courseKey) => {
                            let course = props.resturantDetails.courses.find(
                                (x) => x.id == courseKey
                            );
                            if (course == undefined) {
                                let cart = JSON.parse(localStorage.cart);
                                delete cart[props.resturantDetails.id][
                                    courseKey
                                ];
                                localStorage.cart = JSON.stringify(cart);
                                return;
                            }
                            return (
                                <ViewCourse
                                    courseDetails={course}
                                    order={props.order}
                                    key={courseKey}
                                    increase={props.increase}
                                    decrease={props.decrease}
                                    from="payment"
                                />
                            );
                        })}
                </ListGroup>
            )}
            <div className="confirm-order-footer">
                <div className="sum-of-order-in-payment-list">
                    {"עלות הזמנה: " +
                        props.sumOfOrder +
                        String.fromCharCode(0x20aa)}
                </div>
                <button
                    className="confirm-order-button"
                    onClick={props.onConfirm}
                >
                    אישור
                </button>
            </div>
        </div>
    );
}

export default ConfirmOrder;
