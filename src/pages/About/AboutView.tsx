import React from 'react';
import { motion } from 'framer-motion';
import {
    Lightbulb, Search, BookOpen, Quote, Target, Footprints, Zap, Terminal,
    Users, Shield, Flag, Cpu, ShieldCheck, Hammer, Puzzle, Car
} from 'lucide-react';
import aboutData from '@/data/about.json';
// Asset imports
import profileImg from '@/assets/profile/cv_id.webp';

// Helper for rendering **bold** text
const HighlightText = ({ text, className = "" }: { text: string, className?: string }) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <span className={className}>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
            })}
        </span>
    );
};

// Icon Mapping helper
const IconMap: { [key: string]: any } = {
    Zap, Users, Flag, Target, Shield, Lightbulb, Cpu, ShieldCheck, Terminal, Search, Hammer, Puzzle, Car
};

const AboutView = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container-custom max-w-5xl mx-auto px-6">

                {/* 1. Intro / Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row gap-12 mb-20 items-start"
                >
                    {/* Profile Image */}
                    <div className="shrink-0">
                        <div className="w-48 h-64 rounded-lg overflow-hidden shadow-md border border-border">
                            <img
                                src={profileImg}
                                alt="Researcher Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 pt-2">
                        <div className="text-primary font-mono text-sm tracking-widest mb-3 uppercase">
                            {aboutData.intro.title}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                            {aboutData.intro.subtitle}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
                            <HighlightText text={aboutData.intro.description} />
                        </p>

                        {/* Keywords Tags - CV Style */}
                        <div className="flex flex-wrap gap-2">
                            {aboutData.intro.tags.map((tag: any, idx: number) => {
                                const IconComp = IconMap[tag.icon] || Zap;
                                return (
                                    <span key={idx} className="px-3 py-1 bg-white text-foreground border border-border/20 shadow-sm rounded-full text-sm font-medium flex items-center">
                                        <IconComp size={14} className="mr-1.5" />
                                        {tag.label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* 2. Research Philosophy */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-3 mb-10">
                        <Lightbulb className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold">{aboutData.philosophy.title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {aboutData.philosophy.values.map((val: any, idx: number) => {
                            const IconComp = IconMap[val.icon] || Lightbulb;
                            return (
                                <div key={idx} className="bg-card border border-border rounded-xl p-6 hover-card">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <IconComp size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground leading-tight">{val.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                        <HighlightText text={val.description} />
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* 3. Core Competencies */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-3 mb-10">
                        <Target className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold">{aboutData.strengths.title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {aboutData.strengths.cards.map((card: any, idx: number) => {
                            const IconComp = IconMap[card.icon] || Zap;
                            return (
                                <div key={idx} className="bg-card border border-border rounded-xl p-6 hover-card">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <IconComp size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground leading-tight">{card.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                        <HighlightText text={card.description} />
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* 4. Journey (Timeline Style) */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-3 mb-10">
                        <Footprints className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold">{aboutData.journey.title}</h2>
                    </div>

                    <div className="space-y-10 pl-2 border-l-2 border-border/50 ml-3">
                        {aboutData.journey.steps.map((step: any, idx: number) => (
                            <div key={idx} className="relative pl-8">
                                {/* Dot */}
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary" />

                                <div className="mb-1 text-sm font-mono text-primary font-semibold">{step.year}</div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    <HighlightText text={step.description} />
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* 5. Future Vision (Clean Design) */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.99 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="shrink-0">
                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Terminal size={32} />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                {aboutData.vision.title}
                            </h2>
                            <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                                <HighlightText text={aboutData.vision.description} />
                            </p>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default AboutView;
