
import React, { useMemo, useState, useRef } from 'react';
import { ExternalLink, Github, Layers, Eye, Brain, Calendar, FileText, ArrowUp, Car, Play, Pause, Volume2, VolumeX, Download } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Data Loading ---
const projectFiles = import.meta.glob('../../data/Competition_Autonomous_Club.json', { eager: true });
const allProjectData = Object.values(projectFiles).map((mod: any) => mod.default);

// Filter: Only Activity Projects
const engineeringProjectsData = allProjectData
    .filter((item: any) => item.category === 'Activity');

// Load project assets dynamically - UPDATED to include video and pdf
const projectAssets = import.meta.glob(['@/assets/activity/*.{png,jpg,jpeg,webp,mp4,webm,pdf}'], { eager: true });

const resolveAssetUrl = (url: string) => {
    if (!url.startsWith('/assets/activity/')) return url;
    const filename = url.split('/').pop();
    const parsedKey = Object.keys(projectAssets).find(k => k.endsWith('/' + filename));
    return parsedKey ? (projectAssets[parsedKey] as any).default : url;
};

// Helper for rendering text with basic Markdown support
const RichTextRenderer = ({ text }: { text: string }) => {
    if (!text) return null;

    return (
        <div className="space-y-4">
            {text.split('\n').map((line, idx) => {
                const trimmed = line.trim();

                // 1. Headers (###)
                if (trimmed.startsWith('### ')) {
                    return <h3 key={idx} className="text-xl font-bold text-foreground mt-4 mb-2">{trimmed.replace('### ', '')}</h3>;
                }

                // 2. Blockquotes (>)
                if (trimmed.startsWith('> ')) {
                    const content = trimmed.replace(/^>\s*/, '');
                    // Render bold/links inside blockquote
                    return (
                        <div key={idx} className="border-l-4 border-primary/50 pl-4 py-1 my-2 bg-secondary/10 italic text-muted-foreground rounded-r-lg">
                            <InlineTextRenderer text={content} />
                        </div>
                    );
                }

                // 3. List Items (• or -)
                const isBullet = trimmed.startsWith('•') || trimmed.startsWith('- ');

                // 4. Empty lines
                if (trimmed.length === 0) return <br key={idx} />;

                const content = isBullet ? trimmed.replace(/^[•-]\s*/, '') : trimmed;

                if (isBullet) {
                    return (
                        <div key={idx} className="flex items-start gap-3">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <p className="leading-relaxed text-lg text-muted-foreground">
                                <InlineTextRenderer text={content} />
                            </p>
                        </div>
                    );
                }

                // Standard Paragraph
                return (
                    <p key={idx} className="leading-relaxed text-lg text-muted-foreground">
                        <InlineTextRenderer text={content} />
                    </p>
                );
            })}
        </div>
    );
};

// Helper for inline styles (Bold, Link)
const InlineTextRenderer = ({ text }: { text: string }) => {
    // Regex to match [Link](Url) OR **Bold**
    // We split by them to get parts. 
    // Capturing groups: 1=LinkText, 2=LinkUrl, 3=BoldText
    const parts = text.split(/(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g);

    return (
        <>
            {parts.map((part, i) => {
                if (!part) return null;

                // Handle Link: [Text](Url)
                if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                        return (
                            <a
                                key={i}
                                href={match[2]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors"
                            >
                                {match[1]}
                            </a>
                        );
                    }
                }

                // Handle Bold: **Text**
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
                }

                return <span key={i}>{part}</span>;
            })}
        </>
    );
};

