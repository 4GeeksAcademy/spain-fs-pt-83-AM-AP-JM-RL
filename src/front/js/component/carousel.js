import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/carousel.css";

export const Carousel = ({ filter, sort, title, id }) => {
  const { store, actions } = useContext(Context);

  const prepareEvents = (events) => {
    let filteredEvents = filter ? events.filter(filter) : events;
    if (sort) {
      filteredEvents = [...filteredEvents].sort(sort);
    }
    return filteredEvents;
  };


  const groupEvents = (events, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < events.length; i += chunkSize) {
      chunks.push(events.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const eventChunks = groupEvents(prepareEvents(store.events || []), 4);

  return (
    <section className="pt-5 pb-5 d-flex carousel-container">
      <div className="container position-relative">
        <h3 className="mb-4">{title}</h3>
        <div id={id} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {eventChunks.length > 0 ? (
              eventChunks.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}
                >
                  <div className="row">
                    {chunk.map((event) => (
                      <div key={event.id} className="col-md-3 mb-3">
                        <div className="card">
                          <div className="date-time">
                            {event.date && event.time
                              ? (() => {
                                const dateParts = event.date.split('-');
                                const formattedDate = `${dateParts[0]}${dateParts[1]}${dateParts[2]}`;
                                const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                                const formattedTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                return (
                                  <>
                                    <div>{dateObject.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</div>
                                    <div>{formattedTime}</div>
                                  </>
                                );
                              })()
                              : 'Invalid Date or Time'}
                          </div>
                          <img
                            className="img-fluid"
                            alt={event.image}
                            src={event.image || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
                          />
                          <div className="card-body">
                            <h4 className="card-title">{event.title}</h4>
                            <div className="d-flex justify-content-between align-items-center">
                              <Link to={`/events/${event.id}`} className="btn btn-primary">
                                Details
                              </Link>
                              {store.favorites.some((fav) => fav.event_id === event.id) ? (
  <i
    onClick={() => {
      // Find the favorite using event_id and remove it
      const favorite = store.favorites.find((fav) => fav.event_id === event.id);
      if (favorite && favorite.id) {
        // Remove the favorite using the id of the favorite, not the event
        actions.removeFavorite(favorite.id); 
      }
    }}
    className="fa-solid fa-star text-warning"
    style={{ cursor: "pointer" }}
  ></i>
) : (
  <i
    onClick={() => {
      // Add the favorite using event.id (not the favorite id here)
      actions.addFavorite(event.id);
    }}
    className="fa-regular fa-star"
    style={{ cursor: "pointer" }}
  ></i>
)}


                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <p>No events available</p>
              </div>
            )}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};
