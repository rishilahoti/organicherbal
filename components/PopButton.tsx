"use client"
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "./ContactPop";
import { useState } from "react";

const PopButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="text-slate-800 p-1 rounded-md bg-gradient-to-b font-medium from-lime-200 to-lime-400 hover:from-lime-300 hover:to-lime-500 transition-colors">
                Buy Now
            </button>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

interface SpringModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpringModal = ({ isOpen, setIsOpen }: SpringModalProps) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed backdrop-blur-md inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ContactForm />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    );

};

export default PopButton;