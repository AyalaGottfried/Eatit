export const editUser = async (userType, userId, property, newDetail) => {
    let res = await fetch(
        "http://localhost:4030/" + userType + "s-details/" + userId,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                property: property,
                detail: newDetail,
            }),
        }
    );
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
    }
};

export const getUserIdByEmailAndPassword = async (type, email, password) => {
    const res = await fetch(
        "http://localhost:4030/" +
            type +
            "s-details?email=" +
            email +
            "&password=" +
            password
    );
    const id = await res.json();
    if (!res.ok) console.log(res.status, id.error);
    else return id.id;
};

export const getUserIdByEmail = async (type, email) => {
    const res = await fetch(
        "http://localhost:4030/" + type + "s-details?email=" + email
    );
    const id = await res.json();
    if (!res.ok) console.log(res.status, id.error);
    else return id.id;
};

export const getUserDetailsByIndex = async (type, index) => {
    if (type == null || index == null) return null;
    const res = await fetch(
        "http://localhost:4030/" +
            type +
            "s-details/getOneUser/" +
            String(index)
    );
    const details = await res.json();
    if (!res.ok) console.log(res.status, details.error);
    else return details;
};

export const getUserNameAndImage = async (type, index) => {
    if (type == null || index == null) return null;
    const res = await fetch(
        "http://localhost:4030/" +
            type +
            "s-details/getUserNameAndImage/" +
            String(index)
    );
    const details = await res.json();
    if (!res.ok) console.log(res.status, details.error);
    else return details;
};

export const getAllUsersDetails = async (type) => {
    if (type == null) return null;
    const res = await fetch("http://localhost:4030/" + type + "s-details");
    const details = await res.json();
    if (!res.ok) console.log(res.status, details.error);
    else return details;
};

export const addUser = async (type, userDetails) => {
    let res = await fetch("http://localhost:4030/" + type + "s-details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
    });
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
    } else {
        let id = await res.text();
        return Number(id);
    }
};

export const getAllResturantsFiltersData = async () => {
    const res = await fetch("http://localhost:4030/resturants-details/types");
    const data = await res.json();
    if (!res.ok) console.log(res.status, data.error);
    else return data;
};

export const getAllResturantsView = async () => {
    const res = await fetch("http://localhost:4030/resturants-details/view");
    const data = await res.json();
    if (!res.ok) console.log(res.status, data.error);
    else return data;
};

export const getRecommendedResturants = async () => {
    const res = await fetch(
        "http://localhost:4030/resturants-details/recommendedResturants"
    );
    const data = await res.json();
    if (!res.ok) console.log(res.status, data.error);
    else return data;
};

export const getResturantDetails = async (resId) => {
    const res = await fetch(
        "http://localhost:4030/resturants-details/minDetails/" + String(resId)
    );
    const data = await res.json();
    if (!res.ok) console.log(res.status, data.error);
    else return data;
};
