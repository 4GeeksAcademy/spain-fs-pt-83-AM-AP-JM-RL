import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel as BootstrapCarousel } from 'bootstrap';
import { BannerImage } from "./bannerimage";

export const BannerCarousel = ({ filter, sort, title, id }) => {
  const { store, actions } = useContext(Context);
  const [shuffledEvents, setShuffledEvents] = useState([]);
  const carouselRef = useRef(null);
  const carouselInstanceRef = useRef(null); 

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
      setShuffledEvents(shuffled.slice(0, 4));
    }
  }, [store.events]);

  useEffect(() => {

    if (carouselRef.current && !carouselInstanceRef.current) {
      carouselInstanceRef.current = new BootstrapCarousel(carouselRef.current, {
        ride: "carousel",
        interval: 3000,
      });
    }


    return () => {
      if (carouselInstanceRef.current) {
        carouselInstanceRef.current.dispose();
      }
    };
  }, [shuffledEvents]);

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
        <div
          id={id}
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          ref={carouselRef} 
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="banner-item"
                style={{
                  backgroundColor: " rgb(177, 14, 206)",
                  height: "50rem",
                  width: "100%",
                }}
              >
                <BannerImage />
              </div>
            </div>

            {shuffledEvents.map((event) => (
              <div key={event.id} className="carousel-item banner-carousel-card">
                <div
                  className="event-card"
                  style={{
                    backgroundImage: `url(${event.image || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "50rem",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    className="event-info"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      height: "300px",
                      right: "0",
                      padding: "20px",
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                    }}
                  >
                    <div className="col-6">
                      <h1 className="event-title">{event.title}</h1>
                      <h3 className="event-location">{event.location}</h3>
                      <h5 className="event-datetime">
                        {event.date && event.time
                          ? (() => {
                              const dateParts = event.date.split("-");
                              const dateObject = new Date(
                                `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                              );
                              const formattedTime = new Date(
                                `1970-01-01T${event.time}Z`
                              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                              return `${dateObject.toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                              })} ${formattedTime}`;
                            })()
                          : "Invalid Date or Time"}
                      </h5>
                      <Link to={`/events/${event.id}`} className="btn btn-primary">
                        Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
