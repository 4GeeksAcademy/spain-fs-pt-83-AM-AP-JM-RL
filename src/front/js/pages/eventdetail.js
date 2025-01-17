import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const EventDetail = () => {
  const { store } = useContext(Context);
  const params = useParams();


  const event = store.events.find((ev) => ev.id === parseInt(params.id));

  if (!event) {

    return <p>Event not found or still loading...</p>;
  }

  return (
    <div className="container">

    <div className="row mt-5">
      <div className="col-lg-6 d-flex gap-3">
        <img
          className="img-fluid"
          alt={event.title}
          src={
            event.image ||
            "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          }
        />a
        <div className="col-lg-6">

          <div className="d-flex align-items-center justify-content-between">
            <h1 className="mb-0">{event.title}</h1>
            <i
              className={`fa-regular ${store.favorites.some(fav => fav.id === params.id) ? "fa-solid fa-star text-warning" : "fa-star"}`}
              onClick={() =>
                store.favorites.some(fav => fav.id === params.id)
                  ? actions.removeFavorite(params.id)
                  : actions.addFavorite({ id: params.id })
              }
              style={{ cursor: "pointer" }}
            ></i>
          </div>
  

          <div className="mt-2">
            <h3>{event.description}</h3>
          </div>
  

          <div className="row mt-3">
            <div className="col-4">
              <p><strong>Location:</strong> {event.location}</p>
            </div>
            <div className="col-4">
              <p><strong>Date:</strong> {event.date}</p>
            </div>
            <div className="col-4">
              <p><strong>Time:</strong> {event.time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    <div className="row">
      <div className="col-12">
        <img
          className="img-fluid w-100"
          alt="Map Banner"
          style={{ height: "20vh", objectFit: "cover" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Location_map_Madrid.png/671px-Location_map_Madrid.png"
        />
      </div>
    </div>
  </div>
  
  );
};
