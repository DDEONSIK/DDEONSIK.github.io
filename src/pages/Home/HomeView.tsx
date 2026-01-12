import React, { useRef, useEffect } from 'react';
import { ArrowRight, Download, Brain, Code, Eye, Layers } from 'lucide-react'; // Changed icons to fit Personal portfolio
import { Link } from 'react-router-dom';
import CityDetectionBackground from '@/pages/Home/CityDetectionBackground';
import { ResearchTopic } from '@/types/Research';
import './Home.css';

// Hardcoded Personal Data (Ideally move to a separate config later)
const HERO_CONTENT = {
    welcome: "AI RESEARCHER & ENGINEER",
    title: "Bridging Perception",
    highlight: "and Reasoning",
    description: "I am a Master's student specializing in Computer Vision and Autonomous Driving. My research focuses on Vision-Language Models and 3D Visual Grounding to build intelligent systems that understand the physical world.",
    ctaPrimary: "View Research",
    ctaSecondary: "Download CV"
};

const FEATURED_RESEARCH: ResearchTopic[] = [
    {
        id: 1,
        title: "UniAD: Planning-oriented Autonomous Driving",
        description: [{ title: 'Overview', contents: 'Unified Autonomous Driving (UniAD) is a comprehensive framework that integrates perception, prediction, and planning into a single end-to-end network.' }],
        icon: 'Brain'
    },
    {
        id: 2,
        title: "Viewformer: 3D Scene Understanding",
        description: [{ title: 'Overview', contents: 'Novel architecture using transformers for multi-view 3D object detection and scene reconstruction.' }],
        icon: 'Eye'
    },
    {
        id: 3,
        title: "Vision-Language Navigation in 3D",
        description: [{ title: 'Overview', contents: 'Leveraging LLMs to guide agents through complex 3D environments using natural language instructions.' }],
        icon: 'Layers'
    }
];

interface HomeViewProps {
    // We make props optional or ignore them for now to enforce the new personal design
    researchItems?: ResearchTopic[];
    content?: any;
}

const HomeView: React.FC<HomeViewProps> = () => {
    const researchSectionRef = useRef<HTMLDivElement>(null);

    const scrollToResearch = () => {
        researchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                {/* Layer 1: Background */}
                <div className="hero-bg-layer opacity-40 dark:opacity-60">
                    <CityDetectionBackground />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
                </div>

                {/* Layer 2: Text Content */}
                <div className="hero-content-layer">
                    <div className="hero-text-container animate-fade-in-up">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <span className="h-px w-8 bg-accent"></span>
                            <h2 className="hero-welcome-label text-accent">{HERO_CONTENT.welcome}</h2>
                            <span className="h-px w-8 bg-accent"></span>
                        </div>

                        <h1 className="hero-title">
                            {HERO_CONTENT.title} <br className="hidden md:block" />
                            <span className="hero-title-gradient">{HERO_CONTENT.highlight}</span>
                        </h1>

                        <p className="hero-description text-muted-foreground mt-6">
                            {HERO_CONTENT.description}
                        </p>

                        <div className="hero-cta-container space-x-4">
                            <Link to="/research" className="hero-cta-button group">
                                {HERO_CONTENT.ctaPrimary}
                                <ArrowRight className="hero-cta-icon" />
                            </Link>
                            <a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer" className="hero-cta-button-outline group">
                                {HERO_CONTENT.ctaSecondary}
                                <Download className="hero-cta-icon group-hover:translate-y-1 group-hover:translate-x-0" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    className="scroll-indicator cursor-pointer"
                    onClick={scrollToResearch}
                >
                    <span className="text-xs text-muted-foreground mb-2 block uppercase tracking-widest">Scroll</span>
                    <div className="scroll-mouse">
                        <div className="scroll-dot animate-bounce"></div>
                    </div>
                </div>
            </div>

            {/* Featured Research Preview */}
            <section ref={researchSectionRef} className="research-section bg-background text-foreground">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Research</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Highlights of my work in Autonomous Driving and Computer Vision.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURED_RESEARCH.map((topic, index) => (
                            <Link
                                to={`/research?area=${topic.id}`}
                                key={index}
                                className="group relative bg-card p-8 rounded-3xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {/* Simple decorative icon based on index */}
                                    {index === 0 ? <Brain size={120} /> : index === 1 ? <Eye size={120} /> : <Layers size={120} />}
                                </div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        {index === 0 ? <Brain size={24} /> : index === 1 ? <Eye size={24} /> : <Layers size={24} />}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{topic.title}</h3>
                                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                        {topic.description[0].contents}
                                    </p>
                                    <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                                        Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeView;