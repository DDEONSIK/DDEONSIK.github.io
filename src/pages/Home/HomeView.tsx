import React, { useEffect, useRef } from 'react';
import { ArrowRight, Download, Brain, Database, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import CVView from '@/pages/CV/CVView';
import homeCasualImg from '@/assets/profile/home_casual.jpg';

const HomeView: React.FC = () => {
    return (
        <div className="bg-background text-foreground">

            {/* Hero Section */}
            <header className="relative z-10 min-h-screen flex items-center justify-center container-custom mb-0">
                <div className="flex flex-col md:flex-row items-center gap-12 w-full">

                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-primary font-mono text-sm md:text-base mb-6 tracking-wide animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
                            AUTONOMOUS DRIVING PERCEPTION ENGINEER
                        </h2>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-tight mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
                            Bridging <br />
                            <span className="text-gradient">Perception</span> & <br />
                            Reasoning.
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 animate-fade-in opacity-0 mx-auto md:mx-0" style={{ animationDelay: '0.3s' }}>
                            I build intelligent systems that understand the physical world. <br />
                            Specializing in 3D Visual Grounding, Multi-view Occupancy, and Vision-Language Models.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
                            <Link to="/projects" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                View Projects
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 relative animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
                        <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 transform rotate-2 hover:rotate-0 transition-all duration-500">
                            <img
                                src={homeCasualImg}
                                alt="Jeon Hyun-Sik Casual"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-10 right-10 w-full h-full bg-secondary/20 rounded-3xl blur-3xl"></div>
                    </div>

                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground">
                    <span className="text-xs uppercase tracking-widest mb-2 block text-center">Scroll</span>
                    <ArrowRight className="rotate-90 w-6 h-6 mx-auto" />
                </div>
            </header>

            {/* CV Section (Embedded) */}
            <div id="cv-section" className="border-t border-border/50 bg-background relative z-20">
                <CVView />
            </div>



        </div>
    );
};

export default HomeView;