import React, { useState, useEffect } from "react";
import Filters from "./filters/Filters";
import Resturants from "./resturants/Resturants";
import "./Search.css";
import { getAllUsersDetails } from "./../../service/users";

function Search(props) {
    const [choosedCategories, setChoosedCategories] = useState([]);
    const [choosedMaxShippingCost, setChoosedMaxShippingCost] = useState(0);
    const [choosedMinRating, setChoosedMinRating] = useState([]);
    const [term, setTerm] = useState("");

    useEffect(() => {
        setTerm(props.term);
    }, [props.term]);

    return (
        <div className="search-container">
            <div className="filters">
                <Filters
                    onChange={(categories, maxShippingCost, minRating) => {
                        setChoosedCategories(categories);
                        setChoosedMaxShippingCost(maxShippingCost);
                        setChoosedMinRating(minRating);
                    }}
                />
            </div>
            <div className="resturants">
                <Resturants
                    categories={choosedCategories}
                    maxShippingCost={choosedMaxShippingCost}
                    minRating={choosedMinRating}
                    term={term}
                />
            </div>
        </div>
    );
}

export default Search;
