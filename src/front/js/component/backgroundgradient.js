import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";

const COLORS = [
    '#6366f1', 
    '#4f46e5', 
    '#7c4fe0', 
    '#a855f7', 
  ];


export const BackgroundGradient = () => {
    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, white 50%, ${color})`;

    useEffect(() => {
        animate(color, COLORS, {
            ease: 'easeInOut',
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, [color]);

    return (
        <motion.section
            style={{
                backgroundImage,
                position: 'fixed',  
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: -1, 
                pointerEvents: 'none', 
            }}
            className="overflow-hidden bg-gray-950"
        ></motion.section>
    );
};
