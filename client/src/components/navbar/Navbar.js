import logo from "./../../assests/images/logoEatIT.png";
import { Link } from "react-router-dom";
import CircleInNav from "./circleInNav/CircleInNav";
import SearchBox from "./searchBox/SearchBox";
import React, { useState, useEffect } from "react";
import { getUserNameAndImage } from "./../../service/users";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import Cart from "./cart/Cart";

function Navbar(props) {
    const [userName, setUserName] = useState(null);
    const [userImage, setUserImage] = useState(null);

    const cartPopover = (
        <Popover className="popover-cart" data-popper-placement="dwon">
            <Popover.Title className="popover-cart-header">
                הזמנות פתוחות
            </Popover.Title>
            <Popover.Content>
                <Cart
                    onUpdateCart={props.onUpdateCart}
                    updateCart={props.updateCart}
                    onGoToPayment={props.onGoToPayment}
                    userType={props.userType}
                />
            </Popover.Content>
        </Popover>
    );

    useEffect(async () => {
        if (props.userIndex != null && props.userType != null) {
            let userDetails = await getUserNameAndImage(
                props.userType,
                props.userIndex
            );
            setUserName(userDetails.name);
            setUserImage(userDetails.image);
        }
    }, [props.userIndex, props.userType, props.userDetailsUpdate]);

    return (
        <div className="header-container">
            <div className="top-nav-home">
                <div className="circle-navbar-main">
                    <SearchBox
                        term={props.term}
                        onChangeTerm={props.onChangeTerm}
                        closeSearch={props.closeSearch}
                    />
                </div>
                <div className="circle-navbar-main">
                    <CircleInNav
                        name="question"
                        color="red"
                        title="שאלות נפוצות"
                        path="/common-questions"
                    />
                </div>
                <div className="circle-navbar-main">
                    <CircleInNav
                        name="about"
                        color="pink"
                        title="אודות"
                        path="/about"
                    />
                </div>
                <div className="circle-navbar-main">
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom-start"
                        overlay={cartPopover}
                        rootClose
                    >
                        <div className="circle-in-nav" id="orange">
                            <span className="icon-container">
                                <FontAwesomeIcon
                                    icon={faShoppingCart}
                                    className="icon"
                                    size="xs"
                                />
                            </span>
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="circle-navbar-main">
                    {props.userIndex != null && (
                        <CircleInNav
                            name="user"
                            color="yellow"
                            title="חשבון"
                            image={userImage}
                            path={
                                props.userType == "google-costumer" ||
                                props.userType == "costumer"
                                    ? "/costumer-account/orders"
                                    : "/resturant-account/management"
                            }
                        />
                    )}
                    {props.userIndex == null && (
                        <div className="user-menu-container m-dropdown">
                            <button className="dropbtn">
                                <CircleInNav
                                    name="user"
                                    color="yellow"
                                    title="חשבון"
                                    path="/"
                                />
                            </button>
                            <div className="dropdown-content">
                                <div
                                    className="link"
                                    id="up"
                                    onClick={() =>
                                        props.onOpenLogin("costumer")
                                    }
                                >
                                    כניסה כלקוח
                                </div>
                                <div
                                    className="link"
                                    id="down"
                                    onClick={() =>
                                        props.onOpenLogin("resturant")
                                    }
                                >
                                    כניסה כמסעדה
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {props.userIndex != null && (
                    <div className="hello-user-message-container">
                        <p className="hello-user-message">
                            {"שלום " + userName}
                        </p>
                        <p
                            className="exit-button-in-navbar"
                            onClick={props.onExit}
                        >
                            יציאה
                        </p>
                    </div>
                )}
            </div>
            <Link to="/" className="logo-home-container">
                <img src={logo} className="logo-home" alt="eat it" />
            </Link>
        </div>
    );
}

export default Navbar;
