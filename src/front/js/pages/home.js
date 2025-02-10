import React from "react";

import { Carousel } from "../component/carousel";
import "../../styles/home.css";
import { BannerCarousel } from "../component/bannercarousel";
import { motion } from "motion/react";

export const Home = () => {

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
      <div className="home-background container-fluid">

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.5
          }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "all", onEnter: () => console.log("Entering viewport") }} 
          style={{
            position: 'relative',
            transformOrigin: 'right center',
            width: '100vw'
          }}
        >
          <Carousel
            id="recentCarousel"
            title="Recientes"
            sort={sortByMostRecent}
            className="first-carousel"

          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 1
          }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "all", onEnter: () => console.log("Entering viewport") }}
          style={{
            position: 'relative',
            transformOrigin: 'right center',
            width: '100vw'
          }}
        >
          <Carousel
            id="upcomingCarousel"
            title="Próximamente"
            sort={sortByUpcoming}

          
          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 1.5
          }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "all", onEnter: () => console.log("Entering viewport") }}
          style={{
            position: 'relative',
            transformOrigin: 'right center',
            width: '100vw'
          }}
        >
          <Carousel
            id="freeCarousel"
            title="Gratis"
            filter={filterFreeEvents}

          />
        </motion.div>
      </div>
    </>
  );
};
