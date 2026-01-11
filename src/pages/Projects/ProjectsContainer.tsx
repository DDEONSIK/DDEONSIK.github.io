import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlayCircle, Building2, Factory } from 'lucide-react';
import govProjectsRaw from '@/data/projects/gov.json';
import industryProjectsRaw from '@/data/projects/industry.json';
import { Project } from '@/types/Project';
import ProjectsView from '@/pages/Projects/ProjectsView';

// JSON 데이터 타입 단언
const govProjects = govProjectsRaw as Project[];
const industryProjects = industryProjectsRaw as Project[];

// 모든 프로젝트 병합
const allProjects = [...govProjects, ...industryProjects];

const ITEMS_PER_PAGE = 15;
const PAGE_BLOCK_SIZE = 5;

type TabCategory = 'ongoing' | 'completed-gov' | 'completed-industry';

const ProjectsContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabCategory>('ongoing');
    const [currentPage, setCurrentPage] = useState(1);

    const tabs: { id: TabCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'ongoing', label: 'Ongoing', icon: <PlayCircle size={18} /> },
        { id: 'completed-gov', label: 'Completed [Gov]', icon: <Building2 size={18} /> },
        { id: 'completed-industry', label: 'Completed [Industry]', icon: <Factory size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area && ['ongoing', 'completed-gov', 'completed-industry'].includes(area)) {
            setActiveTab(area as TabCategory);
            setCurrentPage(1);
        }
    }, [location]);

    const handleTabClick = (id: TabCategory) => {
        setActiveTab(id);
        navigate(`/projects?area=${id}`);
    };

    // Filter Items by Category & Completion Status
    const filteredItems = useMemo(() => {
        return allProjects.filter(item => {
            // 1. Ongoing: 완료되지 않은 프로젝트 (isCompleted: false)
            if (activeTab === 'ongoing') {
                return item.isCompleted === false;
            }
            
            // 2. Completed [Gov]: 완료됨(true) AND 타입이 government
            if (activeTab === 'completed-gov') {
                return item.isCompleted === true && item.type === 'government';
            }
            
            // 3. Completed [Industry]: 완료됨(true) AND 타입이 industry
            if (activeTab === 'completed-industry') {
                return item.isCompleted === true && item.type === 'industry';
            }

            return false;
        });
    }, [activeTab]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };

    // Pagination Block Calculations
    const currentBlockStart = Math.floor((currentPage - 1) / PAGE_BLOCK_SIZE) * PAGE_BLOCK_SIZE + 1;
    const currentBlockEnd = Math.min(totalPages, currentBlockStart + PAGE_BLOCK_SIZE - 1);
    const pageNumbers = Array.from({ length: currentBlockEnd - currentBlockStart + 1 }, (_, i) => currentBlockStart + i);

    return (
        <ProjectsView
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={handleTabClick}
            paginatedItems={paginatedItems}
            filteredItemsLength={filteredItems.length}
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPageChange={handlePageChange}
        />
    );
};

export default ProjectsContainer;