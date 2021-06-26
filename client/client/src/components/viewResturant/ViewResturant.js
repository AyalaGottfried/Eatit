import React, { useState, useEffect } from "react";
import "./ViewResturant.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { average } from "../../shared/average";
import logo from '../../assests/images/logoEatIT.png'
import { getUserNameAndImage } from "../../service/users";

function ViewResturant(props) {
    const [image, setImage] = useState(logo);
    useEffect(async() => {
        let img = await getUserNameAndImage("resturant", props.resturant.id);
        setImage(img.image)
    }, [])
    return (
        <Card
            className="resturant-card-container"
            as={Link}
            to={"/search/resturant/" + props.resturant.id}
        >
            <Card.Img
                variant="top"
                src={image}
                className="resturant-image"
            />
            <Card.Body>
                <Card.Text className="resturant-card-name">
                    {props.resturant.name}
                </Card.Text>
                <Card.Text className="resturant-card-location">
                    {props.resturant.location}
                </Card.Text>
                <Card.Text className="resturant-card-cost">
                    {"עלות משלוח: " +
                        props.resturant["shipping-cost"] +
                        String.fromCharCode(0x20aa)}
                </Card.Text>
                <div className="resturant-card-rating">
                    <StarRatings
                        rating={average(props.resturant.rating)}
                        starRatedColor={props.starsColor}
                        starEmptyColor="#f2f2f2"
                        starDimension="1.3vw"
                        starSpacing="0.25vw"
                    />
                </div>
            </Card.Body>
        </Card>
    );
}
export default ViewResturant;
