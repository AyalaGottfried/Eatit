import CostumerAccountNav from "./costumerAccountNav/CostumerAccountNav";
import React, { useState, useEffect } from "react";
import { getUserDetailsByIndex } from "../../../service/users";
import Orders from "./orders/Orders";
import "./CostumerAccount.css";
import CostumerDetails from "./costumerDetails/CostumerDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function ResturantAccount(props) {
    const [costumerDetails, setCostumerDetails] = useState(null);

    useEffect(async () => {
        props.onLoad();
        let userDetails = await getUserDetailsByIndex(
            "costumer",
            props.userIndex
        );
        setCostumerDetails(userDetails);
    }, []);

    return (
        <div className="costumer-account-container">
            <CostumerAccountNav path={props.path} />
            {costumerDetails == null && (
                <div className="loader-account">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
            {costumerDetails != null && props.path == "orders" && (
                <Orders userIndex={props.userIndex} />
            )}
            {costumerDetails != null && props.path == "details" && (
                <CostumerDetails
                    costumerDetails={costumerDetails}
                    onSetDetails={props.onSetDetails}
                    onExit={props.onExit}
                />
            )}
        </div>
    );
}

export default ResturantAccount;
