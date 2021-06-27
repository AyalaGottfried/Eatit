import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import FieldInput from "../../../fieldInput/FieldInput";
import { banks, branches } from "./../fieldsArrays";

export function ResturantRegisterStage3(props) {
    return (
        <div>
            <Autocomplete
                id="combo-box-demo1"
                className="material-auto-complete-input-field"
                getOptionLabel={(bank) => bank.text}
                options={banks}
                renderInput={(params) => (
                    <TextField {...params} placeholder="בנק" />
                )}
                onChange={(e, value) => {
                    props.isValidData("bank", value != null);
                    if (value == null)
                        props.setUserDetails({
                            ...props.userDetails,
                            bankAccount: {
                                ...props.userDetails.bankAccount,
                                bank: value,
                                branch: null,
                            },
                        });
                    else
                        props.setUserDetails({
                            ...props.userDetails,
                            bankAccount: {
                                ...props.userDetails.bankAccount,
                                bank: value,
                            },
                        });
                }}
            />
            {props.userDetails.bankAccount.bank != null && (
                <Autocomplete
                    id="combo-box-demo1"
                    className="material-auto-complete-input-field"
                    options={branches[props.userDetails.bankAccount.bank.id]}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="סניף" />
                    )}
                    onChange={(e, value) => {
                        props.isValidData("branch", value != null);
                        props.setUserDetails({
                            ...props.userDetails,
                            bankAccount: {
                                ...props.userDetails.bankAccount,
                                branch: value,
                            },
                        });
                    }}
                />
            )}
            {props.userDetails.bankAccount.branch != null && (
                <div>
                    <FieldInput
                        inputFieldName="accountNumber"
                        fieldType="text"
                        headerClassName="מספר חשבון"
                        onChange={(value, isValid) => {
                            props.isValidData("accountNumber", isValid);
                            props.setUserDetails({
                                ...props.userDetails,
                                bankAccount: {
                                    ...props.userDetails.bankAccount,
                                    accountNumber: value,
                                },
                            });
                        }}
                        type="register"
                    />
                    <FieldInput
                        inputFieldName="name"
                        fieldType="text"
                        headerClassName="שם בעל החשבון"
                        onChange={(value, isValid) => {
                            props.isValidData("accountOwner", isValid);
                            props.setUserDetails({
                                ...props.userDetails,
                                bankAccount: {
                                    ...props.userDetails.bankAccount,
                                    accountOwner: value,
                                },
                            });
                        }}
                        type="register"
                    />
                </div>
            )}

            <button
                onClick={(e) => {
                    props.submitForm(e, 2);
                }}
                className="submit-field"
            >
                צור מסעדה
            </button>
            {props.submitted && (
                <p className="submitted-error">{props.isValidSubmit}</p>
            )}
        </div>
    );
}
