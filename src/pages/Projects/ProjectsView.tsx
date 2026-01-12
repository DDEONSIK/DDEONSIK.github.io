import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Layers, Eye, Brain } from 'lucide-react';
import PublicationsList from '@/components/PublicationsList';

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    techStack: string[];
    role: string;
    icon: React.ReactNode;
    performance?: string;
}

const ProjectsView = () => {
    // Placeholder Data
    const projects: Project[] = [
        {
            id: 'seeground',
            title: 'SeeGround',
            category: '3D Vision',
            description: 'Enhancing 3D Visual Grounding by integrating relational depth text. Solves the ambiguity in depth perception when referring to objects in complex 3D scenes.',
            techStack: ['PyTorch', 'Transformer', 'ScanNet', 'ROS'],
            role: 'Lead Researcher',
            icon: <Eye size={32} />,
            performance: 'SOTA on ScanRefer Benchmark (Top 10%)'
        },
        {
            id: 'uniad-lite',
            title: 'UniAD-Lite',
            category: 'Autonomous Driving',
            description: 'Optimizing the Unified Autonomous Driving (UniAD) architecture for edge deployment. Reduced inference time by 40% while maintaining 95% of planning accuracy.',
            techStack: ['TensorFlow', 'TensorRT', 'NuScenes'],
            role: 'Sole Developer',
            icon: <Brain size={32} />,
            performance: '40% Latency Reduction'
        },
        {
            id: 'viewformer',
            title: 'ViewFormer',
            category: '3D Perception',
            description: 'Multi-view 3D Occupancy Perception network using attention mechanisms to reconstruct dense 3D geometry from spare camera inputs.',
            techStack: ['PyTorch', 'CUDA', 'TouchDesigner'],
            role: 'Co-Author',
            icon: <Layers size={32} />
        }
    ];

    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Autonomous Driving', '3D Vision', '3D Perception'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container-custom">

                {/* Header */}
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Research & Projects</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Bridging the gap between theoretical perception models and real-world vehicle dynamics.
                    </p>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover-card flex flex-col">
                            {/* Card Header (Icon/Image placeholder) */}
                            <div className="h-48 bg-secondary/30 flex items-center justify-center border-b border-border group-hover:bg-secondary/50 transition-colors">
                                <div className="text-muted-foreground group-hover:text-primary transition-colors transform group-hover:scale-110 duration-300">
                                    {project.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{project.category}</div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-muted-foreground mb-6 line-clamp-4 flex-1">
                                    {project.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="px-2 py-1 bg-secondary rounded-md text-xs font-mono text-secondary-foreground">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer Info */}
                                <div className="pt-6 border-t border-border flex justify-between items-center">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Role: <span className="text-foreground">{project.role}</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button className="text-muted-foreground hover:text-primary transition-colors" title="View Code">
                                            <Github size={20} />
                                        </button>
                                        <button className="text-muted-foreground hover:text-primary transition-colors" title="View Details">
                                            <ExternalLink size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Publications Section */}
                <div className="mt-32 pt-16 border-t border-border">
                    <PublicationsList />
                </div>

            </div>
        </div>
    );
};

export default ProjectsView;
