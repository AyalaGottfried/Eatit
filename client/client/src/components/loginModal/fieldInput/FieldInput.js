import React, { useEffect, useState, useCallback } from "react";
import {
    nameValidation,
    EmailAddressValidation,
    passwordPowerAndValidation,
    confirmPasswordValidation,
    resturantAddressValidation,
    shippingCostValidation,
    typeValidation,
    phoneNumberValidation,
    accountNumberValidation,
    streetNumberValidation,
} from "./../../../shared/validations";
import "./FieldInput.css";

function FieldInput(props) {
    const [errorMessage, setErrorMessage] = useState("שדה נדרש");
    const [colorOfErrorMessage, setColorOfErrorMessage] = useState("red");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        //checks if the passwords are equal
        if (
            props.secondPassword != confirmPassword &&
            props.inputFieldName == "confirmPassword"
        )
            setErrorMessage("סיסמאות לא זהות");
        else if (props.inputFieldName == "confirmPassword")
            setErrorMessage(confirmPassword == "" ? "שדה נדרש" : "");
        props.onChange(
            confirmPassword,

            !(
                props.secondPassword != confirmPassword &&
                props.inputFieldName == "confirmPassword"
            )
        );
    }, [props.secondPassword]);

    const checkInput = useCallback((e) => {
        let errorMessageField,
            colorOfMessage = "red";
        if (props.type == "login") {
            props.onChange(e.target.value);
            return;
        }
        //validates the user input
        switch (props.inputFieldName) {
            case "name":
                errorMessageField = nameValidation(e.target.value);
                break;

            case "address":
                errorMessageField = resturantAddressValidation(e.target.value);
                break;

            case "street":
                errorMessageField = resturantAddressValidation(e.target.value);
                break;

            case "type":
                errorMessageField = typeValidation(e.target.value);
                break;

            case "shippingCost":
                errorMessageField = shippingCostValidation(e.target.value);
                break;

            case "email":
                errorMessageField = EmailAddressValidation(e.target.value);
                break;

            case "phone":
                errorMessageField = phoneNumberValidation(e.target.value);
                break;

            case "password":
                let messageAndColor = passwordPowerAndValidation(
                    e.target.value
                );
                errorMessageField = messageAndColor.message;
                colorOfMessage = messageAndColor.color;
                break;

            case "confirmPassword":
                errorMessageField = confirmPasswordValidation(e.target.value);
                setConfirmPassword(e.target.value);
                if (
                    props.secondPassword != e.target.value &&
                    props.inputFieldName == "confirmPassword"
                )
                    errorMessageField = "סיסמאות לא זהות";
                break;

            case "accountNumber":
                errorMessageField = accountNumberValidation(e.target.value);
                break;

            case "number":
                errorMessageField = streetNumberValidation(e.target.value);
                break;

            default:
                return;
        }

        setErrorMessage(errorMessageField);
        setColorOfErrorMessage(colorOfMessage);
        if (props.inputFieldName != "password")
            props.onChange(e.target.value, errorMessageField == "");
        else props.onChange(e.target.value, colorOfMessage != "red");
    });

    return (
        <div className="full-field" id={props.inputFieldName + "-container"}>
            {props.inputFieldName == "confirmPassword" && (
                <input
                    id={props.inputFieldName}
                    type={props.fieldType}
                    className="input-field"
                    placeholder={props.headerClassName}
                    onChange={checkInput}
                    value={confirmPassword}
                />
            )}
            {props.inputFieldName != "confirmPassword" && (
                <input
                    id={props.inputFieldName}
                    type={props.fieldType}
                    className="input-field"
                    placeholder={props.headerClassName}
                    onChange={checkInput}
                />
            )}
            {props.type != "login" && (
                <p
                    className="error-message"
                    id={colorOfErrorMessage + "-field"}
                >
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default FieldInput;
