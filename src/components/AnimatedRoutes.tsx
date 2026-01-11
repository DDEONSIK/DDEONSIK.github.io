import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Home from '@/pages/Home';
import People from '@/pages/People';
import Research from '@/pages/Research';
import Courses from '@/pages/Courses';
import Projects from '@/pages/Projects';
import Publications from '@/pages/Publications';
import Board from '@/pages/Board';
import Contact from '@/pages/Contact';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/people" element={<PageTransition><People /></PageTransition>} />
                <Route path="/research" element={<PageTransition><Research /></PageTransition>} />
                <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
                <Route path="/board" element={<PageTransition><Board /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
