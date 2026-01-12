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
                <Route path="/about" element={<AboutContainer />} />
                <Route path="/projects" element={<ProjectsContainer />} />
                <Route path="/life" element={<LifeContainer />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
