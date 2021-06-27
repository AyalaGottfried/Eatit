import React, { useEffect, useState } from "react";
import { editUser } from "../../../../service/users";
import Detail from "./../../detail/Detail";
import "./CostumerDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

function CostumerDetails(props) {
    const [costumerDetails, setCostumerDetails] = useState(
        props.costumerDetails
    );

    useEffect(() => {
        setCostumerDetails(props.costumerDetails);
    }, [props.costumerDetails]);

    const updateDetails = async (property, value) => {
        //sets the details in the state
        setCostumerDetails({ ...costumerDetails, [property]: value });
        //sets the details in the server
        await editUser("costumer", costumerDetails.id, property, value);
        //makes parent know the details has changed
        props.onSetDetails();
    };

    return (
        <div className="costumer-details-container">
            <div className="details-container">
                <div className="details-header">
                    {costumerDetails.image != null && (
                        <table className="costumer-image-detail-container">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td rowSpan="2">
                                        <img
                                            src={costumerDetails.image}
                                            className="costumer-image-detail"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="costumer-image-edit-icon-row"
                                    >
                                        <label className="custom-file-upload costumer-image-edit-icon">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    let reader =
                                                        new FileReader();
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
                                            <FontAwesomeIcon
                                                icon={faExchangeAlt}
                                            />
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    {costumerDetails.image == null && (
                        <label className="custom-file-upload costumer-add-image-button">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    let reader = new FileReader();
                                    reader.readAsDataURL(e.target.files[0]);

                                    reader.onload = () => {
                                        updateDetails("image", reader.result);
                                    };
                                }}
                            />
                            <span className="add-image-button">הוסף תמונה</span>
                        </label>
                    )}
                    <p
                        className="exit-button-in-details"
                        onClick={props.onExit}
                    >
                        יציאה
                    </p>
                </div>
                <div className="header-costumer-name-detail">
                    <Detail
                        content={costumerDetails.name}
                        type="text"
                        onUpdateDetail={(value) => updateDetails("name", value)}
                        property="name"
                        addedClass="header-detail"
                    />
                </div>
                <div className="inner-costumer-details">
                    <div className="property-detail-container">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="detail-icon-before"
                        />
                        <Detail
                            content={costumerDetails.email}
                            type="text"
                            onUpdateDetail={(value) =>
                                updateDetails("email", value)
                            }
                            property="email"
                            addedClass="english-detail"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CostumerDetails;
