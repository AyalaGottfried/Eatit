import React from "react";
import { Link } from "react-router-dom";
import "./ImageHome.css";

function ImageHome() {
    return (
        <div className="img-container">
            <Link className="start-button" to="/Search">
                <span className="arrows">בואו נתחיל לאכול</span>
            </Link>
        </div>
    );
}

export default ImageHome;
