import React from 'react';
import "../../styles/banner.css";
import { motion } from 'framer-motion';

export const BannerImage = () => {
  return (
    <>
      <div className="row d-flex">
        {/* Left shape with spinning effect from the left side */}
        <motion.div
          className='left-shape'
          initial={{ opacity: 0, x: -200, rotate: -180 }}  // Start from left, rotating in
          animate={{ opacity: 1, x: 0, rotate: 0 }}         // End in normal position
          transition={{ duration: 1, ease: "easeOut" }}      // Smooth out the transition
        ></motion.div>

        {/* Right shape with spinning effect from the right side */}
        <motion.div
          className='right-shape'
          initial={{ opacity: 0, x: 200, rotate: 180 }}    // Start from right, rotating in
          animate={{ opacity: 1, x: 0, rotate: 0 }}         // End in normal position
          transition={{ duration: 1.2, ease: "easeOut" }}    // Slight delay for staggered animation
        ></motion.div>
      </div>

      {/* Square and Text Animation */}
      <motion.div
        className="square"
        initial={{ opacity: 0, y: -100, rotate: 90 }}   // Start with text rotating from top
        animate={{ opacity: 1, y: 0, rotate: 0 }}        // End in normal position
        transition={{ duration: 1.5, ease: "easeOut" }}   // Slow transition
      >
        <motion.h1
          initial={{ opacity: 0, x: -200, rotate: -45 }}  // Start with the text rotating and moving from left
          animate={{ opacity: 1, x: 0, rotate: 0 }}       // End in normal position
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} // Delay for the text
        >
          Momentos inolvidables,<br /> un evento a la vez
        </motion.h1>
      </motion.div>
    </>
  );
};
