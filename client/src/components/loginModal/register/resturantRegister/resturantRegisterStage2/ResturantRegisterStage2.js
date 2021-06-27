import React from "react";
import { cities } from "./../fieldsArrays";
import FieldInput from "../../../fieldInput/FieldInput";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

export function ResturantRegisterStage2(props) {
    return (
        <div className="stage-resturant-register-container">
            <FieldInput
                inputFieldName="name"
                fieldType="text"
                headerClassName={
                    props.type == "costumer" ? "שם משתמש" : "שם מסעדה"
                }
                onChange={(value, isValid) => {
                    props.isValidData("name", isValid);
                    props.setUserDetails({ ...props.userDetails, name: value });
                }}
                type="register"
            />
            <div className="vertical-align">
                <div className="image-resturant-logo-container">
                    {props.userDetails.image != null && (
                        <div className="resturant-image-form">
                            <img src={props.userDetails.image} />
                        </div>
                    )}
                    {props.userDetails.image == null && (
                        <div className="resturant-image-form empty-image"></div>
                    )}
                    <label className="upload-new-resturant-image-button ">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);

                                reader.onload = () => {
                                    props.isValidData("image", true);
                                    props.setUserDetails({
                                        ...props.userDetails,
                                        image: reader.result,
                                    });
                                };
                            }}
                        />
                        {props.userDetails.image != null
                            ? "העלה לוגו חדש"
                            : "העלה לוגו מסעדה"}
                    </label>
                </div>
                <div className="type-shippingCost-phone-container">
                    <FieldInput
                        inputFieldName="type"
                        fieldType="text"
                        headerClassName="סוג מסעדה"
                        onChange={(value, isValid) => {
                            props.isValidData("type", isValid);
                            props.setUserDetails({
                                ...props.userDetails,
                                type: value,
                            });
                        }}
                        type="register"
                    />
                    <FieldInput
                        inputFieldName="shippingCost"
                        fieldType="number"
                        headerClassName="עלות משלוח"
                        onChange={(value, isValid) => {
                            props.isValidData("shippingCost", isValid);
                            props.setUserDetails({
                                ...props.userDetails,
                                shippingCost: Number(value),
                            });
                        }}
                        type="register"
                    />
                    <FieldInput
                        inputFieldName="phone"
                        fieldType="text"
                        headerClassName="מספר טלפון"
                        onChange={(value, isValid) => {
                            props.isValidData("phone", isValid);
                            props.setUserDetails({
                                ...props.userDetails,
                                phone: value,
                            });
                        }}
                        type="register"
                    />
                </div>
            </div>
            <FieldInput
                inputFieldName="street"
                fieldType="text"
                headerClassName="רחוב"
                onChange={(value, isValid) => {
                    props.isValidData("street", isValid);
                    props.setUserDetails({
                        ...props.userDetails,
                        location: {
                            ...props.userDetails.location,
                            street: value,
                        },
                    });
                }}
                type="register"
            />
            <FieldInput
                inputFieldName="number"
                fieldType="number"
                headerClassName="מספר בית"
                onChange={(value, isValid) => {
                    props.isValidData("number", isValid);
                    props.setUserDetails({
                        ...props.userDetails,
                        location: {
                            ...props.userDetails.location,
                            number: value,
                        },
                    });
                }}
                type="register"
            />
            <Autocomplete
                id="auto-complete-city"
                className="material-auto-complete-input-field auto-complete-city"
                options={cities}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="עיר"
                        id="address-container"
                    />
                )}
                onChange={(e, value) => {
                    props.isValidData("city", value != null);
                    props.setUserDetails({
                        ...props.userDetails,
                        location: {
                            ...props.userDetails.location,
                            city: value,
                        },
                    });
                }}
            />
            <button
                onClick={(e) => {
                    props.submitForm(e, 1);
                }}
                className="submit-field"
            >
                המשך
            </button>
            {props.submitted && (
                <p className="submitted-error">{props.isValidSubmit}</p>
            )}
        </div>
    );
}
