import React from "react";
import "./CircleInNav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestion,
    faInfo,
    faShoppingCart,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

function CircleInNav(props) {
    const icons = {
        question: faQuestion,
        about: faInfo,
        shoppingCart: faShoppingCart,
        user: faUser,
    };

    return (
        <Link to={props.path}>
            <div
                className="circle-in-nav"
                id={props.color}
                data-title={props.title}
            >
                <span className="icon-container">
                    {props.image && (
                        <img src={props.image} className="user-image" />
                    )}
                    {!props.image && (
                        <FontAwesomeIcon
                            icon={icons[props.name]}
                            className="icon"
                            size="xs"
                        />
                    )}
                </span>
            </div>
        </Link>
    );
}

export default CircleInNav;
