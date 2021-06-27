import React, { useEffect, useState } from "react";
import "./Detail.css";
import {
    nameValidation,
    EmailAddressValidation,
    resturantAddressValidation,
    shippingCostValidation,
    typeValidation,
    phoneNumberValidation,
} from "./../../../shared/validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

function Detail(props) {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [value, setValue] = useState(props.content);
    const [error, setError] = useState("");

    useEffect(() => {
        setValue(props.content);
    }, [props.content]);

    const changeValue = (e) => {
        setValue(e.target.value);
        let errorOnValue;
        //validates the user input
        switch (props.property) {
            case "name":
                errorOnValue = nameValidation(e.target.value);
                break;

            case "address":
                errorOnValue = resturantAddressValidation(e.target.value);
                break;

            case "type":
                errorOnValue = typeValidation(e.target.value);
                break;

            case "shippingCost":
                errorOnValue = shippingCostValidation(e.target.value);
                break;

            case "email":
                errorOnValue = EmailAddressValidation(e.target.value);
                break;

            case "phone":
                errorOnValue = phoneNumberValidation(e.target.value);
                break;
            default:
                return;
        }
        setError(errorOnValue);
    };

    const confirmChangeValue = () => {
        if (error == "") {
            //sends the changed value to the parent
            props.onUpdateDetail(value);
            setIsInEditMode(false);
        }
    };

    return (
        <div className="detail-container">
            {!isInEditMode && (
                <div className="not-edit-input-container">
                    <span className={"detail-content " + props.addedClass}>
                        {value}
                    </span>
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="detail-icon"
                        onClick={() => setIsInEditMode(true)}
                    />
                </div>
            )}
            {isInEditMode && (
                <div>
                    <div className="edit-detail-input-container">
                        <input
                            type={props.inputType}
                            value={value}
                            onChange={changeValue}
                            className={"edit-detail-input " + props.addedClass}
                            autoFocus
                        />
                        <FontAwesomeIcon
                            icon={faCheckSquare}
                            className="detail-icon"
                            onClick={confirmChangeValue}
                            size="1x"
                        />
                    </div>
                    {error != "" && (
                        <p className="edit-detail-error">{error}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Detail;
