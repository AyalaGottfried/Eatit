import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import "./CommonQuestions.css";
import {
    commonQuestionsForCostomers,
    commonQuestionsForResturants,
} from "./questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { ListGroup } from "react-bootstrap";

function CommonQuestions(props) {
    const [isCustomerQuestionOpen, setIsCustomerQuestionOpen] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [isResturantQuestionOpen, setIsResturantQuestionOpen] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [questionsType, setQuestionsType] = useState("costumers");

    useEffect(() => {
        props.onLoad();
    }, []);

    const openCloseAnswerCostomer = (index) => {
        let newShows = isCustomerQuestionOpen.slice();
        newShows[index] = !newShows[index];
        setIsCustomerQuestionOpen(newShows);
    };

    const openCloseAnswerResturant = (index) => {
        let newShows = isResturantQuestionOpen.slice();
        newShows[index] = !newShows[index];
        setIsResturantQuestionOpen(newShows);
    };

    return (
        <div className="common-question-container">
            <Nav
                justify
                variant="tabs"
                defaultActiveKey="costumers"
                onSelect={(eventKey) => setQuestionsType(eventKey)}
            >
                <Nav.Item>
                    <Nav.Link eventKey="costumers" className="question-title">
                        שאלות ללקוחות
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="resturants" className="question-title">
                        שאלות לבעלי מסעדות
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <ListGroup className="questions-container">
                {questionsType == "costumers" &&
                    commonQuestionsForCostomers.map((question, index) => {
                        return (
                            <ListGroup.Item
                                className="common-question-text"
                                key={index}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isCustomerQuestionOpen[index]
                                            ? faCaretDown
                                            : faCaretLeft
                                    }
                                    className="common-question-icon"
                                    onClick={() =>
                                        openCloseAnswerCostomer(index)
                                    }
                                />
                                <p className="common-question-question">
                                    {question.question}
                                </p>{" "}
                                {isCustomerQuestionOpen[index] && (
                                    <p className="common-question-answer">
                                        {question.answer}
                                    </p>
                                )}
                            </ListGroup.Item>
                        );
                    })}

                {questionsType == "resturants" &&
                    commonQuestionsForResturants.map((question, index) => {
                        return (
                            <ListGroup.Item
                                className="common-question-text"
                                key={index}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isResturantQuestionOpen[index]
                                            ? faCaretDown
                                            : faCaretLeft
                                    }
                                    className="common-question-icon"
                                    onClick={() =>
                                        openCloseAnswerResturant(index)
                                    }
                                />
                                <p className="common-question-question">
                                    {question.question}
                                </p>{" "}
                                {isResturantQuestionOpen[index] && (
                                    <p className="common-question-answer">
                                        {question.answer}
                                    </p>
                                )}
                            </ListGroup.Item>
                        );
                    })}
            </ListGroup>
        </div>
    );
}

export default CommonQuestions;
