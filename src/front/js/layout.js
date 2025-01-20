import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { ModalLogin } from "./component/ModalLogin";
import { ModalRegister } from "./component/ModalRegister";
import { ProfileDetails } from "./component/ProfileDetails";
import { EventsForm } from "./component/EventsForm";
import { EventDetail } from "./pages/eventdetail";
import { ResultsPage } from "./pages/resultspage";
import { UserForm } from "./component/UserForm";
import { UserDetails } from "./component/UserDetails";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleOpenLogin = () => {
        setIsLoginModalOpen(true);
    }

    const handleCloseLogin = () => {
        setIsLoginModalOpen(false);
    }
    
    const handleOpenRegister = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    }

    const handleCloseRegister = () => {
        setIsRegisterModalOpen(false);
    }

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar onLoginClick={handleOpenLogin} />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<ProfileDetails />} path="/profile" />
                        <Route element={<UserForm />} path="/user-form" />
                        <Route element={<EventsForm />} path="/events-form" />
                        <Route element={<UserDetails />} path="/user-details" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<EventDetail />} path="/events/:id" />
                        <Route element={<ResultsPage />} path="/results" />


                    </Routes>
                </ScrollToTop>
                <ModalLogin show={isLoginModalOpen} onClose={handleCloseLogin} onRegisterClick={handleOpenRegister}/>
                <ModalRegister show={isRegisterModalOpen} onClose={handleCloseRegister} />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
