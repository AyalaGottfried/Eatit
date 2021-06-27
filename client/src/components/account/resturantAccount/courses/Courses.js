import React, { useState, useEffect } from "react";
import "./Courses.css";
import ListGroup from "react-bootstrap/ListGroup";
import CourseItem from "./courseItem/CourseItem";
import Modal from "react-bootstrap/Modal";
import { deleteCourse as dc } from "../../../../service/courses";
import CourseForm from "./courseForm/CourseForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function Courses(props) {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        props.onReloadCourses();
    }, [showModal]);

    const deleteCourse = async () => {
        //finds the index of the selected course in courses array
        setModalLoading(true);
        await dc(props.userIndex, selectedCourse.id);
        setShowModal(false);
        setModalLoading(false);
    };

    return (
        <div className="courses-page-container">
            {props.courses == null && (
                <div className="loader-account">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
            {props.courses != null && (
                <ListGroup className="courses-container">
                    <div className="list-container">
                        {props.courses.map((course) => {
                            return (
                                <ListGroup.Item
                                    className="course-in-list"
                                    key={course.id}
                                >
                                    <CourseItem
                                        course={course}
                                        resturantLogo={null}
                                        onDelete={() => {
                                            setShowModal(true);
                                            setModalType("delete");
                                            setSelectedCourse(course);
                                        }}
                                        onEdit={() => {
                                            setShowModal(true);
                                            setModalType("edit");
                                            setSelectedCourse(course);
                                        }}
                                    />
                                </ListGroup.Item>
                            );
                        })}
                    </div>
                </ListGroup>
            )}
            <button
                className="plus-button"
                onClick={() => {
                    setShowModal(true);
                    setModalType("add");
                    setSelectedCourse({
                        name: "",
                        image: null,
                        price: "",
                    });
                }}
            >
                +
            </button>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered={true}
            >
                {modalLoading && (
                    <div className="loader-resturants">
                        <FontAwesomeIcon icon={faUtensils} spin />
                    </div>
                )}
                {!modalLoading && modalType == "delete" && (
                    <div className="delete-modal-container">
                        <p className="delete-message">
                            המנה {selectedCourse.name} תוסר
                        </p>
                        <button
                            onClick={deleteCourse}
                            className="delete-button"
                        >
                            אישור
                        </button>
                    </div>
                )}
                {!modalLoading &&
                    (modalType == "edit" || modalType == "add") && (
                        <CourseForm
                            course={selectedCourse}
                            resturantId={props.userIndex}
                            onSubmit={() => setShowModal(false)}
                            type={modalType}
                            setLoading={setModalLoading}
                        />
                    )}
            </Modal>
        </div>
    );
}

export default Courses;
