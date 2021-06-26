import ConfirmOrder from "./confirmOrder/ConfirmOrder";
import React, { useState, useEffect } from "react";
import { getResturantDetails } from "../../service/users";
import "./PaymentModal.css";
import ConfirmAddress from "./confirmAddress/ConfirmAddress";
import Payment from "./payment/Payment";
import { addOrder } from "../../service/orders";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function PaymentModal(props) {
    const [order, setOrder] = useState(
        JSON.parse(localStorage.cart)[props.resturantId]
    );
    const [resturantDetails, setResturantDetails] = useState(null);
    const [sumOfOrder, setSumOfOrder] = useState(0);
    const [status, setStatus] = useState(1);
    const [address, setAddress] = useState({
        name: "",
        address: "",
        phone: "",
    });
    const [rating, setRating] = useState(0);
    const [payType, setPayType] = useState();
    const [loading, setLoading] = useState(false);

    let history = useHistory();

    useEffect(async () => {
        let details = await getResturantDetails(props.resturantId);
        setResturantDetails(details);
        let sum = 0;
        for (let i in order) {
            sum +=
                Number(order[i]) *
                Number(details.courses.find((x) => x.id == i).price);
        }
        sum += Number(details["shipping-cost"]);
        setSumOfOrder(sum);
    }, []);

    const changeAmount = (courseId, newAmount) => {
        localStorage.cart = JSON.stringify({
            ...JSON.parse(localStorage.cart),
            [props.resturantId]: {
                ...order,
                [courseId]: newAmount,
            },
        });
        setOrder({
            ...order,
            [courseId]: newAmount,
        });
    };

    const increase = (courseId) => {
        changeAmount(courseId, order[courseId] + 1);
        setSumOfOrder(
            (x) =>
                x +
                Number(
                    resturantDetails.courses.find((x) => x.id == courseId).price
                )
        );
        props.onChangeCart();
    };

    const decrease = (courseId) => {
        changeAmount(courseId, order[courseId] - 1);
        setSumOfOrder(
            (x) =>
                x -
                Number(
                    resturantDetails.courses.find((x) => x.id == courseId).price
                )
        );
        props.onChangeCart();
    };

    const getDateNow = () => {
        let currentdate = new Date();
        let hours =
            String(currentdate.getHours()).length == 1
                ? "0" + String(currentdate.getHours())
                : currentdate.getHours();
        let minutes =
            String(currentdate.getMinutes()).length == 1
                ? "0" + String(currentdate.getMinutes())
                : currentdate.getMinutes();
        return (
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " " +
            hours +
            ":" +
            minutes
        );
    };

    const afterRating = async (type, rate) => {
        setLoading(true);
        //adds the rate to resturant's rating array
        let newRating = resturantDetails.rating.slice();
        if (type == "rate") {
            newRating.push(rate);
        }
        //sends the order details to the server
        await addOrder(
            {
                resturantId: props.resturantId,
                costumerId: Number(props.userId),
                order: order,
                fee: sumOfOrder,
                address: address,
                type: payType,
                status: "ordered",
                date: getDateNow(),
            },
            newRating
        );
        localStorage.cart = JSON.stringify({
            ...JSON.parse(localStorage.cart),
            [props.resturantId]: {},
        });
        history.push("/costumer-account/orders");
        props.onChangeCart();
        setLoading(false);
        props.onCloseModal();
    };

    return (
        <div className="payment-modal-container">
            {status == 1 && (
                <ConfirmOrder
                    order={order}
                    resturantDetails={resturantDetails}
                    increase={increase}
                    decrease={decrease}
                    sumOfOrder={sumOfOrder}
                    onConfirm={() => setStatus(2)}
                />
            )}
            {status == 2 && (
                <ConfirmAddress
                    onConfirm={(address) => {
                        setStatus(3);
                        setAddress(address);
                    }}
                />
            )}
            {status == 3 && (
                <Payment
                    sumFee={sumOfOrder}
                    onSuccessPayment={(type) => {
                        setPayType(type);
                        setStatus(4);
                    }}
                />
            )}
            {status == 4 && (
                <div className="rate-us-container">
                    <div className="payment-stage">4</div>
                    <span className="payment-stage-title">דרג אותנו</span>
                    {!loading && (
                        <div>
                            <div>
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="#a61b0f"
                                    starEmptyColor="#f2f2f2"
                                    starDimension="3vw"
                                    starSpacing="0.25vw"
                                    starHoverColor="#a61b0f"
                                    changeRating={async (rate) => {
                                        setRating(rate);
                                        await afterRating("rate", rate);
                                    }}
                                />
                            </div>

                            <div className="rate-us-skip-button-container">
                                <button
                                    className="rate-us-skip-button"
                                    onClick={async () => {
                                        await afterRating("skip");
                                    }}
                                >
                                    דלג
                                </button>
                            </div>
                        </div>
                    )}
                    {loading && (
                        <div className="loader-rate-us">
                            <FontAwesomeIcon icon={faUtensils} spin />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PaymentModal;
