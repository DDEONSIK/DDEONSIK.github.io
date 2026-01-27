
import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Layers, Eye, Brain, ChevronLeft, Calendar, FileText, ArrowUp, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data Loading ---
const projectFiles = import.meta.glob('../../data/projects/*.json', { eager: true });
const allProjectData = Object.values(projectFiles).map((mod: any) => mod.default);

// Filter: Only Publications (Not Engineering Projects)
const publicationsData = allProjectData
    .filter((item: any) => item.category !== 'Engineering Projects')
    .sort((a: any, b: any) => (Number(b.year) || 0) - (Number(a.year) || 0));

// Load project assets dynamically
const projectAssets = import.meta.glob(['@/assets/project/*.{png,jpg,jpeg,webp}'], { eager: true });

const resolveAssetUrl = (url: string) => {
    if (!url.startsWith('/assets/project/')) return url;
    const filename = url.split('/').pop();
    const parsedKey = Object.keys(projectAssets).find(k => k.endsWith('/' + filename));
    return parsedKey ? (projectAssets[parsedKey] as any).default : url;
};

// Helper to strip markdown for preview cards
const stripMarkdown = (text: string) => {
    if (!text) return "";
    let clean = text.replace(/^[•-]\s*/gm, '');
    clean = clean.replace(/(\*\*|__)(.*?)\1/g, '$2');
    clean = clean.replace(/(\*|_)(.*?)\1/g, '$2');
    return clean.split('\n').map(l => l.trim()).filter(Boolean).join(' • ');
};

// Helper for rendering text with bold (**text**) and bullet points
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
    table?: { caption: string; columns: string[]; rows: string[][]; highlightRowIndex?: number; };
    tables?: { caption: string; columns?: string[]; headerRows?: { label: string; colSpan?: number; rowSpan?: number; rotated?: boolean; className?: string }[][]; rows: string[][]; highlightRowIndex?: number; }[];
    resultImages?: { url: string; caption?: string; }[];
    details?: { organization?: string; venue?: string; doi?: string; type?: 'journal' | 'conference' | 'project'; };
    itemData?: any;
}

// Reuse icon map
const iconMap: { [key: string]: any } = { Eye, Brain, Layers, FileText, Car };

