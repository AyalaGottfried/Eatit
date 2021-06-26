import React, { useState, useEffect } from "react";
import { getUserDetailsByIndex } from "../../../service/users";
import CourseInResturant from "./courseInResturant/CourseInResturant";
import "./ResturantCourses.css";
import ListGroup from "react-bootstrap/ListGroup";
import ResturantDetailsInCoursesPage from "./resturantDetailsInCoursesPage/ResturantDetailsInCoursesPage";
import { editUser } from "../../../service/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function ResturantCourses(props) {
    const [resturantDetails, setResturantDetails] = useState(null);

    useEffect(async () => {
        let resturant = await getUserDetailsByIndex(
            "resturant",
            props.match.params.id
        );
        setResturantDetails(resturant);
        props.onLoad();
    }, [props.match.params.id]);

    const addProductToCart = (courseId, amount) => {
        let cart = JSON.parse(localStorage.cart);
        if (!(resturantDetails.id in cart)) {
            cart[resturantDetails.id] = {};
        }
        cart[resturantDetails.id][courseId] = amount;
        localStorage.cart = JSON.stringify(cart);
        props.setCartUpdate((x) => !x);
    };

    const rate = async (rate) => {
        let newRating = resturantDetails.rating.slice();
        newRating.push(rate);
        await editUser("resturant", resturantDetails.id, "rating", newRating);
        setResturantDetails({
            ...resturantDetails,
            rating: newRating,
        });
    };

    if (resturantDetails != null)
        return (
            <div className="resturants-courses-main-container">
                <ListGroup
                    className="resturant-courses-container"
                    variant="flush"
                >
                    {resturantDetails.courses.map((course) => (
                        <CourseInResturant
                            key={course.id}
                            course={course}
                            onAddToCart={(amount) =>
                                addProductToCart(course.id, amount)
                            }
                            resturantId={resturantDetails.id}
                            update={props.cartUpdate}
                        />
                    ))}
                </ListGroup>
                <ResturantDetailsInCoursesPage
                    resturant={resturantDetails}
                    update={props.cartUpdate}
                    onLogin={props.onLogin}
                    onPayment={() => props.onPayment(resturantDetails.id)}
                    onRate={rate}
                />
            </div>
        );
    return (
        <div className="resturants-courses-main-container">
            <div className="loader-resturants">
                <FontAwesomeIcon icon={faUtensils} spin />
            </div>
        </div>
    );
}

export default ResturantCourses;
