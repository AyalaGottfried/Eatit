import React, { useState, useCallback, useEffect } from "react";
import FieldInput from "./../../fieldInput/FieldInput";
import { addUser, getUserIdByEmail } from "./../../../../service/users";

function CostumerRegister(props) {
    const [isTheDataValid, setIsTheDataValid] = useState({
        email: false,
        name: false,
        password: false,
        confirmPassword: false,
    });
    const [isValidSubmit, setIsValidSubmit] = useState("לא כל השדות תקינים");
    const [submitted, setSubmitted] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: "",
        name: "",
        image: null,
        password: "",
        confirmPassword: "",
    });

    const isValidData = useCallback((fieldName, isValid) => {
        //updates the valid data object
        let newIsTheDataValid = {
            ...isTheDataValid,
            [fieldName]: isValid,
        };
        setIsTheDataValid(newIsTheDataValid);
        setSubmitted(false);
    });

    const submitForm = async (e) => {
        e.preventDefault();
        if (
            !isTheDataValid.name ||
            !isTheDataValid.email ||
            !isTheDataValid.password ||
            !isTheDataValid.confirmPassword
        ) {
            setSubmitted(true);
            setIsValidSubmit("לא כל השדות תקינים");
        } else {
            //checks if it is unique email address
            let equalUser = await getUserIdByEmail(
                "costumer",
                userDetails.email
            );
            if (equalUser != -1) {
                setSubmitted(true);
                setIsValidSubmit("כתובת מייל קיימת כבר במערכת");
            } else {
                setSubmitted(true);
                setIsValidSubmit("");
            }
        }
    };

    useEffect(async () => {
        if (isValidSubmit == "") {
            let id = await addUser("costumer", {
                email: userDetails.email,
                password: userDetails.password,
                name: userDetails.name,
                image: userDetails.image,
                cart: {},
            });
            await props.onSuccessLogin(id);
        }
    }, [isValidSubmit]);

    return (
        <div className="main-form">
            <div className="form-container">
                <form onSubmit={submitForm}>
                    <FieldInput
                        inputFieldName="name"
                        fieldType="text"
                        headerClassName={"שם משתמש"}
                        onChange={(value, isValid) => {
                            isValidData("name", isValid);
                            setUserDetails({
                                ...userDetails,
                                name: value,
                            });
                        }}
                        type="register"
                    />
                    <FieldInput
                        inputFieldName="email"
                        fieldType="email"
                        headerClassName="כתובת אימייל"
                        onChange={(value, isValid) => {
                            isValidData("email", isValid);
                            setUserDetails({
                                ...userDetails,
                                email: value,
                            });
                        }}
                        type="register"
                    />
                    <FieldInput
                        inputFieldName="password"
                        fieldType="password"
                        headerClassName="סיסמא"
                        isEqualPasswords={
                            userDetails.password == userDetails.confirmPassword
                        }
                        onChange={(value, isValid) => {
                            isValidData("password", isValid);
                            setUserDetails({
                                ...userDetails,
                                password: value,
                            });
                        }}
                        type="register"
                    />
                    <FieldInput
                        inputFieldName="confirmPassword"
                        fieldType="password"
                        headerClassName="אישור סיסמא"
                        secondPassword={userDetails.password}
                        onChange={(value, isValid) => {
                            isValidData("confirmPassword", isValid);
                            setUserDetails({
                                ...userDetails,
                                confirmPassword: value,
                            });
                        }}
                        type="register"
                    />
                    <div className="left-align">
                        <input
                            type="submit"
                            className="submit-field"
                            value="הרשמה"
                        />
                    </div>
                </form>
                {submitted && <p className="submitted">{isValidSubmit}</p>}
            </div>
        </div>
    );
}

export default CostumerRegister;
