import { OrderCourses } from "./orderCourses/OrderCourses";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./OrdersOfStatus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

export function OrdersOfStatus(props) {
    const [showCourses, setShowCourses] = useState({});

    const changeShowCourses = (orderId) => {
        setShowCourses({ ...showCourses, [orderId]: !showCourses[orderId] });
    };

    useEffect(() => {
        if (props.orders != null) {
            let newArrayShow = {};
            //inits the show courses object
            props.orders.map((item) => {
                newArrayShow[item.orderId] = false;
            });
            setShowCourses(newArrayShow);
        }
    }, [props.orders]);

    function getAllOrderDetailes(id) {
        let detailes = props.courses.find((item) => id == item.id);
        return detailes;
    }

    return (
        <div className="orders-of-status-container">
            <div className="orders-of-status-header">
                {props.status.statusToWrite}
            </div>
            {props.orders.filter((order) => {
                return order.status === props.status.status;
            }).length == 0 && (
                <p className="no-orders-in-this-status-message">
                    {"אין לך " + props.status.statusToWrite}
                </p>
            )}
            <ListGroup className="orders-of-status-group-list-container">
                {props.orders
                    .filter((order) => {
                        return order.status === props.status.status;
                    })
                    .map((order, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <div className="resturant-order-details-container">
                                    <FontAwesomeIcon
                                        icon={
                                            showCourses[order.orderId]
                                                ? faCaretDown
                                                : faCaretLeft
                                        }
                                        className="resturant-order-open-courses"
                                        onClick={() =>
                                            changeShowCourses(order.orderId)
                                        }
                                    />
                                    <p className="resturant-order-date">
                                        {order.date}
                                    </p>
                                    <p className="resturant-order-name">
                                        {order.address.name}
                                    </p>
                                    <p className="resturant-order-address">
                                        {order.address.address}
                                    </p>
                                    <p className="resturant-order-phone">
                                        {order.address.phone}
                                    </p>
                                    <p className="resturant-order-fee">
                                        {order.fee +
                                            String.fromCharCode(0x20aa)}
                                    </p>
                                    <p className="resturant-order-type">
                                        {order.type == "cash"
                                            ? "מזומן"
                                            : "אשראי"}
                                    </p>
                                    {props.status.status != "finished" && (
                                        <img
                                            className="change-status-button"
                                            src={props.status.imageToDisplay}
                                            onClick={
                                                props.status != "finished"
                                                    ? () =>
                                                          props.onChangeStatus(
                                                              order.orderId
                                                          )
                                                    : null
                                            }
                                        />
                                    )}
                                    {props.status.status == "finished" && (
                                        <img
                                            className="change-status-done"
                                            src={props.status.imageToDisplay}
                                        />
                                    )}
                                    {showCourses[order.orderId] && (
                                        <ListGroup className="resterunt-order-courses">
                                            {Object.keys(order.order).map(
                                                (item, index) => {
                                                    let coursesDetails = getAllOrderDetailes(
                                                        item
                                                    );
                                                    return (
                                                        <OrderCourses
                                                            coursesDetails={
                                                                coursesDetails
                                                            }
                                                            order={order.order}
                                                            item={item}
                                                            key={index}
                                                        />
                                                    );
                                                }
                                            )}
                                        </ListGroup>
                                    )}
                                </div>
                            </ListGroup.Item>
                        );
                    })}
            </ListGroup>
        </div>
    );
}
