import React, { useEffect, useState } from "react";
import { editUser } from "../../../../service/users";
import Detail from "./../../detail/Detail";
import "./ResturantDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faMapMarkerAlt,
    faUtensils,
    faExchangeAlt,
    faPhone,
    faShekelSign,
} from "@fortawesome/free-solid-svg-icons";

function ResturantDetails(props) {
    const [resturantDetails, setResturantDetails] = useState(
        props.resturantDetails
    );

    useEffect(() => {
        setResturantDetails(props.resturantDetails);
    }, [props.resturantDetails]);

    const updateDetails = async (property, value) => {
        setResturantDetails({ ...resturantDetails, [property]: value });
        await editUser("resturant", resturantDetails.id, property, value);
        props.onSetDetails();
    };

    return (
        <div className="resturant-details-container">
            <div className="details-container">
                <div className="details-header">
                    <table className="resturant-image-detail-container">
                        <tbody>
                            <tr>
                                <td></td>
                                <td rowSpan="2">
                                    <img
                                        src={resturantDetails.image}
                                        className="resturant-image-detail"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan="2"
                                    className="resturant-image-edit-icon-row"
                                >
                                    <label className="custom-file-upload resturant-image-edit-icon">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                let reader = new FileReader();
                                                reader.readAsDataURL(
                                                    e.target.files[0]
                                                );

                                                reader.onload = () => {
                                                    updateDetails(
                                                        "image",
                                                        reader.result
                                                    );
                                                };
                                            }}
                                        />
                                        <FontAwesomeIcon icon={faExchangeAlt} />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p
                        className="exit-button-in-details"
                        onClick={props.onExit}
                    >
                        יציאה
                    </p>
                </div>
                <div className="header-resturant-name-detail">
                    <Detail
                        content={resturantDetails.name}
                        type="text"
                        onUpdateDetail={(value) => updateDetails("name", value)}
                        property="name"
                        addedClass="header-detail"
                    />
                </div>
                <div className="inner-resturant-details">
                    <div className="property-detail-container">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="detail-icon-before"
                            size="lg"
                        />
                        <Detail
                            content={resturantDetails.email}
                            type="text"
                            onUpdateDetail={(value) =>
                                updateDetails("email", value)
                            }
                            property="email"
                            addedClass="english-detail"
                        />
                    </div>
                    <div className="property-detail-container">
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="detail-icon-before"
                            size="lg"
                        />
                        <Detail
                            content={resturantDetails.location}
                            type="text"
                            onUpdateDetail={(value) =>
                                updateDetails("location", value)
                            }
                            property="address"
                            addedClass="regular-detail"
                        />
                    </div>
                    <div className="property-detail-container">
                        <FontAwesomeIcon
                            icon={faPhone}
                            className="detail-icon-before"
                            size="lg"
                        />
                        <Detail
                            content={resturantDetails.phone}
                            type="text"
                            onUpdateDetail={(value) =>
                                updateDetails("phone", value)
                            }
                            property="phone"
                            addedClass="regular-detail"
                        />
                    </div>
                    <div className="property-detail-container">
                        <FontAwesomeIcon
                            icon={faUtensils}
                            className="detail-icon-before"
                            size="lg"
                        />
                        <Detail
                            content={resturantDetails.type}
                            type="text"
                            onUpdateDetail={(value) =>
                                updateDetails("type", value)
                            }
                            property="type"
                            addedClass="regular-detail"
                        />
                    </div>
                    <div className="property-detail-container">
                        <FontAwesomeIcon
                            icon={faShekelSign}
                            className="detail-icon-before"
                            size="lg"
                        />
                        <Detail
                            content={resturantDetails["shipping-cost"]}
                            type="number"
                            onUpdateDetail={(value) =>
                                updateDetails("shipping-cost", value)
                            }
                            property="shippingCost"
                            addedClass="regular-detail"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResturantDetails;
