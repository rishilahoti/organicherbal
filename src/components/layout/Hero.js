'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import squareData from './squareData'; // Import the squareData array

const ShuffleHero = () => {
    return (
        <section className="p-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-x-8 min-h-screen">
            <div>
                <span className="block mb-4 text-lg text-[#36186d] font-medium">
                    Traders & Exporters of Herbs, Spices,
                    <br /> Powders and other Agri Commodities
                </span>
                <h3 className="text-4xl font-semibold text-primary">
                    ORGANIC / CONVENTIONAL
                </h3>
                <p className="text-base md:text-lg text-[#645e6e] my-4 md:my-6">
                    We have the best quality of
                    <strong className="text-primary">
                        {' '}
                        Herbs, Spices, Oil Seeds, and Powders
                    </strong>{' '}
                    that are sourced directly from farmers or grown in-house. We
                    ensure that the quality of the raw materials is top notch.
                </p>
                <button className="flex justify-center w-1/2 bg-primary uppercase items-center border-1 gap-2 px-6 py-2 font-medium text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                    Catalogue
                </button>
            </div>
            <div className="md:block hidden">
                <ShuffleGrid />
            </div>
        </section>
    );
};

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const generateSquares = () => shuffle(squareData).map((sq) => (
    <motion.div
        key={sq.id}
        layout
        transition={{ duration: 1.5, type: 'spring' }}
        className="w-full h-full rounded-sm shadow-md hover:scale-125"
        style={{
            backgroundImage: `url(${sq.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    ></motion.div>
));

const ShuffleGrid = () => {
    const timeoutRef = useRef(null);
    const [squares, setSquares] = useState([]);
    const shuffleSquares = useCallback(() => {
        setSquares(generateSquares());
        timeoutRef.current = setTimeout(shuffleSquares, 3000);
    }, []);
    useEffect(() => {
        setSquares(generateSquares()); // Set initial state on client side
        shuffleSquares();
        return () => clearTimeout(timeoutRef.current);
    }, [shuffleSquares]);
    return (
        <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
            {squares.map((sq) => sq)}
        </div>
    );
};

export default ShuffleHero;
