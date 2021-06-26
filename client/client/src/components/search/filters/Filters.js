import React, { useState, useEffect } from "react";
import "./Filters.css";
import { getAllResturantsFiltersData } from "./../../../service/users";
import "react-input-range/lib/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function Filters(props) {
    const [categories, setCategories] = useState([]);
    const [maxCost, setMaxCost] = useState(0);
    const [choosedCategories, setChoosedCategories] = useState([]);
    const [choosedShoppingCost, setChoosedShoppingCost] = useState(0);
    const [maxShippingCostRangeValue, setMaxShippingCostRangeValue] =
        useState(0);
    const [choosedMinRating, setChoosedMinRating] = useState(0);
    const [minRating, setMinRating] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        let data = await getAllResturantsFiltersData();
        setLoading(false);
        setCategories(data.types);
        setMaxCost(data.maxCost);
        setChoosedShoppingCost(data.maxCost);
        setMaxShippingCostRangeValue(0);
        props.onChange(data.types, data.maxCost, 0);
    }, []);

    const categoryChoose = (category) => {
        //removes or adds the choosed category to choosedCategories array
        let chooseCategoriesUpdate = choosedCategories.slice(0);
        if (!chooseCategoriesUpdate.includes(category))
            chooseCategoriesUpdate.push(category);
        else
            chooseCategoriesUpdate.splice(
                chooseCategoriesUpdate.indexOf(category),
                1
            );
        setChoosedCategories(chooseCategoriesUpdate);
        props.onChange(
            chooseCategoriesUpdate,
            choosedShoppingCost,
            choosedMinRating
        );
    };

    const shippingCostsChoose = (e) => {
        setChoosedShoppingCost(maxCost - e.target.value);
        setMaxShippingCostRangeValue(e.target.value);
        props.onChange(
            choosedCategories,
            maxCost - e.target.value,
            choosedMinRating
        );
    };

    const ratingChoose = (e) => {
        setMinRating(e.target.value);
        setChoosedMinRating(5 - e.target.value);
        props.onChange(
            choosedCategories,
            choosedShoppingCost,
            5 - e.target.value
        );
    };

    const reset = () => {
        setMaxShippingCostRangeValue(0);
        setChoosedCategories([]);
        setChoosedShoppingCost(maxCost);
        props.onChange([], maxCost, choosedMinRating);
    };

    return (
        <div className="filters-container">
            <div className="filters-header">
                <p className="filter-by">סנן לפי</p>
                <p className="reset" onClick={reset}>
                    איפוס
                </p>
            </div>
            {!loading && (
                <form>
                    <div className="type-rest-container">
                        {categories.map((category, index) => {
                            return (
                                <input
                                    key={index}
                                    type="button"
                                    value={category}
                                    className={
                                        "type-rest-button choose-" +
                                        choosedCategories.includes(category)
                                    }
                                    onClick={() => categoryChoose(category)}
                                />
                            );
                        })}
                    </div>
                    <div className="shipping-cost-container">
                        <label className="shipping-cost-title">
                            דירוג מסעדה
                        </label>
                        <div className="range-container">
                            <span className="range-side">5</span>
                            <input
                                type="range"
                                min={0}
                                max={5}
                                className="shipping-cost-slider"
                                onInput={ratingChoose}
                                value={minRating}
                            />
                            <span className="range-side">0</span>
                        </div>
                    </div>
                    <div className="shipping-cost-container">
                        <label className="shipping-cost-title">
                            עלות משלוח
                        </label>
                        <div className="range-container">
                            <span className="range-side">{maxCost}</span>
                            <input
                                type="range"
                                min="1"
                                max={maxCost}
                                className="shipping-cost-slider"
                                onInput={shippingCostsChoose}
                                value={maxShippingCostRangeValue}
                            />
                            <span className="range-side">0</span>
                        </div>
                    </div>
                </form>
            )}
            {loading && (
                <div className="loader-filters">
                    <FontAwesomeIcon icon={faUtensils} spin />
                </div>
            )}
        </div>
    );
}

export default Filters;
