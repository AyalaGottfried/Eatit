import { ImageUpload } from "./imageUpload/ImageUpload";
import React, { useState } from "react";
import "./CourseForm.css";
import { editCourse, addCourse } from "../../../../../service/courses";
import {
    courseNameValidation,
    coursePriceValidation,
} from "../../../../../shared/validations";
import {
    getUserDetailsByIndex,
    getUserNameAndImage,
} from "../../../../../service/users";

function CourseForm(props) {
    const [courseDetails, setCourseDetails] = useState({
        name: props.course.name,
        price: props.course.price,
    });
    const [imageSrc, setImageSrc] = useState(props.course.image);
    const [isImageUploaded, setIsimageUploaded] = useState(false);
    const [errors, setErrors] = useState({
        name: props.course.name == "" ? "שדה נדרש" : "",
        price: props.course.price == "" ? "שדה נדרש" : "",
    });
    const [submitted, setSubmitted] = useState(false);

    const submit = async () => {
        //checks if there is an error
        props.setLoading(true);
        if (Object.values(errors).filter((error) => error != "").length == 0) {
            let resturant = await getUserNameAndImage(
                "resturant",
                props.resturantId
            );
            let resturantLogo = resturant.image;
            if (props.type == "edit") {
                await editCourse(props.resturantId, {
                    id: props.course.id,
                    name: courseDetails.name,
                    //if the user has not loaded image, takes the resturant logo instead
                    image: imageSrc == null ? resturantLogo : imageSrc,
                    price: courseDetails.price,
                });
            } else {
                await addCourse(props.resturantId, {
                    name: courseDetails.name,
                    //if the user has not loaded image, takes the resturant logo instead
                    image: imageSrc == null ? resturantLogo : imageSrc,
                    price: courseDetails.price,
                });
            }
            //makes parent know the course form has submitted
            props.setLoading(false);
            props.onSubmit();
        } else setSubmitted(true);
    };

    const changeValue = (e) => {
        //validates the user input
        let error;
        switch (e.target.name) {
            case "name":
                error = courseNameValidation(e.target.value);
                break;
            case "price":
                error = coursePriceValidation(e.target.value);
                break;
        }
        setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
        setErrors({
            ...errors,
            [e.target.name]: error,
        });
        setSubmitted(false);
    };

    return (
        <div className="course-form-container">
            <form className="course-form">
                <div>
                    <label>שם המנה:</label>
                    <input
                        type="text"
                        value={courseDetails.name}
                        name="name"
                        onChange={changeValue}
                    />
                    <p className="error-course-form">{errors.name}</p>
                </div>
                <div>
                    <label> מחיר:</label>
                    <input
                        className="input-price"
                        type="text"
                        value={courseDetails.price}
                        name="price"
                        onChange={changeValue}
                    />
                    <p className="error-course-form">{errors.price}</p>
                </div>
            </form>
            {(props.type == "edit" ||
                (props.type == "add" && isImageUploaded)) && (
                <div className="course-image-form">
                    <label>תמונה:</label>
                    <img src={imageSrc} />
                </div>
            )}
            <ImageUpload
                setImageSrc={setImageSrc}
                setIsimageUploaded={setIsimageUploaded}
                type={props.type}
            />
            <button className="okay-course-form-button" onClick={submit}>
                אישור
            </button>
            {submitted && (
                <p className="error-message-course-form">לא כל השדות תקינים</p>
            )}
        </div>
    );
}

export default CourseForm;
