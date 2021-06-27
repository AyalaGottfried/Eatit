import React from "react";
import { Link } from "react-router-dom";

export function ResturantRegisterStage4(props) {
    return (
        <div className="to-courses-page-text">
            <p>המסעדה נוספה בהצלחה!</p>
            <p>כדי שאנשים יוכלו לצפות ולהזמין במסעדה שלך, עליך להוסיף מנות</p>
            <Link
                to="/resturant-account/courses"
                className="start-add-courses-button"
                onClick={props.closeModal}
            >
                לניהול התפריט
            </Link>
        </div>
    );
}
