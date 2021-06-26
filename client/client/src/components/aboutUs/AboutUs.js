import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { sendEmail } from "../../service/email";

function AboutUs(props) {
    const [contactDetails, setContactDetails] = useState({
        name: "",
        email: "",
        subject: "",
        content: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.onLoad();
    }, []);

    const changeForm = (e) => {
        setContactDetails({
            ...contactDetails,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        //sends email to the user
        let res = await sendEmail(
            contactDetails.email,
            "שלום " + contactDetails.name,
            "תודה שפנית אלינו. אנו מטפלים בפנייתך ונשיב לה בהקדם"
        );
        if (res == "") {
            await sendEmail(
                "eatitproj@gmail.com",
                "נשלחה פניית משתמש חדשה",

                contactDetails.email +
                    "\nשם: " +
                    contactDetails.name +
                    "\nנושא: " +
                    contactDetails.subject +
                    "\nתוכן: " +
                    contactDetails.content
            );
            setModalContent("פנייתך התקבלה בהצלחה!");
        } else {
            setModalContent("נראה שמשהו השתבש. נסה שוב");
        }

        setLoading(false);
        setShowModal(true);
        setContactDetails({
            name: "",
            email: "",
            subject: "",
            content: "",
        });
    };

    return (
        <div className="about-us-page">
            <div className="about-us-container">
                <p className="about-us-title">קצת עלינו</p>
                <p className="about-us-text">
                    <span className="about-us-english-text">Eat It</span>
                    {
                        " הינו האתר הגדול והמוביל בארץ בתחום המסעדות והקולינריה.\nהאתר מציע פלטפורמות רבות לפרסום המסעדה שלך,\nתוך הדגשת יתרונות המסעדה ופנייה לקהל יעד איכותי וממוקד.\nחשיפה של מאות אלפי גולשים ביום יאפשרו לך לקבל את התועלת הממוקדת ביותר למסעדה שלך.\nאתה מוזמן ליצור קשר ולשמוע על מגוון המוצרים שיכולים לקדם את המסעדה שלך,\nשלא תגיד שלא ידעת..."
                    }
                </p>
            </div>
            <div className="contact-us-container">
                <p className="contact-us-title">פנה אלינו</p>
                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        placeholder="שם"
                        className="input-field-contact-us"
                        name="name"
                        onChange={changeForm}
                        value={contactDetails.name}
                    />
                    <input
                        type="email"
                        placeholder="כתובת מייל שלך"
                        className="input-field-contact-us"
                        name="email"
                        onChange={changeForm}
                        value={contactDetails.email}
                    />
                    <input
                        type="text"
                        placeholder="נושא"
                        className="input-field-contact-us"
                        name="subject"
                        onChange={changeForm}
                        value={contactDetails.subject}
                    />
                    <textarea
                        placeholder="תוכן ההודעה"
                        className="input-field-contact-us message-content"
                        rows="4"
                        name="content"
                        onChange={changeForm}
                        value={contactDetails.content}
                    ></textarea>
                    <input type="submit" className="input-submit-contact-us" />
                    {loading && (
                        <div className="loader-contact-us-email">
                            <FontAwesomeIcon icon={faUtensils} spin />
                        </div>
                    )}
                </form>
            </div>
            <Modal
                show={showModal}
                centered={true}
                onHide={() => setShowModal(false)}
            >
                <p className="message-sent-title">{modalContent}</p>
                <button
                    onClick={() => setShowModal(false)}
                    className="message-sent-button"
                >
                    אישור
                </button>
            </Modal>
        </div>
    );
}

export default AboutUs;
