import React, { useMemo } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import CVView from '@/pages/CV/CVView';
import { HomeContent } from '@/types/Home';
import { ResearchTopic } from '@/types/Research';

// Dynamic Profile Images
// Using relative path for robust matching across environments
const profileImagesGlob = import.meta.glob('../../assets/profile/*.webp', { eager: true });

interface HomeViewProps {
    content: HomeContent;
    researchItems?: ResearchTopic[];
}

const HomeView: React.FC<HomeViewProps> = ({ content }) => {

    const profileImageSrc = useMemo(() => {
        const filename = content.hero.profileImage;
        // Search through the glob results for the matching filename
        for (const path in profileImagesGlob) {
            // Extract filename from path (e.g., "../../assets/profile/home_casual.jpg" -> "home_casual.jpg")
            if (path.split('/').pop() === filename) {
                return (profileImagesGlob[path] as any).default;
            }
        }
        return null;
    }, [content.hero.profileImage]);

    return (
        <div className="bg-background text-foreground">

            {/* Hero Section */}
            <header className="relative z-10 min-h-screen flex items-center justify-center container-custom mb-0">
                <div className="flex flex-col md:flex-row items-center gap-12 w-full">

                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-primary font-mono text-sm md:text-base mb-6 tracking-wide animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
                            {content.hero.label}
                        </h2>

                        {/* Location Tag */}
                        {content.hero.location && (
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-6 text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: '0.15s' }}>
                                <MapPin size={18} className="text-secondary-foreground" />
                                <span className="font-medium text-sm md:text-base">{content.hero.location}</span>
                            </div>
                        )}

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-tight mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
                            {content.hero.titlePrefix} <br />
                            <span className="text-gradient">{content.hero.titleHighlight}</span> {content.hero.titleSuffix.split('&').map((part, i) => i === 0 ? part : <span key={i}>& {part}</span>).length > 1 ? <>& <br /> {content.hero.titleSuffix.replace('&', '').trim()}</> : content.hero.titleSuffix}
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 animate-fade-in opacity-0 mx-auto md:mx-0" style={{ animationDelay: '0.3s' }}>
                            {content.hero.description.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < content.hero.description.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
                            <Link to={content.hero.buttonLink} className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                {content.hero.buttonText}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 relative animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
                        <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 transform rotate-2 hover:rotate-0 transition-all duration-500">
                            {profileImageSrc ? (
                                <img
                                    src={profileImageSrc}
                                    alt="Profile Casual"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                    No Image
                                </div>
                            )}
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

            {/* Embedded CV Section */}
            <CVView />

        </div>
    );
};

export default HomeView;