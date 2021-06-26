import { editUser } from "./users";

export const addOrder = async (order, rating) => {
    let res = await fetch("http://localhost:4030/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
    }
    await editUser("resturant", order.resturantId, "rating", rating);
};

export const editOrderStatus = async (orderId, newStatus) => {
    let res = await fetch("http://localhost:4030/orders/" + orderId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
    }
};

export const getResturantsOrders = async (resturantId) => {
    let res = await fetch(
        "http://localhost:4030/orders?resturantId=" + resturantId
    );
    let orders = await res.json();
    if (!res.ok) console.log(res.status, orders.error);
    else return orders;
};

export const getCostumersOrders = async (costumerId) => {
    let res = await fetch(
        "http://localhost:4030/orders?costumerId=" + costumerId
    );
    let orders = await res.json();
    if (!res.ok) console.log(res.status, orders.error);
    else return orders;
};
