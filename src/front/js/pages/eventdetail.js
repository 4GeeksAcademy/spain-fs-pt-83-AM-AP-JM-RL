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
      <img
        className="img-fluid"
        alt={event.title}
        src={event.image || "https://via.placeholder.com/300"}
      />
      <h1>{event.title}</h1>
      <h3>{event.description}</h3>
    </div>
  );
};
