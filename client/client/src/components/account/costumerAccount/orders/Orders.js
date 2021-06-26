import OrderItem from "./orderItem/OrderItem";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./Orders.css";
import { getCostumersOrders } from "../../../../service/orders";

function Orders(props) {
    const [orders, setOrders] = useState();

    useEffect(async () => {
        let res = await getCostumersOrders(props.userIndex);
        setOrders(res.reverse());
    }, []);

    return (
        <div className="orders-group-list-container">
            <ListGroup variant="flush" className="orders-group-list">
                {orders != null && orders.length == 0 && (
                    <p className="no-orders-title">
                        עדיין לא ביצעת הזמנות במערכת
                    </p>
                )}
                {orders != null &&
                    orders.map((order) => (
                        <ListGroup.Item
                            key={order.orderId}
                            className="order-list-item"
                        >
                            <OrderItem order={order} />
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
}

export default Orders;
