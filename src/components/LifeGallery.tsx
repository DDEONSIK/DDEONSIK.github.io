import React, { useState } from 'react';
import { Camera, Calendar, MapPin } from 'lucide-react';

// Explicit imports for Vite production build compatibility
import study0 from '@/assets/life/life_study0.jpg';
import vacation1 from '@/assets/life/life_vacation1.jpg';
import bike1 from '@/assets/life/life_bike1.jpg';
import europe1 from '@/assets/life/life_travel_to_Europe1.jpg';
import study1 from '@/assets/life/life_study1.jpg';
import vacation0 from '@/assets/life/life_vacation0.jpg';
import bike2 from '@/assets/life/life_bike2.jpg';
import parttime1 from '@/assets/life/life_part-time_job1.jpg';

// Helper to get random-ish year for demo
const getYear = (name: string) => {
    if (name.includes('study')) return '2024';
    if (name.includes('vacation')) return '2023';
    if (name.includes('travel')) return '2022';
    if (name.includes('bike')) return '2021';
    return '2020';
};

const lifeImages = [
    { src: study0, name: 'Research Lab', category: 'Study', year: '2024' },
    { src: vacation1, name: 'Summer Break', category: 'Travel', year: '2023' },
    { src: bike1, name: 'Riding', category: 'Hobby', year: '2022' },
    { src: europe1, name: 'Europe Trip', category: 'Travel', year: '2023' },
    { src: study1, name: 'Late Night Coding', category: 'Study', year: '2024' },
    { src: vacation0, name: 'Weekend Getaway', category: 'Travel', year: '2023' },
    { src: bike2, name: 'Mountain Biking', category: 'Hobby', year: '2021' },
    { src: parttime1, name: 'Part Time', category: 'Work', year: '2020' },
];

const LifeGallery = () => {
    const [selectedYear, setSelectedYear] = useState<string>('All');
    const years = ['All', ...Array.from(new Set(lifeImages.map(img => img.year))).sort().reverse()];

    const filteredImages = selectedYear === 'All'
        ? lifeImages
        : lifeImages.filter(img => img.year === selectedYear);

    return (
        <section id="life-gallery" className="py-24 bg-secondary/10 border-t border-border/50">
            <div className="container-custom max-w-6xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
                        Life & Gallery
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Beyond the code. A glimpse into my journey, hobbies, and adventures.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex justify-center gap-4 mb-12">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${selectedYear === year
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'bg-white border border-border text-muted-foreground hover:bg-secondary/50'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredImages.map((img, index) => (
                        <div key={index} className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50">
                            <img
                                src={img.src}
                                alt={img.name}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-white font-bold text-lg">{img.name}</span>
                                <div className="flex items-center gap-4 text-white/80 text-sm mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {img.year}</span>
                                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">{img.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground italic">
                        "Work hard, Play hard."
                    </p>
                </div>

            </div>
        </section>
    );
};

export default LifeGallery;
