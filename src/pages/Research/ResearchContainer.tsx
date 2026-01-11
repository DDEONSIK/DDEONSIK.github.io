import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import researchDataJson from '@/data/research.json';
import { ResearchTopic } from '@/types/Research';
import ResearchView from '@/pages/Research/ResearchView';

const researchData = researchDataJson as ResearchTopic[];

const ResearchContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(researchData[0].id);

    // Sync active tab with URL query param ?area=...
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const areaParam = params.get('area');

        if (areaParam) {
            const exists = researchData.find(item => item.id === areaParam);
            if (exists) {
                setActiveId(areaParam);
            }
        } else {
            if (researchData.length > 0 && !activeId) {
                setActiveId(researchData[0].id);
            }
        }

        window.scrollTo(0, 0);
    }, [location]);

    const activeItem = researchData.find(r => r.id === activeId) || researchData[0];

    const handleTabClick = (id: string) => {
        // Update URL, let useEffect sync the state
        navigate(`?area=${id}`);
    };

    // Prepare tabs for SmoothTabs
    const tabs = researchData.map(item => ({
        id: item.id,
        label: item.title
    }));

    return (
        <ResearchView
            tabs={tabs}
            activeId={activeId}
            onTabChange={handleTabClick}
            activeItem={activeItem}
        />
    );
};

export default ResearchContainer;
