import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ModalLogin } from "./component/ModalLogin";
import { ModalRegister } from "./component/ModalRegister";
import { ProfileDetails } from "./component/ProfileDetails";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleRegisterModalOpen = () => setIsRegisterModalOpen(true);
    const handleRegisterModalClose = () => setIsRegisterModalOpen(false);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar onLoginClick={handleModalOpen} onRegisterClick={handleRegisterModalOpen} />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ProfileDetails />} path="/profile" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
                <ModalLogin show={isModalOpen} onClose={handleModalClose} />
                <ModalRegister show={isRegisterModalOpen} onClose={handleRegisterModalClose} />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
