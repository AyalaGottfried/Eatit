import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { getResturantDetails } from "../../../service/users";
import ViewCourse from "../../viewCourse/ViewCourse";
import "./Cart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function Cart(props) {
    const [cart, setCart] = useState(JSON.parse(localStorage.cart));
    const [resturantsData, setResturantsData] = useState([]);

    useEffect(async () => {
        let data = [];
        for (const resturantId in cart) {
            if (Object.keys(cart[resturantId]).length != 0) {
                let resturant = await getResturantDetails(resturantId);
                data.push(resturant);
            }
        }
        setResturantsData(data);
    }, []);

    useEffect(() => {
        setCart(JSON.parse(localStorage.cart));
    }, [props.updateCart]);

    const changeAmount = (resturantId, courseId, newAmount) => {
        localStorage.cart = JSON.stringify({
            ...JSON.parse(localStorage.cart),
            [resturantId]: {
                ...cart[resturantId],
                [courseId]: newAmount,
            },
        });
        props.onUpdateCart();
    };

    const increase = (resturantId, courseId) => {
        changeAmount(resturantId, courseId, cart[resturantId][courseId] + 1);
    };

    const decrease = (resturantId, courseId) => {
        //checks if the user removed the course from cart
        if (cart[resturantId][courseId] == 1) {
            let newResturantCart = { ...cart[resturantId] };
            delete newResturantCart[courseId];
            localStorage.cart = JSON.stringify({
                ...JSON.parse(localStorage.cart),
                [resturantId]: newResturantCart,
            });
            props.onUpdateCart();
        } else {
            changeAmount(
                resturantId,
                courseId,
                cart[resturantId][courseId] - 1
            );
        }
    };

    if (
        Object.keys(cart).filter((key) => {
            return Object.keys(cart[key]).length != 0;
        }).length == 0
    ) {
        return (
            <div className="empty-cart-message">
                <p>העגלה שלך ריקה</p>
                <Link to="/search" onClick={() => document.body.click()}>
                    התחל להזמין
                </Link>
            </div>
        );
    }
    return (
        <div>
            {resturantsData.length == 0 && (
                <div className="loader-resturants">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
            {resturantsData.length != 0 &&
                resturantsData.map((resturant) => {
                    let resturantId = resturant.id;
                    return (
                        <div
                            key={resturantId}
                            className="resturant-in-cart-container"
                        >
                            <Link
                                to={"/search/resturant/" + resturantId}
                                onClick={() => document.body.click()}
                                className="resturant-in-cart-header"
                            >
                                {resturant.name}
                            </Link>
                            <ListGroup>
                                {Object.keys(cart[resturantId]).map(
                                    (courseId) => {
                                        let course = resturant.courses.find(
                                            (course) => course.id == courseId
                                        );
                                        if (course == undefined) {
                                            let cart = JSON.parse(
                                                localStorage.cart
                                            );
                                            delete cart[resturantId][courseId];
                                            localStorage.cart =
                                                JSON.stringify(cart);
                                            setCart(cart);
                                            return;
                                        }
                                        return (
                                            <ViewCourse
                                                key={courseId}
                                                courseDetails={course}
                                                order={cart[resturantId]}
                                                increase={() =>
                                                    increase(
                                                        resturantId,
                                                        courseId
                                                    )
                                                }
                                                decrease={() =>
                                                    decrease(
                                                        resturantId,
                                                        courseId
                                                    )
                                                }
                                                from="cart"
                                            />
                                        );
                                    }
                                )}
                            </ListGroup>
                            {props.userType == "costumer" && (
                                <div className="go-to-payment-button-in-cart-container">
                                    <button
                                        onClick={() => {
                                            props.onGoToPayment(resturantId);
                                            document.body.click();
                                        }}
                                        className="go-to-payment-button-in-cart"
                                    >
                                        מעבר לתשלום
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
}

export default Cart;
