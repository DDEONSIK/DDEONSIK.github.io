import React, { useMemo } from 'react';
import { User, Code2, Heart, Zap, Terminal, Coffee, Book } from 'lucide-react';
import aboutData from '@/data/about.json';

// Dynamic Asset Loading
// Using relative path for robust matching across environments
const profileImagesGlob = import.meta.glob('../../assets/profile/*.jpg', { eager: true });

// Icon Mapping
const iconMap: { [key: string]: any } = {
    Terminal,
    Zap,
    Coffee,
    Code2,
    Book,
    Heart,
    User
};

const AboutView = () => {

    // Dynamically load the profile image based on JSON filename
    const profileImageSrc = useMemo(() => {
        const filename = aboutData.profile.profileImage;
        // Search through the glob results for the matching filename
        for (const path in profileImagesGlob) {
            // Extract filename from path (e.g., "../../assets/profile/cv_id.jpg" -> "cv_id.jpg")
            if (path.split('/').pop() === filename) {
                return (profileImagesGlob[path] as any).default;
            }
        }
        return null;
    }, []);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container-custom max-w-5xl">

                {/* Profile Header (Clean & Tidy) */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-20">
                    {/* ID Photo (Formal) */}
                    <div className="shrink-0 w-48 h-64 rounded-lg overflow-hidden shadow-md border border-border">
                        {profileImageSrc ? (
                            <img
                                src={profileImageSrc}
                                alt={`${aboutData.profile.name} Identification`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Intro Text */}
                    <div className="flex-1 text-center md:text-left pt-2">
                        <h4 className="text-primary font-mono text-sm tracking-widest mb-3 uppercase">{aboutData.profile.title}</h4>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                            {aboutData.profile.name}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                            {aboutData.profile.intro}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                            {aboutData.profile.tags.map((tag, idx) => {
                                const Icon = iconMap[tag.icon] || Zap;
                                return (
                                    <div key={idx} className="px-4 py-2 bg-secondary rounded-full text-foreground text-sm font-medium flex items-center">
                                        <Icon size={16} className="mr-2 text-primary" /> {tag.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Narrative Grid (Structured) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {aboutData.cards.map((card, idx) => {
                        const Icon = iconMap[card.icon] || Code2;
                        return (
                            <div
                                key={idx}
                                className={`bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${card.fullWidth ? 'md:col-span-2 flex flex-col md:flex-row gap-6 items-start' : ''}`}
                            >
                                <div className={`shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary ${!card.fullWidth ? 'mb-4' : ''}`}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">{card.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {card.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default AboutView;
