import React from 'react';
import "../../styles/banner.css";
import { motion } from 'framer-motion';


export const BannerImage = () => {
  return (
    <>
      <div className="row d-flex">
       
        <motion.div
          className='left-shape'
          initial={{ opacity: 0, x: -200, rotate: -180 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        ></motion.div>

        <motion.div
          className='right-shape'
          initial={{ opacity: 0, x: 200, rotate: 180 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
      </div>

      <motion.div
        className="square"
        initial={{ opacity: 0, y: -100, rotate: 90 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
      
        <motion.h1
          initial={{ opacity: 0, x: -200, rotate: -45 }} 
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} 
        >
          Momentos inolvidables,<br /> un evento a la vez
        </motion.h1>
      </motion.div>
    </>
  );
};
