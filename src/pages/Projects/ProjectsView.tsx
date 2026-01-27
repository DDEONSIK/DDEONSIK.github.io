
import React, { useMemo } from 'react';
import { ExternalLink, Github, Layers, Eye, Brain, Calendar, FileText, ArrowUp, Car } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Data Loading ---
const projectFiles = import.meta.glob('../../data/projects/*.json', { eager: true });
const allProjectData = Object.values(projectFiles).map((mod: any) => mod.default);

// Filter: Only Engineering Projects
const engineeringProjectsData = allProjectData
    .filter((item: any) => item.category === 'Engineering Projects');

// Load project assets dynamically
const projectAssets = import.meta.glob(['@/assets/project/*.{png,jpg,jpeg,webp}'], { eager: true });

const resolveAssetUrl = (url: string) => {
    if (!url.startsWith('/assets/project/')) return url;
    const filename = url.split('/').pop();
    const parsedKey = Object.keys(projectAssets).find(k => k.endsWith('/' + filename));
    return parsedKey ? (projectAssets[parsedKey] as any).default : url;
};

// Helper for rendering text
const RichTextRenderer = ({ text }: { text: string }) => {
    if (!text) return null;
    return (
        <div className="space-y-2">
            {text.split('\n').map((line, idx) => {
                const trimmed = line.trim();
                const isBullet = trimmed.startsWith('•') || trimmed.startsWith('- ');
                const cleanLine = isBullet ? trimmed.replace(/^[•-]\s*/, '') : trimmed;
                const content = cleanLine.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                });
                if (isBullet) {
                    return (
                        <div key={idx} className="flex items-start gap-3">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <p className="leading-relaxed text-lg text-muted-foreground">{content}</p>
                        </div>
                    );
                }
                if (cleanLine.length === 0) return <br key={idx} />;
                return <p key={idx} className="leading-relaxed text-lg text-muted-foreground">{content}</p>;
            })}
        </div>
    );
};

// --- Types ---
interface ProjectMedia {
    type: 'image' | 'video' | 'youtube' | 'pdf';
    url: string;
    caption?: string;
    thumbnail?: string;
}

interface BaseItem {
    id: string;
    title: string;
    title_translated?: string;
    description: string;
    abstract?: string;
    category: string;
    year?: number | string;
    icon?: string;
    techStack?: string[];
    role?: string;
    links?: { url: string; label: string; }[];
    media?: ProjectMedia[];
    itemData?: any;
    resultImages?: { url: string; caption?: string; }[];
}

const iconMap: { [key: string]: any } = { Eye, Brain, Layers, FileText, Car };

const ProjectsView = () => {
    // --- Data Processing ---
    const projects = useMemo(() => {
        return engineeringProjectsData.map((proj: any) => {
            let mediaItems: ProjectMedia[] = proj.media || [];
            if (!mediaItems.length && proj.video) {
                mediaItems.push({ type: 'youtube', url: proj.video, caption: 'Project Video' });
            }
            return {
                id: proj.id,
                title: proj.title,
                title_translated: proj.title_translated,
                description: proj.description,
                abstract: proj.detailedDescription,
                category: proj.category,
                year: proj.year,
                icon: proj.icon,
                techStack: proj.techStack,
                role: proj.role,
                itemData: proj,
                links: proj.links || [],
                media: mediaItems,
                resultImages: proj.resultImages
            } as BaseItem;
        });
    }, []);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 flex flex-col">
            <div className="container-custom flex-1 h-full flex flex-col">

                {/* Header */}
                <motion.header className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Projects</h1>
                    <p className="text-lg text-muted-foreground">Applied engineering and field implementations.</p>
                    {/* Updated subtitle as requested implicitly for the page context, 
                        User asked to modify "Academic Research & Engineering Projects" suitably. 
                        Since this is Engineering only, logic implies "Engineering Projects". 
                    */}
                </motion.header>

                {/* Project List (rendered as full cards) */}
                <div className="space-y-20">
                    {projects.map((selectedItem, index) => (
                        <motion.div
                            key={selectedItem.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col"
                        >
                            {/* Project Content */}
                            <div className="p-8 md:p-12">
                                <div className="max-w-4xl mx-auto">
                                    {/* Icon & Title */}
                                    <div className="mb-8 text-center md:text-left">
                                        <div className="inline-flex w-20 h-20 bg-primary/10 rounded-2xl items-center justify-center text-primary mb-6">
                                            {(() => {
                                                const Icon = iconMap[selectedItem.icon || "Layers"] || Layers;
                                                return <Icon size={40} />;
                                            })()}
                                        </div>
                                        <h2 className="text-4xl font-heading font-bold mb-3 leading-tight">{selectedItem.title}</h2>
                                        {selectedItem.title_translated && (
                                            <h3 className="text-2xl text-muted-foreground font-medium mb-6">{selectedItem.title_translated}</h3>
                                        )}

                                        {/* Meta Tags */}
                                        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                                                <Calendar size={14} className="mr-2" /> {selectedItem.year}
                                            </span>
                                            {selectedItem.role && (
                                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                                                    {selectedItem.role}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Media Gallery */}
                                    {selectedItem.media && selectedItem.media.length > 0 && (
                                        <div className="mb-12 space-y-6">
                                            {selectedItem.media.map((media, idx) => (
                                                <div key={idx} className="rounded-2xl overflow-hidden border border-border shadow-md bg-black/5">
                                                    {media.type === 'youtube' && (
                                                        <div className="aspect-video">
                                                            <iframe
                                                                width="100%" height="100%"
                                                                src={media.url.replace("watch?v=", "embed/").split("&")[0]}
                                                                title={media.caption || `Video ${idx + 1}`}
                                                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                                                            ></iframe>
                                                        </div>
                                                    )}
                                                    {media.type === 'image' && (
                                                        <div className="flex justify-center p-4 bg-white/50">
                                                            <img src={resolveAssetUrl(media.url)} alt={media.caption || "Project Image"} className="max-w-full h-auto object-contain rounded-lg shadow-sm" />
                                                        </div>
                                                    )}
                                                    {media.caption && (
                                                        <div className="p-4 text-center text-sm text-muted-foreground bg-secondary/30 border-t border-border/10">
                                                            {media.caption}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Content Body */}
                                    <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-12">
                                        <h3 className="text-2xl font-bold mb-6 border-b pb-2">Overview</h3>
                                        <RichTextRenderer text={selectedItem.abstract || selectedItem.description} />
                                    </div>

                                    {/* Tech Stack */}
                                    {selectedItem.techStack && (
                                        <div className="mb-10 p-6 bg-secondary/20 rounded-xl border border-border/50">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Brain size={20} /> Tech Stack</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedItem.techStack.map(tech => (
                                                    <span key={tech} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-mono font-medium shadow-sm">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Links */}
                                    {selectedItem.links && selectedItem.links.length > 0 && (
                                        <div className="flex gap-4 pt-6 border-t border-border justify-center md:justify-start">
                                            {selectedItem.links.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 hover:scale-105 transition-all shadow-lg ring-offset-2 focus:ring-2"
                                                >
                                                    {link.label} <ExternalLink size={20} className="ml-2" />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsView;
