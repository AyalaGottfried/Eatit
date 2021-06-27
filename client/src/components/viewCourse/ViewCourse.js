import React from "react";
import { ListGroup } from "react-bootstrap";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ViewCourse.css";

function ViewCourse(props) {
    return (
        <ListGroup.Item className="courses-list-in-view-course">
            <div className="course-item-in-view-course">
                <img
                    src={props.courseDetails.image}
                    className={"course-image-in-view-course from-" + props.from}
                />
                <div className="course-details-in-view-course">
                    <p
                        className={
                            "course-name-in-view-course from-" + props.from
                        }
                    >
                        {props.courseDetails.name}
                    </p>
                    <p
                        className={
                            "course-price-in-view-course from-" + props.from
                        }
                    >
                        {props.courseDetails.price *
                            props.order[props.courseDetails.id] +
                            String.fromCharCode(0x20aa)}
                    </p>
                </div>
            </div>
            <div className="amount-manage-in-view-course from-">
                <FontAwesomeIcon
                    icon={faCaretUp}
                    className={"up-arrow-icon from-" + props.from}
                    onClick={() => props.increase(props.courseDetails.id)}
                    size="lg"
                />
                <p className={"item-amount-in-view-course from-" + props.from}>
                    {props.order[props.courseDetails.id]}
                </p>
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className={"up-arrow-icon from-" + props.from}
                    onClick={() => props.decrease(props.courseDetails.id)}
                    size="lg"
                />
            </div>
        </ListGroup.Item>
    );
}

export default ViewCourse;
