import React from 'react';
import { motion } from 'framer-motion';
import './SmoothTabs.css';

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface SmoothTabsProps {
    tabs: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    layoutIdPrefix?: string; // To avoid ID collisions if multiple tab groups exist
    className?: string;
}

const SmoothTabs: React.FC<SmoothTabsProps> = ({ tabs, activeId, onChange, layoutIdPrefix = 'tab', className }) => {
    return (
        <div className={`tabs-wrapper ${className ?? 'mb-12'}`}>
            <div className="tabs-container">
                {tabs.map((tab) => {
                    const isActive = activeId === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`group tab-button ${isActive ? 'tab-button-active' : 'tab-button-inactive'}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId={`${layoutIdPrefix}-active-pill`}
                                    className="tab-active-pill"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {tab.icon && (
                                <span className={`tab-icon ${isActive ? 'tab-icon-active' : 'tab-icon-inactive'}`}>
                                    {tab.icon}
                                </span>
                            )}
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SmoothTabs;
