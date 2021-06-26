import React, { useEffect, useState } from "react";
import "./searchBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function SearchBox(props) {
    const [isSearch, setIsSearch] = useState(false);

    let history = useHistory();

    const changeSearch = (e) => {
        history.push("/search");
        props.onChangeTerm(e.target.value);
    };

    useEffect(() => {
        setIsSearch(false);
    }, [props.closeSearch]);

    return (
        <div className={"search-box-container " + isSearch + "-state"}>
            <span className="search-box-line">
                {isSearch && (
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                        size="xs"
                        onClick={() => {
                            setIsSearch(false);
                            props.onChangeTerm("");
                        }}
                    />
                )}
                {!isSearch && (
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                        onClick={() => {
                            setIsSearch(true);
                        }}
                        size="xs"
                    />
                )}
                {isSearch && (
                    <input
                        type="text"
                        placeholder="חפש מסעדה"
                        className="input-search-res"
                        onBlur={(e) => {
                            if (props.term == "") setIsSearch(false);
                        }}
                        onChange={changeSearch}
                        autoFocus
                    />
                )}
            </span>
        </div>
    );
}

export default SearchBox;