// --- Custom Video Component (from LifeGallery) ---
const VideoCard = ({ src, poster, caption, playbackRate = 1.0 }: { src: string, poster?: string, caption?: string, playbackRate?: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [showControls, setShowControls] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Apply playback rate whenever it changes or video renders
    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
            videoRef.current.volume = volume;
        }
    }, [playbackRate]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
                // Re-apply playback rate on play to be safe
                videoRef.current.playbackRate = playbackRate;
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekValue = parseFloat(e.target.value);
        if (videoRef.current) {
            const duration = videoRef.current.duration;
            videoRef.current.currentTime = (seekValue / 100) * duration;
            setProgress(seekValue);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volValue = parseFloat(e.target.value);
        setVolume(volValue);
        if (videoRef.current) {
            videoRef.current.volume = volValue;
            setIsMuted(volValue === 0);
        }
    };

    return (
        <div
            className="group relative rounded-2xl overflow-hidden bg-black shadow-md border border-border/50"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    className="w-full h-full object-contain"
                    loop
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                    onEnded={() => setIsPlaying(false)}
                />

                {/* Center Play Button Overlay */}
                {!isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer"
                        onClick={togglePlay}
                    >
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg border border-white/30">
                            <Play fill="white" className="text-white ml-1" size={32} />
                        </div>
                    </div>
                )}

                {/* Custom Controls Bar */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isPlaying || showControls ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Progress Bar */}
                    <div className="mb-3 relative group/progress">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={progress}
                            onChange={handleSeek}
                            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer hover:bg-white/50 accent-primary"
                        />
                    </div>

                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="hover:text-primary transition-colors">
                                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                            </button>

                            {/* Volume Control */}
                            <div className="flex items-center gap-2 group/volume">
                                <button onClick={() => setIsMuted(!isMuted)} className="hover:text-primary transition-colors">
                                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                                <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 ease-in-out">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {caption && (
                            <div className="text-xs font-medium opacity-80 backdrop-blur-sm px-2 py-1 rounded-md bg-black/20 truncate max-w-[200px]">
                                {caption}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {caption && (
                <div className="p-3 bg-card border-t border-border/10 text-left text-sm text-muted-foreground">
                    {caption}
                </div>
            )}
        </div>
    );
};

// --- Types ---
interface ProjectMedia {
    type: 'image' | 'video' | 'youtube' | 'pdf';
    url: string;
    caption?: string;
    thumbnail?: string;
    playbackRate?: number;
    layout?: 'grid' | 'stack';
    disableZoom?: boolean;
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
    notice?: string;
}

const iconMap: { [key: string]: any } = { Eye, Brain, Layers, FileText, Car };

