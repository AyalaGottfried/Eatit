import React from "react";
import FieldInput from "../../../fieldInput/FieldInput";

export function ResturantRegisterStage1(props) {
    return (
        <div>
            <FieldInput
                inputFieldName="email"
                fieldType="email"
                headerClassName="כתובת אימייל"
                onChange={(value, isValid) => {
                    props.isValidData("email", isValid);
                    props.setUserDetails({
                        ...props.userDetails,
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
                    props.userDetails.password ==
                    props.userDetails.confirmPassword
                }
                onChange={(value, isValid) => {
                    props.isValidData("password", isValid);
                    props.setUserDetails({
                        ...props.userDetails,
                        password: value,
                    });
                }}
                type="register"
            />
            <FieldInput
                inputFieldName="confirmPassword"
                fieldType="password"
                headerClassName="אישור סיסמא"
                secondPassword={props.userDetails.password}
                onChange={(value, isValid) => {
                    props.isValidData("confirmPassword", isValid);
                    props.setUserDetails({
                        ...props.userDetails,
                        confirmPassword: value,
                    });
                }}
                type="register"
            />
            <button
                onClick={(e) => {
                    props.submitForm(e, 0);
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
