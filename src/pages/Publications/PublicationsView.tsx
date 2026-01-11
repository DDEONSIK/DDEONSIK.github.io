import React, { RefObject } from 'react';
import { FileText, BookOpen, ExternalLink, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PublicationItem, PublicationCategory } from '@/types/Publication';
import SmoothTabs from '@/components/SmoothTabs';
import './Publications.css';

interface PublicationsViewProps {
    activeTab: PublicationCategory;
    tabs: { id: PublicationCategory; label: string; icon: React.ReactNode }[];
    onTabChange: (id: PublicationCategory) => void;
    isFilterOpen: boolean;
    toggleFilter: () => void;
    filterRef: RefObject<HTMLDivElement>;
    selectedYears: number[];
    allYears: number[];
    toggleYear: (year: number) => void;
    clearFilter: () => void;
    sortedYearsInPage: number[];
    groupedItems: Record<number, PublicationItem[]>;
    totalPages: number;
    currentPage: number;
    pageNumbers: number[];
    onPageChange: (page: number) => void;
}

const PublicationsView: React.FC<PublicationsViewProps> = ({
    activeTab,
    tabs,
    onTabChange,
    isFilterOpen,
    toggleFilter,
    filterRef,
    selectedYears,
    allYears,
    toggleYear,
    clearFilter,
    sortedYearsInPage,
    groupedItems,
    totalPages,
    currentPage,
    pageNumbers,
    onPageChange
}) => {
    return (
        <div className="publications-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="publications-header">
                    <h1 className="publications-title">
                        Publications
                    </h1>
                    <div className="publications-underline"></div>
                </div>

                {/* Categories & Filter Bar */}
                <div className="publications-controls">

                    {/* Tabs */}
                    <SmoothTabs
                        tabs={tabs}
                        activeId={activeTab}
                        onChange={(id) => onTabChange(id as PublicationCategory)}
                        layoutIdPrefix="publications"
                        className="mb-0"
                    />

                    {/* Filter Button */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={toggleFilter}
                            className={`filter-button ${isFilterOpen || selectedYears.length > 0
                                ? 'filter-button--active'
                                : 'filter-button--inactive'
                                }`}
                        >
                            <Filter size={16} />
                            <span>Year Filter</span>
                            {selectedYears.length > 0 && (
                                <span className="ml-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                    {selectedYears.length}
                                </span>
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isFilterOpen && (
                            <div className="filter-dropdown">
                                <div className="filter-dropdown-header">
                                    <span className="filter-title">Select Years</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={clearFilter}
                                            className="filter-clear-btn"
                                            title="Clear Selection"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>

                                <div className="year-grid">
                                    {allYears.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => toggleYear(year)}
                                            className={`year-button ${selectedYears.includes(year)
                                                ? 'year-button--selected'
                                                : 'year-button--default'
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                                <div className="filter-status">
                                    {selectedYears.length === 0 ? "Showing All Years" : `${selectedYears.length} years selected`}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content List & Pagination */}
                <div className="publications-list-container">
                    {sortedYearsInPage.length > 0 ? (
                        sortedYearsInPage.map((year) => (
                            <div key={year} className="mb-10 animate-fade-in-up">
                                <div className="year-divider">
                                    <div className="year-badge">
                                        {year}
                                    </div>
                                    <div className="divider-line"></div>
                                </div>
                                <div className="space-y-4">
                                    {groupedItems[year].map((paper) => (
                                        <div key={paper.id} className="publication-card">
                                            <div className="flex items-start">
                                                {/* Icon */}
                                                <div className="publication-icon-wrapper">
                                                    <FileText size={20} />
                                                </div>

                                                {/* Content Container */}
                                                <div className="flex-grow flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                                    {/* Text Info */}
                                                    <div className="flex-grow">
                                                        <h3 className="publication-title-text">
                                                            {paper.title}
                                                        </h3>
                                                        <p className="publication-author">
                                                            {paper.author}
                                                        </p>
                                                        <div className="publication-venue">
                                                            {paper.venue}
                                                        </div>
                                                    </div>

                                                    {/* Right-aligned DOI Button (on Desktop) */}
                                                    {paper.doi && (
                                                        <div className="flex-shrink-0 md:self-center">
                                                            <a
                                                                href={`https://doi.org/${paper.doi}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="doi-button"
                                                            >
                                                                DOI <ExternalLink size={12} className="ml-1.5" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <BookOpen className="empty-icon" />
                            <p className="empty-text">No publications found for the selected filters.</p>
                        </div>
                    )}
                </div>

                {/* Advanced Pagination */}
                {totalPages > 1 && (
                    <div className="pagination-container">
                        {/* First Page */}
                        <button
                            onClick={() => onPageChange(1)}
                            disabled={currentPage === 1}
                            className={`pagination-btn ${currentPage === 1 ? 'pagination-btn--disabled' : 'pagination-btn--active'}`}
                            title="First Page"
                        >
                            <ChevronsLeft size={18} />
                        </button>

                        {/* Previous Page */}
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`pagination-btn ${currentPage === 1 ? 'pagination-btn--disabled' : 'pagination-btn--active'}`}
                            title="Previous Page"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Page Numbers Block */}
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`pagination-number ${currentPage === page ? 'pagination-number--current' : 'pagination-number--other'}`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Page */}
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`pagination-btn ${currentPage === totalPages ? 'pagination-btn--disabled' : 'pagination-btn--active'}`}
                            title="Next Page"
                        >
                            <ChevronRight size={18} />
                        </button>

                        {/* Last Page */}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className={`pagination-btn ${currentPage === totalPages ? 'pagination-btn--disabled' : 'pagination-btn--active'}`}
                            title="Last Page"
                        >
                            <ChevronsRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicationsView;