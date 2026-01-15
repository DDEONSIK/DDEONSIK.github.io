import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import lifeData from '@/data/life.json';

// Dynamic Import for all supported media types
const mediaGlob = import.meta.glob(['@/assets/life/*.{webp,mp4}'], { eager: true });

// --- Custom Video Component ---
const VideoCard = ({ src, name, index }: { src: string, name: string, index: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showControls, setShowControls] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

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
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform translate-z-0 bg-black cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className="relative w-full overflow-hidden" style={{ minHeight: '200px' }}>
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-auto object-cover"
                    loop
                    muted={isMuted} // Controlled by volume, but initial mute helps autoplay policy if needed (though we use explicit click)
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                    onEnded={() => setIsPlaying(false)}
                />

                {/* Center Play Button Overlay */}
                {!isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
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

                        <div className="text-xs font-medium opacity-80 backdrop-blur-sm px-2 py-1 rounded-md bg-black/20">
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


const LifeGallery = () => {
    const mediaMap = useMemo(() => {
        const map: { [key: string]: string } = {};
        for (const path in mediaGlob) {
            const filename = path.split('/').pop();
            if (filename) {
                map[filename] = (mediaGlob[path] as any).default;
            }
        }
        return map;
    }, []);

    return (
        <section id="life-gallery" className="py-24 bg-background min-h-screen">
            <div className="container-custom px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                        {lifeData.title}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        {lifeData.description}
                    </p>
                </div>

                {/* Modern Casual Masonry Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4">
                    {lifeData.images.map((item, index) => {
                        const mediaSrc = mediaMap[item.file];
                        if (!mediaSrc) return null;

                        const isVideo = item.file.toLowerCase().endsWith('.mp4');

                        if (isVideo) {
                            return <VideoCard key={item.id} src={mediaSrc} name={item.name} index={index} />;
                        }

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "50px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform translate-z-0"
                            >
                                {/* Image Wrapper for Zoom */}
                                <div className="overflow-hidden">
                                    <img
                                        src={mediaSrc}
                                        alt={item.name}
                                        className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Modern Gradient Overlay & Caption */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <p className="text-white font-medium text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {item.name}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
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
