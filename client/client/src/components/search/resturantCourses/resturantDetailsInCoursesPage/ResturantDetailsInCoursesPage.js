import {
    faEnvelope,
    faMapMarkerAlt,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./ResturantDetailsInCoursesPage.css";
import StarRatings from "react-star-ratings";
import "react-toastify/dist/ReactToastify.css";
import { average } from "../../../../shared/average";

function ResturantDetailsInCoursesPage(props) {
    const [sumOfOrder, setSumOfOrder] = useState(0);
    const [showLoginButton, setshowLoginButton] = useState(false);

    useEffect(() => {
        let order = JSON.parse(localStorage.cart)[props.resturant.id];
        let newSum = 0;
        for (let i in order) {
            let course = props.resturant.courses.find((x) => x.id == i);
            if (course == undefined) {
                let cart = JSON.parse(localStorage.cart);
                delete cart[props.resturant.id][i];
                localStorage.cart = JSON.stringify(cart);
                continue;
            }
            newSum += Number(order[i]) * Number(course.price);
        }
        if (newSum != 0) newSum += Number(props.resturant["shipping-cost"]);
        setSumOfOrder(newSum);
    }, [props.update]);

    const goToCheckout = () => {
        if (localStorage.userType != "costumer") {
            setshowLoginButton(true);
        } else props.onPayment();
    };

    return (
        <div className="resturants-details-container">
            <img src={props.resturant.image} className="resturant-logo" />
            <p className="resturant-name-in-course-page">
                {props.resturant.name}
            </p>
            <p className="resturant-type-in-course-page">
                {props.resturant.type}
            </p>
            <p className="resturant-address-in-course-page">
                <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size="xs"
                    className="detail-icon-in-course-page"
                />
                {props.resturant.location}
            </p>
            <p className="resturant-email-in-course-page">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    size="xs"
                    className="detail-icon-in-course-page"
                />
                {props.resturant.email}
            </p>
            <p className="resturant-phone-in-course-page">
                <FontAwesomeIcon
                    icon={faPhone}
                    size="xs"
                    className="detail-icon-in-course-page"
                />
                {props.resturant.phone}
            </p>
            <p className="resturant-cost-shipping-in-course-page">
                {"עלות משלוח: " +
                    props.resturant["shipping-cost"] +
                    String.fromCharCode(0x20aa)}
            </p>
            <StarRatings
                rating={average(props.resturant.rating)}
                starRatedColor="#a61b0f"
                starEmptyColor="#f2f2f2"
                starDimension="1.3vw"
                starSpacing="0.25vw"
            />
            {sumOfOrder > 0 && (
                <div>
                    <div onClick={goToCheckout}>
                        <button className="go-to-checkout-button">
                            <span className="payment">
                                {"מעבר לתשלום " +
                                    sumOfOrder +
                                    String.fromCharCode(0x20aa)}
                            </span>
                        </button>
                    </div>
                    {showLoginButton && (
                        <div className="codropdown-content">
                            <div className="must-login-message" id="up">
                                עליך
                                <button
                                    className="login-button-in-courses-page"
                                    onClick={() => {
                                        props.onLogin();
                                        setshowLoginButton(false);
                                    }}
                                >
                                    להיכנס כלקוח
                                </button>
                                לפני התשלום
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ResturantDetailsInCoursesPage;
