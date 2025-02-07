import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Image, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faBirthdayCake, faPen, faMapMarker, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../../styles/userDetails.css";

export const UserDetails = () => {
    const { store } = useContext(Context);

    const DetailItem = ({ icon, label, value }) => (
        <div className="detail-item mb-3 p-3 rounded shadow-sm">
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={icon} className="me-3 text-primary" size="lg" />
                <div>
                    <div className="text-muted small">{label}</div>
                    <div className="h5 mb-0">{value || 'Sin definir'}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container user-details-container animate__animated animate__fadeIn">
            <div className="user-profile-card rounded-4 shadow-lg">
                <div className="profile-header text-center p-5 gradient-bg">
                    <div className="avatar-container mx-auto mb-4">
                        <Image
                            src={store.userDetails.image}
                            fluid
                            roundedCircle
                            className="user-avatar shadow-lg"
                        />
                    </div>
                    <h1 className="text-white mb-0">
                        {store.userDetails.first_name || 'Usuario'} {store.userDetails.last_name}
                    </h1>
                    <p className="text-light mb-0">{store.userDetails.location || 'Ubicación no especificada'}</p>
                </div>

                <div className="profile-body p-4 p-lg-5">
                    <Row className="g-4">
                        <Col md={6}>
                            <DetailItem
                                icon={faEnvelope}
                                label="Correo electrónico"
                                value={store.userDetails.email}
                            />
                            <DetailItem
                                icon={faUser}
                                label="Nombre completo"
                                value={`${store.userDetails.first_name} ${store.userDetails.last_name}`}
                            />
                        </Col>

                        <Col md={6}>
                            <DetailItem
                                icon={faBirthdayCake}
                                label="Edad"
                                value={store.userDetails.age && `${store.userDetails.age} años`}
                            />
                            <DetailItem
                                icon={faMapMarker}
                                label="Ubicación"
                                value={store.userDetails.location}
                            />
                        </Col>

                        <Col xs={12}>
                            <DetailItem
                                icon={faInfoCircle}
                                label="Biografía"
                                value={store.userDetails.bio}
                            />
                        </Col>
                    </Row>

                    <div className="text-center mt-5">
                        <Link
                            to="/user-form"
                            className="btn btn-primary btn-edit px-5 rounded-pill w-50"
                        >
                            <FontAwesomeIcon icon={faPen} className="me-2" />
                            Editar Perfil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};