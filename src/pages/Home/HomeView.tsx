import React, { useRef, useEffect } from 'react';
import { ArrowRight, Calendar, Brain, Network, Cpu, ScanEye, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import CityDetectionBackground from '@/pages/Home/CityDetectionBackground';
import { ResearchTopic, ResearchIconName } from '@/types/Research';
import { HomeContent } from '@/types/Home';
import './Home.css';

const IconMap: Record<ResearchIconName, React.ElementType> = {
    Brain,
    Network,
    Cpu,
    ScanEye,
    Microscope
};

interface HomeViewProps {
    researchItems: ResearchTopic[];
    content: HomeContent;
}

const HomeView: React.FC<HomeViewProps> = ({ researchItems, content }) => {
    const researchSectionRef = useRef<HTMLDivElement>(null);

    const scrollToResearch = () => {
        researchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Only trigger if we are at the very top and scrolling down
            if (window.scrollY < 10 && e.deltaY > 0) {
                // Optional: Prevent default scrolling if you want to force the jump, 
                // but usually better to let it coexist or just trigger the scroll.
                // e.preventDefault(); 
                scrollToResearch();
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    const renderContents = (contents?: string | string[] | any[]) => {
        if (!contents) return null;
        if (Array.isArray(contents)) {
            return contents.map((c, i) => (typeof c === 'string' ? <p key={i}>{c}</p> : null));
        }
        return <>{contents}</>;
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">

                {/* Layer 1: Background (Absolute) */}
                <div className="hero-bg-layer">
                    <CityDetectionBackground />
                </div>

                {/* Layer 2: Text Overlay (Absolute Centered) */}
                <div className="hero-content-layer">
                    <div className="hero-text-container">
                        <h2 className="hero-welcome-label">
                            {content.hero.welcomeLabel}
                        </h2>
                        <h1 className="hero-title">
                            {content.hero.title} <span className="hero-title-gradient">{content.hero.highlightedTitle}</span>
                        </h1>
                        <div className="hero-description">
                            {renderContents(content.hero.contents)}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div 
                    className="scroll-indicator cursor-pointer pointer-events-auto" 
                    onClick={scrollToResearch}
                >
                    <div className="scroll-mouse">
                        <div className="scroll-dot"></div>
                    </div>
                </div>
            </div>

            {/* Research Summary Section */}
            <section ref={researchSectionRef} className="research-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">{content.researchSummary.title}</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="research-grid">
                        {researchItems.map((topic, index) => (
                            <Link
                                to={`/research?area=${topic.id}`}
                                key={topic.id}
                                className="research-card group"
                            >
                                <div className="research-card-icon">
                                    {topic.icon && IconMap[topic.icon] && React.createElement(IconMap[topic.icon], { className: "w-8 h-8" })}
                                </div>
                                <h3 className="research-card-title">{topic.title}</h3>
                                <div className="research-card-desc">
                                    {topic.description.map(d => 
                                        d.title === 'Overview' ? 
                                            (typeof d.contents === 'string' ? d.contents : '') : ''
                                    ).join('').substring(0, 150) + '...'}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section (Contact) */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2 className="cta-title">{content.cta.title}</h2>
                    <div className="cta-description">
                         {renderContents(content.cta.contents)}
                    </div>
                    <Link to="/contact" className="cta-button group">
                        {content.cta.buttonLabel}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomeView;