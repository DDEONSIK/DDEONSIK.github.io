import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import lifeData from '@/data/life.json';

// Dynamic Import for "True" Object-Oriented Data Structure
// This automatically loads all .jpg images in the assets/life folder.
// No need to manually import files anymore.
const imagesGlob = import.meta.glob('@/assets/life/*.jpg', { eager: true });

const LifeGallery = () => {

    const imageMap = useMemo(() => {
        const map: { [key: string]: string } = {};
        for (const path in imagesGlob) {
            // Extract filename from path (e.g., "/src/assets/life/life_study0.jpg" -> "life_study0.jpg")
            const filename = path.split('/').pop();
            // Vite's eager glob returns a module with a default export containing the URL
            if (filename) {
                map[filename] = (imagesGlob[path] as any).default;
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
                    {lifeData.images.map((img, index) => {
                        const imageSrc = imageMap[img.file];

                        // If image is missing in folder but exists in JSON, skip or show placeholder. 
                        // Currently skipping to prevent broken UI.
                        if (!imageSrc) return null;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "50px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform translate-z-0"
                            >
                                {/* Image Wrapper for Zoom */}
                                <div className="overflow-hidden">
                                    <img
                                        src={imageSrc}
                                        alt={img.name}
                                        className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Modern Gradient Overlay & Caption */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <p className="text-white font-medium text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {img.name}
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
