import React, { useState } from "react";
import "./Login.css";
import FieldInput from "./../fieldInput/FieldInput";
import { getUserIdByEmailAndPassword } from "./../../../service/users";

export function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [IsSubmitted, setIsSubmitted] = useState(false);

    const submit = async () => {
        let matchUser = await getUserIdByEmailAndPassword(
            props.type,
            email,
            password
        );
        if (matchUser == -1) setIsCorrectPassword(false);
        else {
            setIsCorrectPassword(true);
            await props.onSuccessLogin(matchUser);
        }
        setIsSubmitted(true);
    };

    return (
        <>
            <FieldInput
                fieldType="email"
                headerClassName="כתובת מייל"
                onChange={(value) => {
                    setEmail(value);
                    setIsSubmitted(false);
                }}
                type="login"
            />
            <FieldInput
                fieldType="password"
                headerClassName="סיסמא"
                onChange={(value) => {
                    setPassword(value);
                    setIsSubmitted(false);
                }}
                type="login"
            />
            <div className="submit-container">
                <input
                    type="submit"
                    className="submit-field"
                    value="כניסה"
                    onClick={submit}
                />
            </div>

            {IsSubmitted && !isCorrectPassword && (
                <div className="fail-login-message">
                    אחד הפרטים שגויים. נסה שוב
                </div>
            )}
        </>
    );
}
