import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";

const COLORS = [
    '#6a4cfc', 
    '#9b4dff', 
    '#c26bff', 
    '#a75bff',  
    '#8a2be2'   
];

export const BackgroundGradient = () => {
    const color = useMotionValue(COLORS[0]);
    const gradientSize = useMotionValue(125); 
    const backgroundImage = useMotionTemplate`radial-gradient(${gradientSize}% ${gradientSize}% at 60% 0%, white 40%, ${color})`;

    useEffect(() => {
      
        animate(color, COLORS, {
            ease: 'easeInOut',
            duration: 6, 
            repeat: Infinity,
            repeatType: "mirror",
        });

        animate(gradientSize, [125, 150, 175], {
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
