import ResturantAccountNav from "./resturantAccountNav/ResturantAccountNav";
import React, { useState, useEffect } from "react";
import { getUserDetailsByIndex } from "../../../service/users";
import "./ResturantAccount.css";
import Courses from "./courses/Courses";
import Management from "./managment/Management";
import ResturantDetails from "./resturantDetails/ResturantDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function ResturantAccount(props) {
    const [resturantDetails, setResturantDetails] = useState(null);

    const reloadDetails = async () => {
        let userDetails = await getUserDetailsByIndex(
            "resturant",
            props.userIndex
        );
        setResturantDetails(userDetails);
    };

    useEffect(async () => {
        await reloadDetails();
    }, [props.userIndex]);

    useEffect(() => {
        props.onLoad();
    }, []);

    return (
        <div className="resturant-account-container">
            <ResturantAccountNav path={props.path} />
            {resturantDetails == null && (
                <div className="loader-account">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
            {resturantDetails != null && props.path == "courses" && (
                <Courses
                    userIndex={props.userIndex}
                    courses={resturantDetails.courses}
                    onReloadCourses={reloadDetails}
                />
            )}
            {resturantDetails != null && props.path == "management" && (
                <Management
                    userIndex={props.userIndex}
                    courses={resturantDetails.courses}
                />
            )}
            {resturantDetails != null && props.path == "details" && (
                <ResturantDetails
                    resturantDetails={resturantDetails}
                    onSetDetails={props.onSetDetails}
                    onExit={props.onExit}
                />
            )}
        </div>
    );
}

export default ResturantAccount;
