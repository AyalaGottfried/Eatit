import { ResturantRegisterStage4 } from "./resturantRegisterStage4/ResturantRegisterStage4";
import { ResturantRegisterStage3 } from "./resturantRegisterStage3/ResturantRegisterStage3";
import { ResturantRegisterStage2 } from "./resturantRegisterStage2/ResturantRegisterStage2";
import { ResturantRegisterStage1 } from "./resturantRegisterStage1/ResturantRegisterStage1";
import React, { useState, useCallback } from "react";
import { addUser, getUserIdByEmail } from "../../../../service/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import "./ResturantRegister.css";

function ResturantRegister(props) {
    const [registerStage, setRegisterStage] = useState(1);
    const [isTheDataValid, setIsTheDataValid] = useState({
        email: false,
        phone: false,
        name: false,
        image: false,
        location: {
            street: false,
            number: false,
            city: false,
        },
        type: false,
        shippingCost: false,
        bankAccount: {
            bank: false,
            branch: false,
            accountNumber: false,
            accountOwner: false,
        },
        password: false,
        confirmPassword: false,
    });
    const [isValidSubmit, setIsValidSubmit] = useState([""]);
    const [submitted, setSubmitted] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: "",
        phone: "",
        name: "",
        image: null,
        location: {
            street: "",
            number: "",
            city: "",
        },
        type: "",
        shippingCost: 0,
        bankAccount: {
            bank: null,
            branch: null,
            accountNumber: "",
            accountOwner: "",
        },
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const isValidData = useCallback((fieldName, isValid) => {
        //updates the valid data object
        if (
            fieldName == "bank" ||
            fieldName == "branch" ||
            fieldName == "accountNumber" ||
            fieldName == "accountOwner"
        ) {
            setIsTheDataValid({
                ...isTheDataValid,
                bankAccount: {
                    ...isTheDataValid.bankAccount,
                    [fieldName]: isValid,
                },
            });
        } else if (
            fieldName == "street" ||
            fieldName == "number" ||
            fieldName == "city"
        ) {
            setIsTheDataValid({
                ...isTheDataValid,
                location: { ...isTheDataValid.location, [fieldName]: isValid },
            });
        } else {
            setIsTheDataValid({
                ...isTheDataValid,
                [fieldName]: isValid,
            });
        }
        setSubmitted(false);
    });

    let id;

    const submitForm = async (e, stage) => {
        e.preventDefault();
        //checks if the form stage is valid
        setSubmitted(true);
        let valid = "";
        switch (stage) {
            case 0:
                if (
                    !isTheDataValid.password ||
                    !isTheDataValid.confirmPassword ||
                    !isTheDataValid.email
                )
                    valid = "לא כל השדות תקינים";
                else {
                    let equalUser = await getUserIdByEmail(
                        "resturant",
                        userDetails.email
                    );
                    if (equalUser != -1) {
                        valid = "כתובת מייל קיימת כבר במערכת";
                    } else valid = "";
                }
                break;
            case 1:
                if (
                    Object.values(isTheDataValid.location).includes(false) ||
                    !isTheDataValid.name ||
                    !isTheDataValid.type ||
                    !isTheDataValid.shippingCost ||
                    !isTheDataValid.phone ||
                    !isTheDataValid.image
                )
                    valid = "לא כל השדות תקינים";
                else valid = "";
                break;
            case 2:
                if (Object.values(isTheDataValid.bankAccount).includes(false))
                    valid = "לא כל השדות תקינים";
                else valid = "";
                break;

            default:
                break;
        }
        setIsValidSubmit(valid);
        if (registerStage < 3 && valid == "") {
            setRegisterStage(registerStage + 1);
            setIsValidSubmit("");
        } else if (registerStage == 3 && valid == "") {
            setLoading(true);
            id = await addUser("resturant", {
                email: userDetails.email,
                phone: userDetails.phone,
                password: userDetails.password,
                name: userDetails.name,
                image: userDetails.image,
                location:
                    userDetails.location.street +
                    " " +
                    userDetails.location.number +
                    " " +
                    userDetails.location.city,
                type: userDetails.type,
                "shipping-cost": userDetails.shippingCost,
                bankAccount: userDetails.bankAccount,
                rating: [3],
                courses: [],
            });
            setLoading(false);
            setRegisterStage(registerStage + 1);
            props.onSuccessLogin(id, false);
        }
    };

    return (
        <div>
            {registerStage == 1 && (
                <ResturantRegisterStage1
                    isValidData={isValidData}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    submitForm={submitForm}
                    submitted={submitted}
                    isValidSubmit={isValidSubmit}
                />
            )}
            {registerStage == 2 && (
                <ResturantRegisterStage2
                    isValidData={isValidData}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    type={props.type}
                    submitForm={submitForm}
                    submitted={submitted}
                    isValidSubmit={isValidSubmit}
                />
            )}
            {registerStage == 3 && !loading && (
                <ResturantRegisterStage3
                    isValidData={isValidData}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    submitForm={submitForm}
                    submitted={submitted}
                    isValidSubmit={isValidSubmit}
                />
            )}
            {registerStage == 4 && (
                <ResturantRegisterStage4 closeModal={props.closeModal} />
            )}
            {loading && (
                <div className="loader-payment">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
        </div>
    );
}

export default ResturantRegister;
