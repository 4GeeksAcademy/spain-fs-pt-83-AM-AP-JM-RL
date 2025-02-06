import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/banner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { Carousel } from "bootstrap/dist/js/bootstrap.bundle.min.js";

export const BannerCarousel = ({ filter, sort, title, id }) => {
  const { store, actions } = useContext(Context);
  const [shuffledEvents, setShuffledEvents] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (store.events && store.events.length > 0) {
      const events = prepareEvents(store.events);
      const shuffled = shuffleArray(events);
      setShuffledEvents(shuffled.slice(0, 4)); // Limit to 4 events
    }
  }, [store.events]);

  useEffect(() => {
    const carouselElement = document.getElementById(id);
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: false, // Disable auto-sliding
      });
    }
  }, [id, shuffledEvents]);

  const prepareEvents = (events) => {
    let filteredEvents = filter ? events.filter(filter) : events;
    if (sort) {
      filteredEvents = [...filteredEvents].sort(sort);
    }
    return filteredEvents;
  };

  return (
    <section className="banner-carousel-container">
      <div className="container-fluid px-0">
        <h3 className="visually-hidden">{title}</h3>
        <div id={id} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {shuffledEvents.map((event, index) => (
              <div key={event.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div
                  className="event-card"
                  style={{
                    backgroundImage: `url(${event.image || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div className="event-info" style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "20px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                  }}>
                    <h2 className="event-title">{event.title}</h2>
                    <h4 className="event-location">{event.location}</h4>
                    <h6 className="event-datetime">
                      {event.date && event.time
                        ? (() => {
                            const dateParts = event.date.split("-");
                            const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                            const formattedTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                            return `${dateObject.toLocaleDateString("es-ES", { day: "numeric", month: "short" })} ${formattedTime}`;
                          })()
                        : "Invalid Date or Time"}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
            <div className="carousel-item">
              <div
                className="banner-item"
                style={{
                  backgroundImage: `url(https://img.freepik.com/foto-gratis/sonriendo-mujeres-jovenes-bailando-festival-holi_23-2148129372.jpg?t=st=1738877638~exp=1738881238~hmac=b539a0d94786e6d8f843ea214e0baa1f60ef4a86a353f1704c6d8d5af579d1d7&w=1380)`,
                  backgroundSize: "cover",
                  height: "400px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2 className="text-center text-white">Banner</h2>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "10px",
              zIndex: 10,
            }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "10px",
              zIndex: 10,
            }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
