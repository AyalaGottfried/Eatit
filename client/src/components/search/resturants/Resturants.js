import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import "./Resturants.css";
import { getAllResturantsView } from "./../../../service/users";
import ViewResturant from "./../../viewResturant/ViewResturant";
import { average } from "../../../shared/average";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function Resturants(props) {
    const [foundResturants, setFoundResturants] = useState([]);
    const [allResturants, setAllResturants] = useState(null);

    useEffect(async () => {
        let resturantsData = await getAllResturantsView("resturant");
        setAllResturants(resturantsData);
        let foundResturantsUpdate;
        if (props.categories.length == 0) {
            foundResturantsUpdate = resturantsData.filter(
                (res) =>
                    Number(res["shipping-cost"]) <= props.maxShippingCost + 1 &&
                    res.name.includes(props.term) &&
                    average(res.rating) >= props.minRating
            );
        } else {
            foundResturantsUpdate = resturantsData.filter(
                (res) =>
                    props.categories.includes(res.type) &&
                    Number(res["shipping-cost"]) <= props.maxShippingCost + 1 &&
                    res.name.includes(props.term) &&
                    average(res.rating) >= props.minRating
            );
        }
        setFoundResturants(foundResturantsUpdate);
    }, []);

    useEffect(() => {
        if (allResturants != null) {
            let foundResturantsUpdate;
            if (props.categories.length == 0) {
                foundResturantsUpdate = allResturants.filter(
                    (res) =>
                        Number(res["shipping-cost"]) <=
                            props.maxShippingCost + 1 &&
                        res.name.includes(props.term) &&
                        average(res.rating) >= props.minRating
                );
            } else {
                foundResturantsUpdate = allResturants.filter(
                    (res) =>
                        props.categories.includes(res.type) &&
                        Number(res["shipping-cost"]) <=
                            props.maxShippingCost + 1 &&
                        res.name.includes(props.term) &&
                        average(res.rating) >= props.minRating
                );
            }
            setFoundResturants(foundResturantsUpdate);
        }
    }, [
        props.categories,
        props.maxShippingCost,
        props.term,
        props.minRating,
        allResturants,
    ]);

    if (allResturants != null)
        return (
            <div className="resturant-container">
                {foundResturants.length > 0 &&
                    foundResturants.map((res) => {
                        return (
                            <ViewResturant
                                resturant={res}
                                key={res.id}
                                starsColor="#a61b0f"
                            />
                        );
                    })}
                {foundResturants.length == 0 &&
                    props.categories.length != 0 && (
                        <p className="no-results-resturants">לא נמצאו תוצאות</p>
                    )}
                {foundResturants.length == 0 &&
                    props.categories.length == 0 && (
                        <p className="no-results-resturants">
                            בחר קטגוריה להצגה
                        </p>
                    )}
            </div>
        );
    return (
        <div className="loader-resturants">
            <FontAwesomeIcon icon={faUtensils} spin />
        </div>
    );
}

export default Resturants;
