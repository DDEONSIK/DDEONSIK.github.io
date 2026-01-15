import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import HomeContainer from '@/pages/Home/HomeContainer';
import AboutContainer from '@/pages/About/AboutContainer';
import ProjectsContainer from '@/pages/Projects/ProjectsContainer';
import LifeContainer from '@/pages/Life/LifeContainer';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><HomeContainer /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutContainer /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><ProjectsContainer /></PageTransition>} />
                <Route path="/life" element={<PageTransition><LifeContainer /></PageTransition>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
