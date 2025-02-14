import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/eventdetail.css";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { motion } from "motion/react";

export const EventDetail = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const [show, setShow] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate()





  const event = store.events.find(ev => ev.id === parseInt(id));

  useEffect(() => {
    actions.getPostComments(id)
  }, [id, show]);

  useEffect(() => {
    if (store.eventRegistrations && store.userDetails) {
      const isUserRegistered = store.eventRegistrations.some((reg) => reg.user_id === store.userDetails.id);
      setIsRegistered(isUserRegistered);
    }
  }, [store.eventRegistrations, store.userDetails]);

  if (!event) {
    return <p>Evento no encontrado o cargando...</p>;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddComment = () => setShowAddComment(false);
  const handleShowAddComment = () => {
    if (store.isAuthenticated && store.userDetails.first_name && store.userDetails.last_name) {
      setShow(false);
      setShowAddComment(true);
    }
    if (!store.isAuthenticated) {
      toast.error('Debes iniciar sesión para poder comentar')
      setShow(false);
    }
    if (store.isAuthenticated && (!store.userDetails.first_name || !store.userDetails.last_name)) {
      toast.error("Debes tener actualizado tu nombre y apellido para poder comentar")
      setTimeout(() => {
        navigate("/user-form")
      }, 1000);
    }

  };

  const handleSubmit = e => {
    e.preventDefault();
    actions.addComment({ content: inputValue }, event.id);
    handleCloseAddComment();
    setInputValue('');
  };

  const handleRegister = async () => {
    if (!store.userDetails.first_name || !store.userDetails.last_name) {
      toast.error("Debes actualizar tu nombre y apellido para registrarte en el evento")
      setTimeout(() => {
        navigate("/user-form");
      }, 1000);
      return;
    }

    const success = await actions.registerToEvent(id);
    if (success) {
      setIsRegistered(true);
      actions.getEventRegistrations(id);
    }
  }


  const handleCandelRegister = async () => {
    const success = await actions.cancelRegisterFromEvent(id);
    if (success) {
      setIsRegistered(false);
      actions.getEventRegistrations(id);
    }
  }

  const citiesCoordinates = {
    barcelona: [41.38879, 2.15899],
    madrid: [40.4165, -3.70256],
    sevilla: [37.38283, -5.97317],
    valencia: [39.47391, -0.37966],
  };

  const legalIcon = new Icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=13800&format=png&color=000000',
    iconSize: [35, 35],
  });

  const isFavorite = store.favorites.some(fav => fav.event_id === parseInt(id));

  return (
    <>
      <div className="event-card container">
        <div className="row mt-5">
          <motion.div className="col-lg-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.5
            }}>

            <img
              className="img-fluid rounded-start"
              alt={event.title}
              src={
                event.image ||
                "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
              }
            />


          </motion.div>
          <div className="col-lg-6">
            <motion.div className="title-icon d-flex align-items-center justify-content-between"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 0.5
              }}>
              <h1 className="mb-0">{event.title}</h1>
              <i
                className={`fa-star ${isFavorite ? "fa-solid text-warning" : "fa-regular"}`}
                onClick={() => {
                  if (isFavorite) {
                    actions.removeFavorite(parseInt(id));
                  } else {
                    actions.addFavorite(parseInt(id));
                  }
                }}
                style={{ cursor: "pointer" }}
              ></i>
            </motion.div>
            <motion.div className="mt-2"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 0.5
              }}>
              <h3>{event.description}</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 0.5
              }}

              className="row mt-3">
              <div className="col-3">
                <p>
                  <strong>Dónde:</strong> {event.location}
                </p>
              </div>
              <div className="col-3">
                <p>
                  <strong>Fecha:</strong> {event.date}
                </p>
              </div>
              <div className="col-3">
                <p>
                  <strong>Hora:</strong> {event.time}
                </p>
              </div>
              <div className="col-3">
                <p>
                  <strong>Precio:</strong> {event.price === 0 ? "Gratis!" : `${event.price} Euros`}
                </p>
              </div>
            </motion.div>

            <motion.div className="row"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 0.5
              }}>
              <div className="registrarte mt-3">
                {store.isAuthenticated ? (
                  event.user_id === store.userDetails.id ? (
                    <div className="w-100 text-center">
                      <button onClick={() => {
                        const question = prompt('Quieres eliminar el evento? si/no')
                        if (question.toLowerCase() === 'si') {
                          actions.deleteEvent(id)
                          navigate('/')
                        } else return;
                      }} className="btn btn-danger text-nowrap w-25">Eliminar evento</button></div>
                  ) : isRegistered ? (
                    <Button className="text-nowrap w-100" variant="danger" onClick={handleCandelRegister}>Cancelar registro</Button>
                  ) : (
                    <Button className="w-100" variant="success" onClick={handleRegister}>Registrarse en este evento</Button>
                  )
                ) : (
                  <p>Inicia sesion para registrarse en este evento</p>
                )}

              </div>

            </motion.div>
            <motion.div className="row event-buttons"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 0.5
              }}>
              <div className="col-4 text-center">
                <Button className="attendies-button" variant="info" onClick={() => setShowRegistrations(true)}>Registrados</Button>
              </div>
              <div className="col-4 text-center">
                <Button className="Comments-button" variant="primary" onClick={handleShow}>
                  Comentarios
                </Button>
              </div>
              <div className="col-4 text-center">
                <Link to={`/profile/${event.id}`}>
                  <Button className="created-by-button btn btn-primary">
                    Creador
                  </Button>
                </Link>


              </div>
            </motion.div>
          </div>
        </div>
        <div className="row mt-5">
          <motion.div className="col-12" initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.5
            }}>
            <MapContainer center={citiesCoordinates[event.location] || [0, 0]} zoom={15} style={{ height: "300px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {citiesCoordinates[event.location] && (
                <Marker position={citiesCoordinates[event.location]} icon={legalIcon}>
                  <Popup>{event.title}</Popup>
                </Marker>
              )}
            </MapContainer>
          </motion.div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2>Lista de comentarios del evento</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {store.comments?.map(post => (
            <ListGroup key={post.id}>
              <ListGroup.Item>
                <p className="mb-2">{post.content}</p>
                <small className="card-text">Escrito el {post.created_at} por {post.poster}</small>
              </ListGroup.Item>
            </ListGroup>
          ))}
          <Button variant="primary" onClick={handleShowAddComment}>
            Añadir comentario
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showAddComment} onHide={handleCloseAddComment}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className="text-center">Deja tu comentario</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <textarea className="form-control" value={inputValue} onChange={e => setInputValue(e.target.value)}></textarea>
            <button className="btn btn-success" type="submit">Enviar</button>
          </form>
          <Button variant="secondary" onClick={handleCloseAddComment}>
            Cerrar
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showRegistrations} onHide={() => setShowRegistrations(false)}>
        <Modal.Header closeButton>
          <Modal.Title><h2>Usuarios registrados</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {store.eventRegistrations?.map(reg => (
            <ListGroup key={reg.id}>
              <ListGroup.Item>
                <p className="mb-0">{reg.user.first_name} {reg.user.last_name}</p>
                <small>Registrado el {reg.created_at}</small>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </Modal.Body>
      </Modal>

    </>
  );
};
