import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { NavbarComponent } from "./component/navbar";
import { ModalLogin } from "./component/ModalLogin";
import { ModalRegister } from "./component/ModalRegister";
import { ProfileDetails } from "./component/ProfileDetails";
import { EventsForm } from "./component/EventsForm";
import { EventDetail } from "./pages/eventdetail";
import { ResultsPage } from "./pages/resultspage";
import { Footer } from "./component/footer";
import { UserForm } from "./component/UserForm";
import { UserDetails } from "./component/UserDetails";
import { BackgroundGradient } from "./component/backgroundgradient";


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


        <div className="site-margin-color">
            <BackgroundGradient />
            <div className="site-background-color" style={{ fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif' }}
            >

                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <NavbarComponent onLoginClick={handleOpenLogin} />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<ProfileDetails />} path="/profile/:event_id" />
                            <Route element={<UserForm />} path="/user-form" />
                            <Route element={<EventsForm />} path="/events-form" />
                            <Route element={<UserDetails />} path="/user-details" />
                            <Route element={<h1><br />... Not found!<br /></h1>} path="*" />
                            <Route element={<EventDetail />} path="/events/:id" />
                            <Route element={<ResultsPage />} path="/results" />



                        </Routes>
                    </ScrollToTop>
                    <ModalLogin show={isLoginModalOpen} onClose={handleCloseLogin} onRegisterClick={handleOpenRegister} />
                    <ModalRegister show={isRegisterModalOpen} onClose={handleCloseRegister} />
                    <Footer />
                </BrowserRouter>


            </div>

        </div>
    );
};

export default injectContext(Layout);
