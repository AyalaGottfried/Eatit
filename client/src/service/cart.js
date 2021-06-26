import { editUser } from "./users";

export const editCart = async (userId, cartData) => {
    editUser("costumer", userId, "cart", cartData);
};

export const getCart = async (userId) => {
    const res = await fetch(
        "http://localhost:4030/costumers-details/getCart/" + String(userId)
    );
    const details = await res.json();
    if (!res.ok) console.log(res.status, details.error);
    else return details;
};
