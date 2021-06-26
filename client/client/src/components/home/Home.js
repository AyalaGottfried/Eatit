import React, { useEffect } from "react";
import ImageHome from "./imageHome/ImageHome";
import RandomResturants from "./randomResturants/RandomResturants";
import "./Home.css";

function Home(props) {
    useEffect(() => {
        props.onLoad();
    }, []);
    return (
        <div className="bg-home">
            <ImageHome />
            <RandomResturants />
        </div>
    );
}

export default Home;