const ActivityView = () => {
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
                resultImages: proj.resultImages,
                notice: proj.notice
            } as BaseItem;
        });
    }, []);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 flex flex-col">
            <div className="container-custom flex-1 h-full flex flex-col">

                {/* Header */}
                <motion.header className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Activity</h1>
                    <p className="text-lg text-muted-foreground">Applied engineering and field implementations.</p>
                </motion.header>

                {/* Project List (rendered as full cards) */}
                <div className="space-y-20">
                    {projects.map((selectedItem, index) => {
                        // Extract PDF for Header Display
                        const pdfItem = selectedItem.media?.find(m => m.type === 'pdf');
                        // Filter out PDF from main gallery
                        const displayMedia = selectedItem.media?.filter(m => m.type !== 'pdf') || [];

                        // Helper to group media items by layout
                        const groupMedia = (media: ProjectMedia[]) => {
                            const groups: { layout: 'grid' | 'stack', items: ProjectMedia[] }[] = [];
                            let currentGroup: { layout: 'grid' | 'stack', items: ProjectMedia[] } | null = null;

                            media.forEach(item => {
                                const itemLayout = item.layout || 'stack'; // Default to stack

                                if (currentGroup && currentGroup.layout === itemLayout) {
                                    currentGroup.items.push(item);
                                } else {
                                    if (currentGroup) groups.push(currentGroup);
                                    currentGroup = { layout: itemLayout, items: [item] };
                                }
                            });

                            if (currentGroup) groups.push(currentGroup);
                            return groups;
                        };

                        const mediaGroups = groupMedia(displayMedia);

                        return (
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
                                            <div className="flex flex-wrap gap-3 items-center">
                                                {selectedItem.year && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                                                        <Calendar size={14} className="mr-2" /> {selectedItem.year}
                                                    </span>
                                                )}
                                                {/* @ts-ignore */}
                                                {selectedItem.itemData?.organizations && selectedItem.itemData.organizations.map((org: any, idx: number) => (
                                                    <a
                                                        key={idx}
                                                        href={org.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/50 hover:bg-secondary text-secondary-foreground border border-border/50 transition-colors"
                                                    >
                                                        {org.name} <ExternalLink size={12} className="ml-2 opacity-50" />
                                                    </a>
                                                ))}
                                                {selectedItem.role && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                                                        {selectedItem.role}
                                                    </span>
                                                )}
                                                {/* PDF Header Button - Moved to the Right */}
                                                {pdfItem && (
                                                    <a
                                                        href={resolveAssetUrl(pdfItem.url)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm ml-auto"
                                                    >
                                                        {pdfItem.caption || "View Paper"} <ExternalLink size={12} className="ml-2" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Notice Section (Added above Overview) */}
                                        {selectedItem.notice && (
                                            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl text-yellow-600 dark:text-yellow-400">
                                                <div className="flex items-start gap-3">
                                                    <div className="shrink-0 mt-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                                    </div>
                                                    <div className="text-sm font-medium leading-relaxed">
                                                        <RichTextRenderer text={selectedItem.notice} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content Body (Moved ABOVE Media) */}
                                        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-12 border-b border-border/50 pb-8">
                                            <h3 className="text-2xl font-bold mb-6">Overview</h3>
                                            <RichTextRenderer text={selectedItem.abstract || selectedItem.description} />
                                        </div>

                                        {/* Media Gallery */}
                                        {displayMedia.length > 0 && (
                                            <div>
                                                <h3 className="text-2xl font-bold mb-6">Team 'S.D.S' Activities</h3>
                                                <div className="space-y-8">
                                                    {mediaGroups.map((group, groupIdx) => (
                                                        <div key={groupIdx}>
                                                            {group.layout === 'grid' ? (
                                                                // GRID LAYOUT
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                                                                    {group.items.map((media, idx) => (
                                                                        <div key={`grid-${groupIdx}-${idx}`} className="flex flex-col rounded-xl overflow-hidden border border-border shadow-sm bg-white group h-full">
                                                                            <div className="flex-1 flex items-center justify-center bg-white p-2 min-h-[200px]">
                                                                                <img
                                                                                    src={resolveAssetUrl(media.url)}
                                                                                    alt={media.caption || "Project Image"}
                                                                                    className={`max-w-full max-h-full object-contain transition-transform duration-500 ${media.disableZoom ? '' : 'group-hover:scale-105'}`}
                                                                                />
                                                                            </div>
                                                                            {media.caption && (
                                                                                <div className="p-3 text-left text-sm text-foreground bg-secondary/50 border-t border-border/10">
                                                                                    {media.caption}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                // STACK LAYOUT
                                                                <div className="space-y-8">
                                                                    {group.items.map((media, idx) => (
                                                                        <div key={`stack-${groupIdx}-${idx}`}>
                                                                            {media.type === 'youtube' && (
                                                                                <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-black/5">
                                                                                    <div className="aspect-video">
                                                                                        <iframe
                                                                                            width="100%" height="100%"
                                                                                            src={media.url.replace("watch?v=", "embed/").split("&")[0]}
                                                                                            title={media.caption || `Video ${idx + 1}`}
                                                                                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                                                                                        ></iframe>
                                                                                    </div>
                                                                                    {media.caption && (
                                                                                        <div className="p-4 text-left text-sm text-muted-foreground bg-secondary/30 border-t border-border/10">
                                                                                            {media.caption}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                            {media.type === 'video' && (
                                                                                <VideoCard
                                                                                    src={resolveAssetUrl(media.url)}
                                                                                    caption={media.caption}
                                                                                    playbackRate={media.playbackRate}
                                                                                />
                                                                            )}
                                                                            {media.type === 'image' && (
                                                                                <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-white">
                                                                                    <div className="w-full flex justify-center p-1 bg-white">
                                                                                        <img
                                                                                            src={resolveAssetUrl(media.url)}
                                                                                            alt={media.caption || "Project Slide"}
                                                                                            className="w-full h-auto object-contain rounded-xl"
                                                                                        />
                                                                                    </div>
                                                                                    {media.caption && (
                                                                                        <div className="p-4 text-left text-sm text-muted-foreground bg-secondary/30 border-t border-border/10">
                                                                                            {media.caption}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Links */}
                                        {selectedItem.links && selectedItem.links.length > 0 && (
                                            <div className="flex gap-4 pt-6 mt-8 border-t border-border justify-center md:justify-start">
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ActivityView;
