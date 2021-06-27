import { OrdersOfStatus } from "./ordersOfStatus/OrdersOfStatus";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./Management.css";
import ordered_change from "./../../../../assests/images/order-status/box_active.png";
import packeded_change from "./../../../../assests/images/order-status/truck_active.png";
import sent_change from "./../../../../assests/images/order-status/home_active.png";
import done from "./../../../../assests/images/order-status/done.png";
import {
    editOrderStatus,
    getResturantsOrders,
} from "../../../../service/orders";

function Management(props) {
    const [orders, setOrders] = useState();

    useEffect(async () => {
        let res = await getResturantsOrders(props.userIndex);
        setOrders(res);
    }, []);

    const statuses = [
        {
            status: "ordered",
            statusToWrite: "הזמנות חדשות",
            imageToDisplay: ordered_change,
            nextStatus: "packeded",
        },
        {
            status: "packeded",
            statusToWrite: "הזמנות בטיפול",
            imageToDisplay: packeded_change,
            nextStatus: "sent",
        },
        {
            status: "sent",
            statusToWrite: "הזמנות שנשלחו",
            imageToDisplay: sent_change,
            nextStatus: "finished",
        },
        {
            status: "finished",
            statusToWrite: "הזמנות סגורות",
            imageToDisplay: done,
        },
    ];

    const changeOrderStatus = (orderId, newStatus) => {
        let newOrders = orders.slice();
        newOrders.find((order) => order.orderId == orderId).status = newStatus;
        setOrders(newOrders);
        editOrderStatus(orderId, newStatus);
    };

    return (
        <div className="management-page-container">
            {orders != null && (
                <ListGroup className="resturant-orders-group-list-container">
                    <div className="list-container-resturant-orders">
                        {statuses.map((status, index) => {
                            return (
                                <OrdersOfStatus
                                    orders={orders}
                                    status={status}
                                    courses={props.courses}
                                    onChangeStatus={(orderId) =>
                                        changeOrderStatus(
                                            orderId,
                                            status.nextStatus
                                        )
                                    }
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </ListGroup>
            )}
        </div>
    );
}

export default Management;
