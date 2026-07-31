import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import lifeData from '@/data/life.json';

// --- Data Loading ---
const mediaGlob = import.meta.glob(['@/assets/life/*.{webp,mp4,webm}'], { eager: true });

// --- Custom Video Component (Zero Cropping & fluid ratio to prevent black letterboxes) ---
const VideoCard = ({
    src,
    poster,
    name,
    index
}: {
    src: string;
    poster?: string;
    name: string;
    index: number;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [showControls, setShowControls] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.5, delay: index * 0.01 }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            className="relative w-full rounded-xl overflow-hidden cursor-pointer shadow-sm mb-4 flex items-center justify-center"
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-auto block rounded-xl"
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Center Play Button Overlay */}
            {!isPlaying && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 z-10"
                    onClick={togglePlay}
                >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30">
                        <Play fill="white" className="text-white ml-0.5" size={20} />
                    </div>
                </div>
            )}

            {/* Custom Controls Bar */}
            <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-20 ${isPlaying || showControls ? 'opacity-100' : 'opacity-0'}`}>
                {/* Progress Bar */}
                <div className="mb-2 relative group/progress">
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
                    <div className="flex items-center gap-3">
                        <button onClick={togglePlay} className="hover:text-primary transition-colors">
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        </button>

                        {/* Volume Control */}
                        <div className="flex items-center gap-2 group/volume">
                            <button onClick={() => setIsMuted(!isMuted)} className="hover:text-primary transition-colors">
                                {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>
                            <div className="w-0 overflow-hidden group-hover/volume:w-16 transition-all duration-300 ease-in-out">
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

                    <div className="text-[10px] font-medium opacity-80 backdrop-blur-sm px-1.5 py-0.5 rounded bg-black/20">
                        {name}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Custom Image Component (Zero Cropping & Pre-reserved Aspect Ratio) ---
const ImageCard = ({
    src,
    name,
    index,
    width,
    height
}: {
    src: string;
    name: string;
    index: number;
    width?: number;
    height?: number;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const style = (width && height) ? { aspectRatio: `${width} / ${height}` } : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.5, delay: index * 0.01 }}
            className="relative w-full rounded-xl overflow-hidden cursor-pointer shadow-sm mb-4 group flex items-center justify-center bg-secondary/10"
            style={style}
        >
            {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted rounded-xl" />}
            <img
                src={src}
                alt={name}
                onLoad={() => setIsLoaded(true)}
                className="w-full h-full object-contain block rounded-xl"
                loading="lazy"
            />

            {/* Modern Gradient Overlay & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none z-10">
                <p className="text-white font-semibold text-xs tracking-wide transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    {name}
                </p>
            </div>
        </motion.div>
    );
};

// --- Custom Hook for Responsive Columns (Up to 5 Columns) ---
const useColumns = () => {
    const [cols, setCols] = useState(5);

    useEffect(() => {
        const updateCols = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCols(2); // Mobile: 2 columns
            } else if (width < 1024) {
                setCols(3); // Tablet: 3 columns
            } else if (width < 1280) {
                setCols(4); // Laptops: 4 columns
            } else {
                setCols(5); // Desktops: 5 columns
            }
        };

        updateCols();
        window.addEventListener('resize', updateCols);
        return () => window.removeEventListener('resize', updateCols);
    }, []);

    return cols;
};

const LifeGallery = () => {
    const cols = useColumns();

    // Map media paths
    const mediaMap = useMemo(() => {
        const paths: { [key: string]: string } = {};
        Object.entries(mediaGlob).forEach(([key, value]: [string, any]) => {
            const filename = key.split('/').pop() || '';
            paths[filename] = value.default;
        });
        return paths;
    }, []);

    // Distribute images to columns using a Height-Balanced Greedy Algorithm
    const columnsData = useMemo(() => {
        const columns = Array.from({ length: cols }, () => [] as typeof lifeData.images);
        const colHeights = Array(cols).fill(0);

        lifeData.images.forEach((item: any, idx: number) => {
            // Compute real physical aspect ratio of the item (height / width)
            // For videos, since the metadata might be oriented differently (e.g. 1920x1080 on a portrait video),
            // we default to an average aspect of 1.4 for layout balancing to prevent mismatch before load.
            const isVideo = item.file.toLowerCase().endsWith('.mp4') || item.file.toLowerCase().endsWith('.webm');
            let aspect = 1;
            if (isVideo) {
                // If it's a known portrait video, or default to 1.77 height factor
                aspect = (item.file.includes('vacation2') || item.file.includes('Japan')) ? 1.77 : 0.56;
            } else {
                aspect = (item.width && item.height) ? (item.height / item.width) : 1;
            }

            if (idx < 2) {
                // Keep Graduate1 and Graduate2 on col 0 and 1 top respectively
                const targetCol = idx % cols;
                columns[targetCol].push(item);
                colHeights[targetCol] += aspect;
            } else {
                // Find column with the minimum height
                let minColIdx = 0;
                let minHeight = colHeights[0];
                for (let i = 1; i < cols; i++) {
                    if (colHeights[i] < minHeight) {
                        minHeight = colHeights[i];
                        minColIdx = i;
                    }
                }
                columns[minColIdx].push(item);
                colHeights[minColIdx] += aspect;
            }
        });
        return columns;
    }, [cols]);

    // Resolve Tailwind dynamic grid column classes to prevent CSS grid breakages
    const gridColsClass = useMemo(() => {
        if (cols === 2) return 'grid-cols-2';
        if (cols === 3) return 'grid-cols-3';
        if (cols === 4) return 'grid-cols-4';
        return 'grid-cols-5';
    }, [cols]);

    return (
        <section id="life-gallery" className="py-24 bg-background min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground animate-fade-in">
                        {lifeData.title}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        {lifeData.description}
                    </p>

                    {/* Intro Lines */}
                    {lifeData.introLines && (
                        <div className="max-w-6xl mx-auto mb-12 space-y-1">
                            {lifeData.introLines.map((line: string, idx: number) => (
                                <p key={idx} className="text-muted-foreground font-medium text-sm sm:text-base">
                                    {line}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pure CSS Responsive Grid (Horizontal Order, Native Shape, zero crop) */}
                <div className={`grid ${gridColsClass} gap-4 p-4`}>
                    {columnsData.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col">
                            {col.map((item) => {
                                const index = lifeData.images.findIndex((img: any) => img.id === item.id);
                                const mediaSrc = mediaMap[item.file];
                                const posterSrc = item.poster ? mediaMap[item.poster] : undefined;

                                if (!mediaSrc) return null;

                                const isVideo = item.file.toLowerCase().endsWith('.mp4') || item.file.toLowerCase().endsWith('.webm');

                                if (isVideo) {
                                    return (
                                        <VideoCard
                                            key={item.id}
                                            src={mediaSrc}
                                            poster={posterSrc}
                                            name={item.name}
                                            index={index}
                                        />
                                    );
                                }

                                return (
                                    <ImageCard
                                        key={item.id}
                                        src={mediaSrc}
                                        name={item.name}
                                        index={index}
                                        width={item.width}
                                        height={item.height}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-sm text-muted-foreground tracking-widest uppercase">
                        {lifeData.footerQuote}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LifeGallery;
