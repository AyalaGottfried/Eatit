export const paypalCheckout = async (amount) => {
    let res = await fetch("http://localhost:4030/paypalCheckout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: amount,
        }),
    });
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
        return err.error;
    }
    return "";
};
