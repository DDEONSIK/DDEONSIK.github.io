import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Layers, Eye, Brain, ChevronLeft, Calendar, FileText, ArrowUp, Car } from 'lucide-react';
import engineeringProjectsData from '@/data/engineering_projects.json';
import publicationsData from '@/data/publications.json';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface BaseItem {
    id: string;
    title: string;
    description: string; // Abstract or short description
    category: string;
    year?: number;
    icon?: string;
    techStack?: string[];
    role?: string;
    links?: {
        url: string;
        label: string;
    }[];
    details?: {
        organization?: string;
        venue?: string;
        doi?: string;
        type?: 'journal' | 'conference' | 'project';
    }
}

// Reuse icon map
const iconMap: { [key: string]: any } = {
    Eye,
    Brain,
    Layers,
    FileText,
    Car
};

const ProjectsView = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // --- Data Processing ---
    const { msResearch, bsResearch, engineeringProjects } = useMemo(() => {
        // 1. Process Publications
        const pubs = publicationsData.map((pub: any) => ({
            id: pub.id || pub.title,
            title: pub.title,
            description: "Updating abstract.",
            category: "Research",
            year: pub.year,
            icon: "FileText",
            details: {
                venue: pub.venue,
                doi: pub.doi,
                organization: pub.publisher,
                type: pub.type?.includes("journal") ? "journal" : "conference"
            },
            links: pub.URL ? [{ url: pub.URL, label: "View Paper" }] : []
        })) as BaseItem[];

        // Split M.S. (>= 2024) and B.S. (< 2024)
        const ms = pubs.filter(p => (p.year || 0) >= 2024).sort((a, b) => {
            // Force ViewFormer before UniAD
            if (a.title.includes("ViewFormer") && b.title.includes("UniAD")) return -1;
            if (a.title.includes("UniAD") && b.title.includes("ViewFormer")) return 1;
            return 0; // Maintain original order (by year from script)
        });
        const bs = pubs.filter(p => (p.year || 0) < 2024);

        // 2. Process Engineering Projects
        const projs = engineeringProjectsData.map((proj: any) => ({
            id: proj.id,
            title: proj.title,
            description: proj.description,
            category: proj.category,
            year: proj.year,
            icon: proj.icon,
            techStack: proj.techStack,
            role: proj.role,
            links: [],
            details: {
                type: 'project'
            }
        })) as BaseItem[];

        return {
            msResearch: ms,
            bsResearch: bs,
            engineeringProjects: projs
        };
    }, []);

    // Combine all for finding selected item
    const allItems = useMemo(() => [...msResearch, ...bsResearch, ...engineeringProjects], [msResearch, bsResearch, engineeringProjects]);
    const selectedItem = useMemo(() => allItems.find(i => i.id === selectedId), [selectedId, allItems]);

    // Handlers
    const handleItemClick = (id: string) => {
        setSelectedId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setSelectedId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Scroll to top of detail view when selected
    const DetailContainerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (selectedId && DetailContainerRef.current) {
            DetailContainerRef.current.scrollTop = 0;
        }
    }, [selectedId]);


    return (
        <div className="min-h-screen bg-background pt-24 pb-20 overflow-hidden flex flex-col">
            <div className="container-custom flex-1 h-full flex flex-col">

                {/* Header */}
                <motion.header
                    className="mb-8 shrink-0"
                    animate={{ opacity: selectedId ? 0.5 : 1, height: selectedId ? "auto" : "auto" }}
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Projects</h1>
                    <p className="text-lg text-muted-foreground">
                        Academic Research & Engineering Projects
                    </p>
                </motion.header>

                {/* Main Content Area - Split View */}
                <div className="flex-1 flex relative h-[calc(100vh-250px)] min-h-[600px]">

                    {/* LEFT LIST VIEW */}
                    <motion.div
                        className="h-full overflow-y-auto pr-4 pl-1 custom-scrollbar"
                        initial={{ width: "100%" }}
                        animate={{
                            width: selectedId ? "30%" : "100%",
                            opacity: 1
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="space-y-12 pb-20">

                            {/* 1. Publications & Research Group */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-foreground">Publications & Research</h2>
                                <Section title="M.S." items={msResearch} onClick={handleItemClick} selectedId={selectedId} subSection />
                                <Section title="B.S." items={bsResearch} onClick={handleItemClick} selectedId={selectedId} subSection />
                            </div>

                            {/* 2. Engineering Projects Group */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-foreground">Engineering Projects</h2>
                                <Section title="" items={engineeringProjects} onClick={handleItemClick} selectedId={selectedId} />
                            </div>

                        </div>
                    </motion.div>

                    {/* RIGHT DETAIL VIEW */}
                    <AnimatePresence>
                        {selectedId && selectedItem && (
                            <motion.div
                                className="absolute right-0 top-0 h-full bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                                initial={{ x: "100%", width: "68%", opacity: 0 }}
                                animate={{ x: "0%", width: "68%", opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {/* Detail Header Actions */}
                                <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/30 shrink-0">
                                    <button
                                        onClick={handleBack}
                                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-secondary"
                                    >
                                        <ChevronLeft size={18} className="mr-1" /> Back to List
                                    </button>
                                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                        {selectedItem.category}
                                    </div>
                                </div>

                                {/* Detail Content (Scrollable) */}
                                <div ref={DetailContainerRef} className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                                    <div className="max-w-3xl mx-auto">
                                        {/* Icon & Title */}
                                        <div className="mb-6">
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                                {(() => {
                                                    const Icon = iconMap[selectedItem.icon || "Layers"] || Layers;
                                                    return <Icon size={32} />;
                                                })()}
                                            </div>
                                            <h2 className="text-3xl font-heading font-bold mb-4 leading-tight">{selectedItem.title}</h2>

                                            {/* Meta Tags */}
                                            <div className="flex flex-wrap gap-3 mb-6 items-center">
                                                {selectedItem.year && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                        <Calendar size={12} className="mr-1" /> {selectedItem.year}
                                                    </span>
                                                )}
                                                {selectedItem.details?.venue && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                        {selectedItem.details.venue}
                                                    </span>
                                                )}
                                                {selectedItem.role && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                        {selectedItem.role}
                                                    </span>
                                                )}

                                                {/* View Paper Button (Moved here) */}
                                                {(selectedItem.details?.doi || (selectedItem.links && selectedItem.links.length > 0)) && (
                                                    <a
                                                        href={selectedItem.details?.doi ? `https://doi.org/${selectedItem.details.doi}` : selectedItem.links?.[0]?.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ml-auto shadow-sm"
                                                    >
                                                        View Paper <ExternalLink size={12} className="ml-1" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                                            <h3 className="text-xl font-bold mb-3">Abstract / Overview</h3>
                                            <p className="leading-relaxed text-lg text-muted-foreground mb-8">
                                                {selectedItem.description}
                                            </p>

                                            {/* Additional Info for Projects */}
                                            {selectedItem.techStack && (
                                                <div className="mb-8">
                                                    <h3 className="text-lg font-bold mb-3">Tech Stack</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedItem.techStack.map(tech => (
                                                            <span key={tech} className="px-3 py-1 bg-secondary rounded-md text-sm font-mono">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons (Only for non-paper projects if needed, or if multiple links exist - simplified logic: hide if paper) */}
                                        {selectedItem.category !== "Research" && selectedItem.links && selectedItem.links.length > 0 && (
                                            <div className="mt-12 pt-8 border-t border-border flex gap-4">
                                                {selectedItem.links.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md"
                                                    >
                                                        {link.label} <ExternalLink size={18} className="ml-2" />
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Scroll to Top Button (Internal + Global) */}
                                <button
                                    onClick={() => {
                                        DetailContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="absolute bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:translate-y-[-2px] transition-transform z-10"
                                    title="Scroll to Top"
                                >
                                    <ArrowUp size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

// --- Sub Components ---

const Section = ({ title, items, onClick, selectedId, subSection = false }: { title: string, items: BaseItem[], onClick: (id: string) => void, selectedId: string | null, subSection?: boolean }) => {
    if (items.length === 0) return null;

    return (
        <div className="mb-6 last:mb-0">
            {title && (
                <h3 className={`font-bold mb-3 pl-2 border-l-4 border-primary text-foreground ${subSection ? 'text-lg' : 'text-xl'}`}>
                    {title}
                </h3>
            )}
            <div className="space-y-3">
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`} // Helper for shared transition if needed, though simple selection is used here
                        onClick={() => onClick(item.id)}
                        className={`
                            group cursor-pointer p-5 rounded-xl border transition-all duration-200
                            ${selectedId === item.id
                                ? 'bg-primary/5 border-primary shadow-md ring-1 ring-primary'
                                : 'bg-card border-border hover:border-primary/50 hover:shadow-sm'
                            }
                        `}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className={`font-semibold text-lg mb-1 group-hover:text-primary transition-colors ${selectedId === item.id ? 'text-primary' : ''}`}>
                                    {item.title}
                                </h4>
                                <div className="text-sm text-muted-foreground line-clamp-2">
                                    {item.description}
                                </div>
                            </div>
                            {/* Small Arrow indicator on hover */}
                            <div className={`opacity-0 group-hover:opacity-100 transition-opacity text-primary ${selectedId === item.id ? 'opacity-100' : ''}`}>
                                <ChevronLeft className="rotate-180" size={20} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsView;
