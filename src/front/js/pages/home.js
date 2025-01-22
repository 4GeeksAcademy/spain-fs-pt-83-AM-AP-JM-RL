import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const sortByMostRecent = (a, b) => new Date(b.created_at) - new Date(a.created_at);
  const sortByUpcoming = (a, b) => new Date(a.date) - new Date(b.date);
  const filterFreeEvents = (event) => event.price === 0;

  useEffect(() => {
    actions.getEvents();
  }, [actions]);

  return (
    <div className="container">
      
      <Carousel
        id="recentCarousel"
        title="Most Recently Added Events"
        sort={sortByMostRecent}
      />
    
      <Carousel
        id="upcomingCarousel"
        title="Upcoming Events"
        sort={sortByUpcoming}
      />
    
      <Carousel
        id="freeCarousel"
        title="Free Events"
        filter={filterFreeEvents}
      />
    </div>
  );
};
