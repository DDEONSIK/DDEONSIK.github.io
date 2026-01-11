import React from 'react';
import { FolderOpen, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Project } from '@/types/Project';
import { DateInfo } from '@/types/Base';
import SmoothTabs from '@/components/SmoothTabs';
import './Projects.css';

interface ProjectsViewProps {
    activeTab: string;
    tabs: { id: any; label: string; icon: React.ReactNode }[];
    onTabChange: (id: any) => void;
    paginatedItems: Project[];
    filteredItemsLength: number;
    currentPage: number;
    totalPages: number;
    pageNumbers: number[];
    onPageChange: (page: number) => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({
    activeTab,
    tabs,
    onTabChange,
    paginatedItems,
    filteredItemsLength,
    currentPage,
    totalPages,
    pageNumbers,
    onPageChange
}) => {
    // 날짜 포맷팅 헬퍼 함수
    const formatDate = (date: DateInfo) => {
        if (!date) return '';
        const year = date.year;
        const month = date.month ? String(date.month).padStart(2, '0') : '';
        // const day = date.day ? String(date.day).padStart(2, '0') : '';
        
        if (month) return `${year}. ${month}`;
        return `${year}`;
    };

    const formatPeriod = (start: DateInfo, end?: DateInfo) => {
        const startStr = formatDate(start);
        const endStr = end ? formatDate(end) : 'Present';
        
        if (!startStr) return '-';
        return `${startStr} ~ ${endStr}`;
    };

    return (
        <div className="projects-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="projects-header">
                    <h1 className="projects-header__title">
                        Projects
                    </h1>
                    <div className="projects-header__underline"></div>
                </div>

                {/* Smooth Tabs */}
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeTab}
                    onChange={(id) => onTabChange(id)}
                    layoutIdPrefix="projects"
                />

                {/* Content Area - Table View */}
                <div className="projects-content">
                    <div className="projects-card">
                        {filteredItemsLength > 0 ? (
                            <div className="projects-table-wrapper">
                                <table className="projects-table">
                                    <thead>
                                        <tr className="projects-table__thead">
                                            <th className="projects-table__th w-[40%]">Project Name</th>
                                            <th className="projects-table__th w-[15%]">Content</th>
                                            <th className="projects-table__th w-[30%]">Funding Agency</th>
                                            <th className="projects-table__th text-center w-[15%]">Period</th>
                                        </tr>
                                    </thead>
                                    <tbody className="projects-table__tbody">
                                        {paginatedItems.map((project) => (
                                            <tr key={project.id} className="projects-table__row">
                                                <td className="projects-table__cell">
                                                    <div className="projects-table__cell-title">
                                                        {project.title}
                                                    </div>
                                                </td>
                                                <td className="projects-table__cell projects-table__cell-content">
                                                    {project.content ? project.content : '-'}
                                                </td>
                                                <td className="projects-table__cell projects-table__cell-funding">
                                                    {project.funding}
                                                </td>
                                                <td className="projects-table__cell projects-table__cell-period">
                                                    {formatPeriod(project.startDate, project.endDate)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="projects-empty">
                                <FolderOpen size={48} className="mb-4 opacity-50 dark:opacity-40" />
                                <p className="text-lg font-medium dark:text-slate-400">No projects found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
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

export default ProjectsView;
