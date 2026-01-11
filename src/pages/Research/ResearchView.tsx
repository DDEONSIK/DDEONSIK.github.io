import React from 'react';
import { Description } from '@/types/Base';
import { ResearchTopic, ResearchIconName } from '@/types/Research';
import { Brain, Network, Cpu, ScanEye, Microscope } from 'lucide-react';
import SmoothTabs from '@/components/SmoothTabs';
import './Research.css';

const IconMap: Record<ResearchIconName, React.ElementType> = {
    Brain,
    Network,
    Cpu,
    ScanEye,
    Microscope
};

interface ResearchViewProps {
    tabs: { id: string; label: string }[];
    activeId: string;
    onTabChange: (id: string) => void;
    activeItem: ResearchTopic;
}

// Recursive component to render structured research description
const DescriptionRenderer = ({ content, level = 0 }: { content: Description; level?: number }) => {
    return (
        <div className={`description-block ${level > 0 ? 'description-block-nested' : ''}`}>
            {content.title && (
                <h3 className={
                    level === 0 ? 'description-title-l0' : 
                    level === 1 ? 'description-title-l1' : 'description-title-base'
                }>
                    {content.title}
                </h3>
            )}

            {/* Image Rendering - Always before text contents */}
            {content.imageUrl && (
                <div className="description-image-container">
                    <img 
                        src={content.imageUrl} 
                        alt={content.imageAlt || content.title || 'Research illustration'} 
                        className="description-image" 
                    />
                    {content.imageAlt && (
                        <p className="description-image-caption">
                            {content.imageAlt}
                        </p>
                    )}
                </div>
            )}
            
            {/* Case 1: content.contents is a string (Paragraph) */}
            {content.contents && typeof content.contents === 'string' && (
                <p className="description-text">
                    {content.contents}
                </p>
            )}

            {/* Case 2: content.contents is an array of strings (List) */}
            {content.contents && Array.isArray(content.contents) && content.contents.length > 0 && typeof content.contents[0] === 'string' && (
                <ul className="description-list">
                    {(content.contents as string[]).map((item, idx) => (
                        <li key={idx} className="description-list-item">
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {/* Case 3: content.contents is an array of objects (Recursive) */}
            {content.contents && Array.isArray(content.contents) && content.contents.length > 0 && typeof content.contents[0] === 'object' && (
                <div className="description-nested-container">
                    {(content.contents as Description[]).map((subContent, idx) => (
                        <DescriptionRenderer key={idx} content={subContent} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const ResearchView: React.FC<ResearchViewProps> = ({ tabs, activeId, onTabChange, activeItem }) => {
    return (
        <div className="research-page">
            <div className="research-container">

                {/* Header */}
                <div className="research-header">
                    <h1 className="research-title">Research Areas</h1>
                    <p className="research-subtitle">
                        Explore our core research topics.
                    </p>
                </div>

                {/* Smooth Tabs */}
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeId}
                    onChange={onTabChange}
                    layoutIdPrefix="research"
                />

                {/* Content Display */}
                <div className="research-content-card">
                    {/* Image Section - Hidden for Research Equipment */}
                    {activeItem.title !== 'Research Equipment' && (
                        <div className="research-hero-image-container">
                            <img
                                key={activeItem.imageUrl} // Key change forces animation re-render
                                src={activeItem.imageUrl}
                                alt={activeItem.title}
                                className="research-hero-image"
                            />
                        </div>
                    )}

                    {/* Text Section */}
                    <div className="research-content-body">
                        <h2 className="research-area-title">{activeItem.title}</h2>

                        {/* Structured Content Renderer */}
                        <div className="research-description-wrapper">
                            {activeItem.description.map((content, idx) => (
                                <DescriptionRenderer key={idx} content={content} />
                            ))}
                        </div>

                        {activeItem.publications && activeItem.publications.length > 0 && (
                            <div className="info-section">
                                <h3 className="info-title">Selected Publications</h3>
                                <ul className="publications-list">
                                    {activeItem.publications.map((pub, idx) => (
                                        <li key={idx} className="publication-item">
                                            <span className="publication-bullet">&bull;</span>
                                            <span className="publication-text">{pub}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResearchView;
