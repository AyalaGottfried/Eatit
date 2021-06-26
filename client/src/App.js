import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import ResturantAccount from "./components/account/resturantAccount/ResturantAccount";
import CostumerAccount from "./components/account/costumerAccount/CostumerAccount";
import { Switch, Route, useHistory } from "react-router-dom";
import NotFound from "./components/notFound/NotFound";
import MainLoginForm from "./components/loginModal/MainLoginForm";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import ResturantCourses from "./components/search/resturantCourses/ResturantCourses";
import { editCart, getCart } from "./service/cart";
import PaymentModal from "./components/paymentModal/PaymentModal";
import AboutUs from "./components/aboutUs/AboutUs";
import CommonQuestions from "./components/commonQuestions/CommonQuestions";

function App() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginModalType, setLoginModalType] = useState("costumer");
    const [userIndex, setUserIndex] = useState(null);
    const [userType, setUserType] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentModalResturantId, setPaymentModalResturantId] = useState(0);
    const [cartUpdate, setCartUpdate] = useState(false);
    const [userDetailsUpdate, setUserDetailsUpdate] = useState(false);
    const [term, setTerm] = useState("");
    const [closeSearch, setCloseSearch] = useState(false);

    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("userType") != "null") {
            setUserType(localStorage.getItem("userType"));
            setUserIndex(localStorage.getItem("userIndex"));
        }
        if (localStorage.getItem("cart") == null)
            localStorage.setItem("cart", "{}");
        setTerm("");
    }, []);

    const handleClose = () => {
        setShowLoginModal(false);
        setShowPaymentModal(false);
    };

    const successLogin = async (userDetails, close) => {
        if (
            (localStorage.userType == "costumer" &&
                loginModalType != "costumer") ||
            (localStorage.userType == "costumer" &&
                localStorage.userIndex != userDetails)
        ) {
            await editCart(
                localStorage.userIndex,
                JSON.parse(localStorage.cart)
            );
        }
        if (loginModalType == "costumer") {
            let cart = await getCart(userDetails);
            cart = { ...cart, ...JSON.parse(localStorage.cart) };
            localStorage.setItem("cart", JSON.stringify(cart));
        } else localStorage.setItem("cart", "{}");
        localStorage.userIndex = userDetails;
        localStorage.userType = loginModalType;
        setUserIndex(userDetails);
        if (close) setShowLoginModal(false);
        setUserType(loginModalType);
        setUserDetailsUpdate(!userDetailsUpdate);
    };

    const exit = async () => {
        if (localStorage.userType == "costumer") {
            await editCart(
                localStorage.userIndex,
                JSON.parse(localStorage.cart)
            );
        }
        localStorage.cart = "{}";
        localStorage.userIndex = "null";
        localStorage.userType = "null";
        setUserIndex(null);
        setUserType(null);
        history.push("/");
    };

    const load = () => {
        setCloseSearch(!closeSearch);
        setTerm("");
    };

    return (
        <div className="App">
            <div className="App-header">
                <Navbar
                    onOpenLogin={(type) => {
                        setShowLoginModal(true);
                        setLoginModalType(type);
                    }}
                    userIndex={userIndex}
                    userType={showLoginModal ? null : userType}
                    userDetailsUpdate={userDetailsUpdate}
                    onChangeTerm={setTerm}
                    term={term}
                    closeSearch={closeSearch}
                    onUpdateCart={() => setCartUpdate((x) => !x)}
                    updateCart={cartUpdate}
                    onGoToPayment={(resId) => {
                        setShowPaymentModal(true);
                        setPaymentModalResturantId(resId);
                    }}
                    onExit={exit}
                />
            </div>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Home onLoad={load} />
                    </Route>
                    <Route exact path="/search">
                        <Search term={term} />
                    </Route>
                    <Route
                        path="/search/resturant/:id"
                        render={(props) => (
                            <ResturantCourses
                                {...props}
                                onLogin={() => {
                                    setShowLoginModal(true);
                                    setLoginModalType("costumer");
                                }}
                                onPayment={(resId) => {
                                    setShowPaymentModal(true);
                                    setPaymentModalResturantId(resId);
                                }}
                                cartUpdate={cartUpdate}
                                setCartUpdate={setCartUpdate}
                                onLoad={load}
                            />
                        )}
                    />
                    {userType == "resturant" && (
                        <Route exact path="/resturant-account/courses">
                            <ResturantAccount
                                path="courses"
                                userIndex={userIndex}
                                onLoad={load}
                            />
                        </Route>
                    )}
                    {userType == "resturant" && (
                        <Route exact path="/resturant-account/management">
                            <ResturantAccount
                                path="management"
                                userIndex={userIndex}
                                onLoad={load}
                            />
                        </Route>
                    )}
                    {userType == "resturant" && (
                        <Route exact path="/resturant-account/details">
                            <ResturantAccount
                                path="details"
                                userIndex={userIndex}
                                onSetDetails={() =>
                                    setUserDetailsUpdate(!userDetailsUpdate)
                                }
                                onExit={exit}
                                onLoad={load}
                            />
                        </Route>
                    )}
                    {userType == "costumer" && (
                        <Route exact path="/costumer-account/details">
                            <CostumerAccount
                                path="details"
                                userIndex={userIndex}
                                onSetDetails={() =>
                                    setUserDetailsUpdate(!userDetailsUpdate)
                                }
                                onExit={exit}
                                onLoad={load}
                            />
                        </Route>
                    )}
                    {userType == "costumer" && (
                        <Route exact path="/costumer-account/orders">
                            <CostumerAccount
                                path="orders"
                                userIndex={userIndex}
                                onLoad={load}
                            />
                        </Route>
                    )}
                    <Route path="/about">
                        <AboutUs onLoad={load} />
                    </Route>
                    <Route path="/common-questions">
                        <CommonQuestions onLoad={load} />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </div>
            <div className="login-modal-container">
                <Modal
                    show={showLoginModal}
                    onHide={handleClose}
                    centered={true}
                    size="lg"
                >
                    <MainLoginForm
                        closeModal={handleClose}
                        type={loginModalType}
                        onSuccessLoginFromModal={successLogin}
                    />
                </Modal>
            </div>
            <div className="payment-modal-container">
                <Modal
                    show={showPaymentModal}
                    onHide={handleClose}
                    centered={true}
                    size="lg"
                >
                    <PaymentModal
                        resturantId={paymentModalResturantId}
                        userId={userIndex}
                        onCloseModal={handleClose}
                        onChangeCart={() => setCartUpdate((x) => !x)}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default App;
