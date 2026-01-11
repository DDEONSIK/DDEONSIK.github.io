import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layers, Globe, MapPin } from 'lucide-react';
import publicationsDataJson from '@/data/publication/publications.json';
import { PublicationItem, PublicationCategory } from '@/types/Publication';
import PublicationsView from '@/pages/Publications/PublicationsView';

const publicationsData = publicationsDataJson as PublicationItem[];

const ITEMS_PER_PAGE = 15;
const PAGE_BLOCK_SIZE = 5;

const PublicationsContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<PublicationCategory>('all');

    // Filter State
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const tabs: { id: PublicationCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'all', label: 'All', icon: <Layers size={18} /> },
        { id: 'international-journal', label: 'Int. Journal', icon: <Globe size={18} /> },
        { id: 'international-conference', label: 'Int. Conference', icon: <Globe size={18} /> },
        { id: 'domestic-journal', label: 'Dom. Journal', icon: <MapPin size={18} /> },
        { id: 'domestic-conference', label: 'Dom. Conference', icon: <MapPin size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area && tabs.map(t => t.id).includes(area as PublicationCategory)) {
            setActiveTab(area as PublicationCategory);
            setCurrentPage(1);
        }
    }, [location]);

    const handleTabClick = (id: PublicationCategory) => {
        setActiveTab(id);
        navigate(`/publications?area=${id}`);
    };

    // Extract all unique years
    const allYears = useMemo(() => {
        const years = new Set(publicationsData.map(item => item.year));
        return Array.from(years).sort((a, b) => b - a);
    }, []);

    const toggleYear = (year: number) => {
        setSelectedYears(prev =>
            prev.includes(year)
                ? prev.filter(y => y !== year)
                : [...prev, year]
        );
        setCurrentPage(1);
    };

    const clearFilter = () => {
        setSelectedYears([]);
        setCurrentPage(1);
    };

    // 1. Filter Items
    const filteredItems = useMemo(() => {
        return publicationsData.filter(item => {
            const categoryMatch = activeTab === 'all' || item.category === activeTab;
            const yearMatch = selectedYears.length === 0 || selectedYears.includes(item.year);
            return categoryMatch && yearMatch;
        });
    }, [activeTab, selectedYears]);

    // 2. Pagination Logic
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    // 3. Group Paginated Items by Year
    const groupedItems = useMemo(() => {
        return paginatedItems.reduce((acc, item) => {
            if (!acc[item.year]) acc[item.year] = [];
            acc[item.year].push(item);
            return acc;
        }, {} as Record<number, typeof paginatedItems>);
    }, [paginatedItems]);

    const sortedYearsInPage = Object.keys(groupedItems).map(Number).sort((a, b) => b - a);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Use timeout to ensure scroll happens after render or simply ensure call stack clears
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };

    // Pagination Block Calculations
    const currentBlockStart = Math.floor((currentPage - 1) / PAGE_BLOCK_SIZE) * PAGE_BLOCK_SIZE + 1;
    const currentBlockEnd = Math.min(totalPages, currentBlockStart + PAGE_BLOCK_SIZE - 1);
    const pageNumbers = Array.from({ length: currentBlockEnd - currentBlockStart + 1 }, (_, i) => currentBlockStart + i);

    return (
        <PublicationsView
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={handleTabClick}
            isFilterOpen={isFilterOpen}
            toggleFilter={() => setIsFilterOpen(!isFilterOpen)}
            filterRef={filterRef}
            selectedYears={selectedYears}
            allYears={allYears}
            toggleYear={toggleYear}
            clearFilter={clearFilter}
            sortedYearsInPage={sortedYearsInPage}
            groupedItems={groupedItems}
            totalPages={totalPages}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            onPageChange={handlePageChange}
        />
    );
};

export default PublicationsContainer;
