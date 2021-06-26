export const sendEmail = async (address, subject, text) => {
    let res = await fetch("http://localhost:4030/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: address,
            subject: subject,
            text: text,
        }),
    });
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
        return err.error;
    }
    return "";
};
