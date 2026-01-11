import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedRoutes from '@/components/AnimatedRoutes';

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                    <Navbar />
                    <AnimatedRoutes />
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
