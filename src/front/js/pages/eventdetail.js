import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/eventdetail.css";

export const EventDetail = () => {
  const { store } = useContext(Context);
  const params = useParams();


  const event = store.events.find((ev) => ev.id === parseInt(params.id));

  if (!event) {

    return <p>Event not found or still loading...</p>;
  }

  return (
    <div className="event-card container">

      <div className="row mt-5">
        <div className="col-lg-6 d-flex gap-3">
          <img
            className="img-fluid"
            alt={event.image}
            src={
              event.image ||
              "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            }
          />
          <div className="col-lg-12">

            <div className="title-icon d-flex align-items-center justify-content-between">
              <h1 className=" mb-0">{event.title}</h1>
              <i
                className={`fa-regular ${store.favorites.some(fav => fav.event_id === params.id) ? "fa-solid fa-star text-warning" : "fa-star"}`}
                onClick={() =>
                  store.favorites.some(fav => fav.event_id === params.id)
                    ? actions.removeFavorite(store.favorites.find(fav => fav.event_id === params.id).id)
                    : actions.addFavorite(store.user.id, params.id)
                }
                style={{ cursor: "pointer" }}
              ></i>

            </div>


            <div className="mt-2">
              <h3>{event.description}</h3>
            </div>

            <div className="row mt-3 d-flex justify-content-inbetween">
              <div className="col-4">
                {event.location}
              </div>
              <div className="event-date-time col-5 justify-content-end">
                            {event.date && event.time
                              ? (() => {
                                const dateParts = event.date.split('-');
                                const formattedDate = `${dateParts[0]}${dateParts[1]}${dateParts[2]}`;
                                const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                                const formattedTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                return (
                                  <>
                                    <div>{dateObject.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year:'numeric' })} {formattedTime}</div>
                                    
                                  </>
                                );
                              })()
                              : 'Invalid Date or Time'}
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
