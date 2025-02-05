import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const sortByMostRecent = (a, b) => new Date(b.created_at) - new Date(a.created_at);
  const sortByUpcoming = (a, b) => {

    const dateA = a.date ? new Date(a.date.split('-').reverse().join('-')) : new Date(0);
    const dateB = b.date ? new Date(b.date.split('-').reverse().join('-')) : new Date(0);

    return dateA - dateB;
  };


  const filterFreeEvents = (event) => event.price === 0;





  return (
    <>
      <div className="home-img-banner">
        <img src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div className="container">

        <Carousel
          id="recentCarousel"
          title="Recently Added"
          sort={sortByMostRecent}
        />

        <Carousel
          id="upcomingCarousel"
          title="Upcoming"
          sort={sortByUpcoming}
        />

        <Carousel
          id="freeCarousel"
          title="Free"
          filter={filterFreeEvents}
        />
      </div>
    </>
  );
};
