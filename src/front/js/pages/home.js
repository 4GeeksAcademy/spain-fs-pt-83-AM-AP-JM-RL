import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import "../../styles/home.css";
import { BannerCarousel } from "../component/bannercarousel";

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
      <BannerCarousel />
      <div className="home-background container">

        <Carousel
          id="recentCarousel"
          title="Recently Added"
          sort={sortByMostRecent}
          className="first-carousel"
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
