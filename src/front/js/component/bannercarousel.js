import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/banner.css";

export const BannerCarousel = ({ filter, sort, title, id }) => {
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
    <section className="carousel-container d-flex justify-content-center align-items-center">
      <div className="container-fluid position-relative px-0">
        <h3 className="visually-hidden">{title}</h3>
        <div id={id} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {eventChunks.length > 0 ? (
              eventChunks.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}
                >
                  <div className="row d-flex flex-nowrap overflow-auto">
                    {/* Display up to 4 events and the banner image */}
                    {chunk.map((event) => (
                      <div key={event.id} className="col-12 mb-3">
                        <div
                          className="card h-100"
                          style={{
                            backgroundImage: `url(${event.image || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "600px",
                          }}
                        >
                          <div className="card-body d-flex flex-column justify-content-center text-white">
                            <h2 className="card-title">{event.title}</h2>
                            <h4 className="card-subtitle">{event.location}</h4>
                            <h6 className="card-text">
                              {event.date && event.time
                                ? (() => {
                                    const dateParts = event.date.split("-");
                                    const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                                    const formattedTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                                    return (
                                      <>
                                        <div>{dateObject.toLocaleDateString("es-ES", { day: "numeric", month: "short" })}</div>
                                        <div>{formattedTime}</div>
                                      </>
                                    );
                                  })()
                                : "Invalid Date or Time"}
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Add banner image as the fifth item */}
                    <div className="col-12 mb-3">
                      <div
                        className="banner-item"
                        style={{
                          backgroundImage: `url('https://www.svgrepo.com/show/508699/landscape-placeholder.svg')`,
                          backgroundSize: "cover",
                          height: "600px",
                        }}
                      >
                        <h2 className="text-center text-white">Banner</h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <p>No events available</p>
              </div>
            )}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev position-absolute top-50 start-0 translate-middle-y"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next position-absolute top-50 end-0 translate-middle-y"
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
