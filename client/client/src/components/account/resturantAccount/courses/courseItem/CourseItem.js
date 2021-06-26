import React from "react";
import "./CourseItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function CourseItem(props) {
    return (
        <div className="course-item-container">
            <div>{props.course.name}</div>
            <div className="price-image">
                <img src={props.course.image} className="course-image" />
                <div className="course-price">
                    {props.course.price + String.fromCharCode(0x20aa)}
                </div>
                <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={props.onEdit}
                    size="xs"
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className="trash-icon"
                    onClick={props.onDelete}
                    size="xs"
                />
            </div>
        </div>
    );
}

export default CourseItem;
