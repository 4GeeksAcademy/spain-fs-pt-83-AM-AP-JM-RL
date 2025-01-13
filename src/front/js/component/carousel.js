import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Carousel = () => {
  const { store, actions } = useContext(Context);

  const groupEvents = (events, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < events.length; i += chunkSize) {
      chunks.push(events.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const eventChunks = groupEvents(store.events || [], 4);

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-6">
            <h3 className="mb-3">Eventos</h3>
          </div>
          <div className="col-6 text-right">
            <a
              className="btn btn-primary mb-3 mr-1"
              href="#carouselExampleIndicators1"
              role="button"
              data-bs-slide="prev"
            >
              <i className="fa fa-arrow-left"></i>
            </a>
            <a
              className="btn btn-primary mb-3"
              href="#carouselExampleIndicators1"
              role="button"
              data-bs-slide="next"
            >
              <i className="fa fa-arrow-right"></i>
            </a>
          </div>
          <div className="col-12">
            <div
              id="carouselExampleIndicators1"
              className="carousel slide"
              data-bs-ride="carousel"
            >
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
                              <img
                                className="img-fluid"
                                alt={event.title}
                                src={event.image || "https://via.placeholder.com/300"}
                              />
                              <div className="card-body">
                                <h4 className="card-title">{event.title}</h4>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};