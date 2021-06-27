import { PayPalButton } from "react-paypal-button-v2";
import React, { useState } from "react";
import "./Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { paypalCheckout } from "../../../service/payment";

function Payment(props) {
    const [isCashPaying, setIsCashPaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="payment-container">
            <div className="payment-stage">3</div>
            <span className="payment-stage-title">תשלום</span>
            <div
                className={
                    "centr-align" + (isCashPaying ? " disabled-div" : "")
                }
            >
                {isLoading && (
                    <div className="loader-payment">
                        <FontAwesomeIcon icon={faUtensils} spin />
                    </div>
                )}
                <PayPalButton
                        amount={String(props.sumFee)}
                        shippingPreference="NO_SHIPPING"
                        onSuccess={async () => {
                            await props.onSuccessPayment("paypal");
                        }}
                        options={{
                            clientId:
                                "ARdoAhggZDxN-b0RexY-898nKX_5ORGSBjWCUhLs8FeUELysCWqp4G9H_jgtRmJxuaVBXZpP7hHIxarY",
                            currency: "ILS",
                        }}
                        onButtonReady={() => setIsLoading(false)}
                    />
            </div>
            <div className="right-align">
                <input
                    type="checkbox"
                    onChange={(e) => {
                        setIsCashPaying(e.target.checked);
                    }}
                    checked={isCashPaying}
                />
                <label
                    className="cash-title"
                    onClick={(e) => {
                        setIsCashPaying((x) => !x);
                    }}
                >
                    תשלום במזומן בעת המסירה
                </label>
            </div>
            {isCashPaying && (
                <div className="confirm-cash-payment-footer">
                    <button
                        className="confirm-cash-payment-button"
                        onClick={async () => {
                            await props.onSuccessPayment("cash");
                        }}
                    >
                        אישור
                    </button>
                </div>
            )}
        </div>
    );
}

export default Payment;