const PublicationsView = () => {
    // Default selection only if screen is large? No, let's keep it null initially so "List" is full width on mobile/tablet until click.
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // --- Data Processing ---
    const { msResearch, bsResearch } = useMemo(() => {
        const pubs = publicationsData.map((pub: any) => ({
            id: pub.id || pub.title,
            title: pub.title,
            title_translated: pub.title_translated,
            description: pub.short_description || pub.abstract || "Abstract ...",
            abstract: pub.abstract,
            category: "Research",
            year: pub.year,
            icon: "FileText",
            role: pub.role,
            itemData: pub,
            media: pub.media || [],
            table: pub.table,
            tables: pub.tables,
            resultImages: pub.resultImages,
            details: {
                organization: pub.publisher,
                venue: pub.venue,
                doi: pub.doi,
                type: pub.category === 'international-journal' ? 'journal' : 'conference'
            },
            links: pub.URL ? [{ url: pub.URL, label: "View Paper" }] : []
        })) as BaseItem[];

        const ms = pubs.filter(p => (Number(p.year) || 0) >= 2024).sort((a, b) => {
            if (a.title.includes("ViewFormer") && b.title.includes("UniAD")) return -1;
            if (a.title.includes("UniAD") && b.title.includes("ViewFormer")) return 1;
            return 0;
        });
        const bs = pubs.filter(p => (Number(p.year) || 0) < 2024);

        return { msResearch: ms, bsResearch: bs };
    }, []);

    const allItems = useMemo(() => [...msResearch, ...bsResearch], [msResearch, bsResearch]);
    const selectedItem = useMemo(() => allItems.find(i => i.id === selectedId), [selectedId, allItems]);

    const handleItemClick = (id: string) => {
        setSelectedId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setSelectedId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Publications</h1>
                    <p className="text-lg text-muted-foreground">
                        Research contributions in 3D Computer Vision and Autonomous Systems.
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
                            <div>
                                <Section title="M.S." items={msResearch} onClick={handleItemClick} selectedId={selectedId} subSection />
                                <Section title="B.S." items={bsResearch} onClick={handleItemClick} selectedId={selectedId} subSection />
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
                                        <div className="mb-6">
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                                {(() => {
                                                    const Icon = iconMap[selectedItem.icon || "Layers"] || Layers;
                                                    return <Icon size={32} />;
                                                })()}
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="text-3xl font-heading font-bold mb-2 leading-tight">{selectedItem.title}</h2>
                                            {selectedItem.title_translated && (
                                                <h3 className="text-xl text-muted-foreground font-medium mb-4">{selectedItem.title_translated}</h3>
                                            )}

                                            {/* Author */}
                                            {selectedItem.itemData?.author && (
                                                <div className="mb-4 text-lg text-foreground/80 flex flex-wrap items-center gap-2">
                                                    <span className="font-semibold text-muted-foreground mr-1">Authors:</span>
                                                    <span>
                                                        {(() => {
                                                            const authorText = selectedItem.itemData.author;
                                                            const parts = authorText.split(/(\*\*.*?\*\*)/g);
                                                            return parts.map((part: string, i: number) => {
                                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                                    return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
                                                                }
                                                                return <span key={i}>{part}</span>;
                                                            });
                                                        })()}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Meta Tags */}
                                            <div className="flex flex-wrap gap-3 mb-6 items-center">
                                                {selectedItem.itemData?.language && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                        {selectedItem.itemData.language}
                                                    </span>
                                                )}
                                                {selectedItem.year && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                        <Calendar size={12} className="mr-1" /> {selectedItem.year}
                                                    </span>
                                                )}
                                                {selectedItem.details?.venue && (!selectedItem.itemData?.organizations || selectedItem.itemData.organizations.length === 0) && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                        {selectedItem.details.venue}
                                                    </span>
                                                )}

                                                {selectedItem.itemData?.organizations && selectedItem.itemData.organizations.length > 0 ? (
                                                    selectedItem.itemData.organizations.map((org: any, idx: number) => (
                                                        <a key={idx} href={org.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                                            {org.name} <ExternalLink size={10} className="ml-1 opacity-50" />
                                                        </a>
                                                    ))
                                                ) : (
                                                    selectedItem.role && (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                            {selectedItem.role}
                                                        </span>
                                                    )
                                                )}

                                                {(selectedItem.details?.doi || (selectedItem.links && selectedItem.links.length > 0)) && (
                                                    <a
                                                        href={selectedItem.details?.doi ? `https://doi.org/${selectedItem.details.doi}` : selectedItem.links?.[0]?.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ml-auto shadow-sm"
                                                    >
                                                        {selectedItem.category === "Research" ? "View Paper" : "View Link"} <ExternalLink size={12} className="ml-1" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Media Gallery (Carousel/Stack) */}
                                        {selectedItem.media && selectedItem.media.length > 0 && (
                                            <div className="mb-8 space-y-4">
                                                {selectedItem.media.map((media, idx) => (
                                                    <div key={idx} className="rounded-xl overflow-hidden border border-border shadow-sm bg-white">
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
                                                            <div className="flex justify-center bg-white p-2">
                                                                <img src={resolveAssetUrl(media.url)} alt={media.caption || "Project Image"} className="max-w-full h-auto object-contain" />
                                                            </div>
                                                        )}
                                                        {media.caption && (
                                                            <div className="p-3 text-left text-sm text-foreground bg-secondary/50 border-t border-border/10">
                                                                {media.caption}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                                            <h3 className="text-xl font-bold mb-4">
                                                {(selectedItem.abstract || selectedItem.description).includes('•') ? 'Key Contributions' : (selectedItem.category === 'Research' ? 'Abstract' : 'Overview')}
                                            </h3>
                                            <RichTextRenderer text={selectedItem.abstract || selectedItem.description} />

                                            {/* Academic Table Section */}
                                            {(selectedItem.table || (selectedItem.tables && selectedItem.tables.length > 0)) && (
                                                <div className="mt-12 mb-8">
                                                    <h3 className="text-xl font-bold mb-4">Quantitative Results</h3>
                                                    {(selectedItem.tables || [selectedItem.table]).map((tableData, tIdx) => (
                                                        tableData ? (
                                                            <div key={tIdx} className="mb-8 last:mb-0">
                                                                {tableData.caption && <p className="mb-3 text-sm text-foreground font-medium text-left">{tableData.caption}</p>}
                                                                <div className="overflow-x-auto rounded-lg border border-border shadow-sm bg-card">
                                                                    <table className="w-full text-sm text-center">
                                                                        <thead className="text-xs text-muted-foreground bg-secondary/50 border-b border-border">
                                                                            {tableData.headerRows ? (
                                                                                tableData.headerRows.map((headerRow, hrIdx) => (
                                                                                    <tr key={hrIdx}>
                                                                                        {headerRow.map((hCol, hcIdx) => (
                                                                                            <th key={hcIdx} colSpan={hCol.colSpan || 1} rowSpan={hCol.rowSpan || 1} className={`px-4 py-3 font-semibold border-r border-border/50 last:border-r-0 ${hCol.rotated ? 'h-48 align-middle' : 'whitespace-nowrap'} ${hCol.rowSpan && hCol.rowSpan > 1 ? 'align-middle border-b border-border/50' : ''} ${hCol.className || ''} ${hcIdx === 0 && hrIdx === 0 && !hCol.colSpan ? 'text-left' : ''}`}>
                                                                                                {hCol.rotated ? <div className="flex items-center justify-center h-full w-4 mx-auto"><div className="whitespace-nowrap transform -rotate-90 origin-center">{hCol.label}</div></div> : hCol.label}
                                                                                            </th>
                                                                                        ))}
                                                                                    </tr>
                                                                                ))
                                                                            ) : (
                                                                                <tr>
                                                                                    {tableData.columns?.map((col, idx) => (
                                                                                        <th key={idx} className={`px-4 py-3 font-semibold whitespace-nowrap ${idx === 0 ? 'text-left' : 'text-center'}`}>{col}</th>
                                                                                    ))}
                                                                                </tr>
                                                                            )}
                                                                        </thead>
                                                                        <tbody>
                                                                            {tableData.rows.map((row, rIdx) => (
                                                                                <tr key={rIdx} className={`border-b last:border-0 border-border/50 transition-colors ${tableData.highlightRowIndex === rIdx ? 'bg-primary/10 font-medium' : 'hover:bg-muted/50'}`}>
                                                                                    {row.map((cell, cIdx) => (
                                                                                        <td key={cIdx} className={`px-4 py-3 whitespace-nowrap text-foreground ${cIdx === 0 ? 'text-left' : 'text-center'}`}>
                                                                                            {(() => {
                                                                                                const parts = cell.split(/(<u>.*?<\/u>|\*\*.*?\*\*)/g);
                                                                                                return parts.map((part, i) => {
                                                                                                    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
                                                                                                    if (part.startsWith('<u>') && part.endsWith('</u>')) {
                                                                                                        const content = part.slice(3, -4);
                                                                                                        if (content.startsWith('**') && content.endsWith('**')) return <u key={i} className="decoration-gray-500 decoration-2 underline-offset-2"><strong className="font-bold">{content.slice(2, -2)}</strong></u>;
                                                                                                        return <u key={i} className="decoration-gray-500 decoration-2 underline-offset-2">{content}</u>;
                                                                                                    }
                                                                                                    return part;
                                                                                                });
                                                                                            })()}
                                                                                        </td>
                                                                                    ))}
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        ) : null
                                                    ))}
                                                </div>
                                            )}

                                            {/* Representative Results */}
                                            {selectedItem.resultImages && selectedItem.resultImages.length > 0 && (
                                                <div className="mt-12 mb-8">
                                                    <h3 className="text-xl font-bold mb-4">Representative Results</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                                                        {selectedItem.resultImages.map((img, idx) => (
                                                            <div key={idx} className="flex flex-col rounded-xl overflow-hidden border border-border shadow-sm bg-white group h-full">
                                                                <div className="flex-1 flex items-center justify-center bg-white p-2 min-h-[200px]">
                                                                    <img src={resolveAssetUrl(img.url)} alt={img.caption || "Result Image"} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                                                                </div>
                                                                {img.caption && (
                                                                    <div className="p-3 text-left text-sm text-foreground bg-secondary/50 border-t border-border/10">
                                                                        {img.caption}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button onClick={() => { DetailContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="absolute bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:translate-y-[-2px] transition-transform z-10" title="Scroll to Top">
                                        <ArrowUp size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

// --- Sub Component ---
const Section = ({ title, items, onClick, selectedId, subSection = false }: { title: string, items: BaseItem[], onClick: (id: string) => void, selectedId: string | null, subSection?: boolean }) => {
    if (items.length === 0) return null;
    return (
        <div className="mb-6 last:mb-0">
            {title && <h3 className={`font-bold mb-3 pl-2 border-l-4 border-primary text-foreground ${subSection ? 'text-lg' : 'text-xl'}`}>{title}</h3>}
            <div className="space-y-3">
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => onClick(item.id)}
                        className={`group cursor-pointer p-5 rounded-xl border transition-all duration-200 ${selectedId === item.id ? 'bg-primary/5 border-primary shadow-md ring-1 ring-primary' : 'bg-card border-border hover:border-primary/50 hover:shadow-sm'}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className={`font-semibold text-lg mb-1 group-hover:text-primary transition-colors ${selectedId === item.id ? 'text-primary' : ''}`}>{item.title}</h4>
                                <div className="text-sm text-muted-foreground line-clamp-2">{stripMarkdown(item.description)}</div>
                            </div>
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

export default PublicationsView;
