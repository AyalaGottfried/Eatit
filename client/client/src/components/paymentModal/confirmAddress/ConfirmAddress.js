import React, { useState } from "react";
import FieldInput from "../../loginModal/fieldInput/FieldInput";
import "./ConfirmAddress.css";

function ConfirmAddress(props) {
    const [address, setAddress] = useState({
        name: "",
        address: "",
        phone: "",
    });
    const [isDataValid, setIsDataValid] = useState({
        name: false,
        phone: false,
        address: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onChangeForm = (fieldName, value, isValid) => {
        setAddress({ ...address, [fieldName]: value });
        setIsDataValid({ ...isDataValid, [fieldName]: isValid });
        setIsSubmitted(false);
    };

    const submit = () => {
        setIsSubmitted(true);
        if (isDataValid.name && isDataValid.phone && isDataValid.address)
            props.onConfirm(address);
    };

    return (
        <div className="confirm-address-container">
            <div className="payment-stage">2</div>
            <span className="payment-stage-title">פרטי משלוח</span>
            <form className="address-form">
                <FieldInput
                    inputFieldName="name"
                    fieldType="text"
                    headerClassName="שם מלא"
                    onChange={(value, isValid) => {
                        onChangeForm("name", value, isValid);
                    }}
                />
                <FieldInput
                    inputFieldName="phone"
                    fieldType="tel"
                    headerClassName="מספר טלפון"
                    onChange={(value, isValid) => {
                        onChangeForm("phone", value, isValid);
                    }}
                />
                <FieldInput
                    inputFieldName="address"
                    fieldType="text"
                    headerClassName="כתובת"
                    onChange={(value, isValid) => {
                        onChangeForm("address", value, isValid);
                    }}
                />
            </form>
            <div className="confirm-address-footer">
                <span>
                    {isSubmitted &&
                    !(
                        isDataValid.name &&
                        isDataValid.phone &&
                        isDataValid.address
                    )
                        ? "לא כל השדות תקינים"
                        : ""}
                </span>
                <button className="confirm-address-button" onClick={submit}>
                    אישור
                </button>
            </div>
        </div>
    );
}

export default ConfirmAddress;
