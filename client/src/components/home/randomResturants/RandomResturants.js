import React, { useEffect, useState } from "react";
import "./RandomResturants.css";
import { Link } from "react-router-dom";
import { getRecommendedResturants } from "../../../service/users";
import ViewResturant from "../../viewResturant/ViewResturant";
import { average } from "../../../shared/average";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function RandomResturants() {
    const [randomResturants, setRandomResturants] = useState(null);

    useEffect(async () => {
        let allResturants = await getRecommendedResturants();
        allResturants = allResturants.filter((res) => res.courses.length > 0);
        allResturants.sort((a, b) => average(b.rating) - average(a.rating));
        setRandomResturants(allResturants.slice(0, 4));
    }, []);

    return (
        <div className="random-resturants-container">
            <p className="random-resturants-title">מסעדות מומלצות</p>
            {randomResturants == null && (
                <div className="loader-account">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
            {randomResturants != null && (
                <div className="four-random-resturants-container">
                    {randomResturants.map((res, index) => (
                        <ViewResturant
                            resturant={res}
                            key={index}
                            starsColor="#d9a577"
                        />
                    ))}
                </div>
            )}
            <div className="look-for-button-container">
                <Link className="look-for-more" to="/Search">
                    <span className="search-more">חפש עוד</span>
                </Link>
            </div>
        </div>
    );
}

export default RandomResturants;
