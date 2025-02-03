import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/eventdetail.css";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ListGroup } from "react-bootstrap";

export const EventDetail = () => {


  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const [show, setShow] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddComment = () => {
    setShowAddComment(false)
  };
  const handleShowAddComment = () => {
    setShow(false)
    setShowAddComment(true)
  };

  const event = store.events.find((ev) => ev.id === parseInt(id));

  console.log(store.posts)

  useEffect(() => {
    if (store.favorites.length === 0) {
      actions.loadFavorites();
    }
  }, [store.favorites.length]);

  useEffect(() => {
    actions.getPostComments(id)
  }, [id, show])

  if (!event) {
    return <p>Event not found or still loading...</p>;
  }




  const handleSubmit = (e) => {
    e.preventDefault()
    actions.addComment({ "content": inputValue }, event.id)
    handleCloseAddComment()
    setInputValue('')
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
  })

  const isFavorite = store.favorites.some((fav) => fav.event_id === parseInt(id));


  console.log("Evento seleccionado:", event);
  console.log("Coordenadas del evento:", citiesCoordinates[event.location]);

  return (
    <>
      <div className="event-card container">
        <div className="row mt-5">
          <div className="col-lg-6">
            <img
              className="img-fluid rounded-start"
              alt={event.title}
              src={
                event.image ||
                "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
              }
            />
            <Link style={{ float: 'right' }} className="btn btn-primary mt-5" to={`/profile/${event.id}`}>
              Ir al perfil del creador
            </Link>
          </div>
          <div className="col-lg-6">
            <div className="title-icon d-flex align-items-center justify-content-between">
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

            </div>
            <div className="mt-2">
              <h3>{event.description}</h3>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
              <div className="col-4">
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
              </div>
              <div className="col-4">
                <p>
                  <strong>Time:</strong> {event.time}
                </p>
              </div>
            </div>
            <div className="event-date-time mt-3">
              {event.date && event.time ? (
                (() => {
                  const dateParts = event.date.split("-");
                  const dateObject = new Date(
                    `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                  );
                  const formattedTime = new Date(
                    `1970-01-01T${event.time}Z`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div>
                      {dateObject.toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      {formattedTime}
                    </div>
                  );
                })()
              ) : (
                "Invalid Date or Time"
              )}
            </div>
            <div className="mt-3">

            </div>
            <div>
              <Button variant="primary" onClick={handleShow}>
                Ver comentarios del evento
              </Button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <MapContainer center={citiesCoordinates[event.location] || [0, 0]} zoom={15} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {citiesCoordinates[event.location] && (
                <Marker position={citiesCoordinates[event.location]} icon={legalIcon}>
                  <Popup>{event.title}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2>Lista de comentarios del evento</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {store.comments?.map(post => (
            <ListGroup>
              <ListGroup.Item><p className="mb-2">{post.content}</p><small className="card-text">Escrito el {post.created_at} por {post.user_id}</small></ListGroup.Item>
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
        <Modal.Body><form onSubmit={handleSubmit}>
          <textarea className="form-control" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></textarea>
          <button className="btn btn-success" type="submit">Enviar</button>
        </form><Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button></Modal.Body>
      </Modal>

    </>
  );
};

