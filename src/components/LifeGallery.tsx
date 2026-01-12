import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import europe2 from '@/assets/life/life_travel_to_Europe2.jpg';
import study2 from '@/assets/life/life_study2.jpg';
import study3 from '@/assets/life/life_study3.jpg';
import vacation2 from '@/assets/life/life_vacation2.jpg';
import vacation3 from '@/assets/life/life_vacation3.jpg';
import vacation4 from '@/assets/life/life_vacation4.jpg';
import vacation5 from '@/assets/life/life_vacation5.jpg';
import vacation6 from '@/assets/life/life_vacation6.jpg';
import vacation7 from '@/assets/life/life_vacation7.jpg';
import bike4 from '@/assets/life/life_bike4.jpg';
import bike5 from '@/assets/life/life_bike5.jpg';
import bike6 from '@/assets/life/life_bike6.jpg';
import bike7 from '@/assets/life/life_bike7.jpg';
import bike8 from '@/assets/life/life_bike8.jpg';
import bike9 from '@/assets/life/life_bike9.jpg';
import parttime2 from '@/assets/life/life_part-time_job2.jpg';
import parttime3 from '@/assets/life/life_part-time_job3.jpg';
import bicycle1 from '@/assets/life/life_bicycle1.jpg';
import bicycle2 from '@/assets/life/life_bicycle2.jpg';

const lifeImages = [
    { src: study0, name: 'Research Lab' },
    { src: vacation1, name: 'Summer Break' },
    { src: bike1, name: 'Riding' },
    { src: europe1, name: 'Europe Trip' },
    { src: study1, name: 'Late Night Coding' },
    { src: vacation0, name: 'Weekend Getaway' },
    { src: bike2, name: 'Mountain Biking' },
    { src: parttime1, name: 'Part Time' },
    { src: europe2, name: 'Europe Architecture' },
    { src: study2, name: 'Deep Learning Study' },
    { src: study3, name: 'Lab Meeting' },
    { src: vacation2, name: 'Beach Sunset' },
    { src: vacation3, name: 'Hiking View' },
    { src: vacation4, name: 'Camping' },
    { src: vacation5, name: 'Road Trip' },
    { src: vacation6, name: 'City Lights' },
    { src: vacation7, name: 'Food Tour' },
    { src: bike4, name: 'Trail Riding' },
    { src: bike5, name: 'Bike Maintenance' },
    { src: bike6, name: 'Cycling Crew' },
    { src: bike7, name: 'Uphill Challenge' },
    { src: bike8, name: 'Downhill Rush' },
    { src: bike9, name: 'Race Day' },
    { src: parttime2, name: 'Cafe Work' },
    { src: parttime3, name: 'Teaching Assistant' },
    { src: bicycle1, name: 'My Bike' },
    { src: bicycle2, name: 'Night Ride' },
];

const LifeGallery = () => {

    return (
        <section id="life-gallery" className="py-24 bg-background min-h-screen">
            <div className="container-custom px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                        Life & Moments
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        Casual snapshots of my journey around the world.
                    </p>
                </div>

                {/* Modern Casual Masonry Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4">
                    {lifeImages.map((img, index) => (
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
                                    src={img.src}
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
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-sm text-muted-foreground tracking-widest uppercase">
                        - Work Hard, Play Hard -
                    </p>
                </div>

            </div>
        </section>
    );
};

export default LifeGallery;
