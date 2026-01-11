import React from 'react';
import { CourseCategory } from '@/types/Course';
import { BookOpen, GraduationCap, Users, Clock, History, Award, Presentation } from 'lucide-react';
import SmoothTabs, { TabItem } from '@/components/SmoothTabs/index';
import './Courses.css';

interface CoursesViewProps {
    activeTab: CourseCategory;
    onTabChange: (id: CourseCategory) => void;
    tabs: TabItem[];
    undergradCourses: {
        after2023: string[];
        before2023: string[];
    };
    gradCourses: {
        after2021: string[];
        before2021: string[];
    };
    capstoneHistory: {
        year: number;
        projects: {
            members: string;
            topic: string;
        }[];
    }[];
}

const CoursesView: React.FC<CoursesViewProps> = ({
    activeTab,
    onTabChange,
    tabs,
    undergradCourses,
    gradCourses,
    capstoneHistory
}) => {
    return (
        <div className="courses-wrapper">
            <div className="courses-container">
                {/* Header */}
                <div className="courses-header">
                    <h1 className="courses-title">Courses</h1>
                    <div className="courses-divider"></div>
                </div>

                {/* Smooth Tabs */}
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeTab}
                    onChange={(id) => onTabChange(id as CourseCategory)}
                    layoutIdPrefix="courses"
                />

                {/* Content Area */}
                <div className="courses-content">
                    {/* UNDERGRADUATE TAB */}
                    {activeTab === 'undergraduate' && (
                        <div className="course-card-wrapper">
                            <div className="course-card-grid">
                                {/* After 2023 Spring */}
                                <div className="course-card group">
                                    <div className="course-card-bg-icon group-hover:opacity-20">
                                        <Clock size={120} className="text-primary" />
                                    </div>
                                    <div className="course-card-inner">
                                        <div className="course-card-header">
                                            <div className="course-card-icon-wrapper bg-primary/10 text-primary">
                                                <Clock size={20} />
                                            </div>
                                            <h2 className="course-card-title">2023년 1학기 이후</h2>
                                        </div>
                                        <div className="course-list">
                                            {undergradCourses.after2023.map((course, idx) => (
                                                <div key={idx} className="course-item">
                                                    <div className="course-dot bg-primary"></div>
                                                    <span className="course-name">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Before 2023 Spring */}
                                <div className="course-card group">
                                    <div className="course-card-bg-icon group-hover:opacity-20">
                                        <History size={120} className="text-muted-foreground" />
                                    </div>
                                    <div className="course-card-inner">
                                        <div className="course-card-header">
                                            <div className="course-card-icon-wrapper bg-secondary text-muted-foreground">
                                                <History size={20} />
                                            </div>
                                            <h2 className="course-card-title">2023년 1학기 이전</h2>
                                        </div>
                                        <div className="course-list">
                                            {undergradCourses.before2023.map((course, idx) => (
                                                <div key={idx} className="course-item">
                                                    <div className="course-dot bg-muted-foreground"></div>
                                                    <span className="course-name">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="course-note">
                                * Curriculum changes applied from the Spring Semester of 2023.
                            </p>
                        </div>
                    )}

                    {/* GRADUATE TAB */}
                    {activeTab === 'graduate' && (
                        <div className="course-card-wrapper">
                            <div className="course-card-grid">
                                {/* After 2021 Spring */}
                                <div className="course-card group">
                                    <div className="course-card-bg-icon group-hover:opacity-20">
                                        <Clock size={120} className="text-primary" />
                                    </div>
                                    <div className="course-card-inner">
                                        <div className="course-card-header">
                                            <div className="course-card-icon-wrapper bg-primary/10 text-primary">
                                                <Clock size={20} />
                                            </div>
                                            <h2 className="course-card-title">2021년도 1학기 이후</h2>
                                        </div>
                                        <div className="course-list">
                                            {gradCourses.after2021.map((course, idx) => (
                                                <div key={idx} className="course-item">
                                                    <div className="course-dot bg-primary"></div>
                                                    <span className="course-name">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Before 2021 Spring */}
                                <div className="course-card group">
                                    <div className="course-card-bg-icon group-hover:opacity-20">
                                        <History size={120} className="text-muted-foreground" />
                                    </div>
                                    <div className="course-card-inner">
                                        <div className="course-card-header">
                                            <div className="course-card-icon-wrapper bg-secondary text-muted-foreground">
                                                <History size={20} />
                                            </div>
                                            <h2 className="course-card-title">2021년도 1학기 이전</h2>
                                        </div>
                                        <div className="course-list">
                                            {gradCourses.before2021.map((course, idx) => (
                                                <div key={idx} className="course-item">
                                                    <div className="course-dot bg-muted-foreground"></div>
                                                    <span className="course-name">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="course-note">
                                * Curriculum changes applied from the Spring Semester of 2021.
                            </p>
                        </div>
                    )}

                    {/* CAPSTONE TAB */}
                    {activeTab === 'capstone' && (
                        <div className="max-w-7xl mx-auto">
                            {/* Images Section - Full Width */}
                            <div className="capstone-images-grid">
                                <div className="capstone-image-card group">
                                    <div className="capstone-image-wrapper">
                                        <img
                                            src="/assets/images/Research_image/capstone_1.png"
                                            alt="Capstone Design 1"
                                            className="capstone-image group-hover:scale-[1.02]"
                                        />
                                    </div>
                                    <div className="capstone-image-caption">
                                        <h3 className="capstone-image-title">2019 Capstone Design</h3>
                                    </div>
                                </div>
                                <div className="capstone-image-card group">
                                    <div className="capstone-image-wrapper">
                                        <img
                                            src="/assets/images/Research_image/capstone_2.png"
                                            alt="Capstone Design 2"
                                            className="capstone-image group-hover:scale-[1.02]"
                                        />
                                    </div>
                                    <div className="capstone-image-caption">
                                        <h3 className="capstone-image-title">2020 Capstone Design</h3>
                                    </div>
                                </div>
                            </div>

                            {/* History Table - Refined */}
                            <div className="history-table-wrapper">
                                <h2 className="history-title">
                                    <Award className="text-primary" />
                                    Capstone Design History
                                </h2>

                                <div className="history-table-container">
                                    <div className="history-table-overflow">
                                        <table className="history-table">
                                            <thead>
                                                <tr className="bg-muted/50 border-b border-border">
                                                    <th className="history-th w-32 text-center text-nowrap">Year</th>
                                                    <th className="history-th w-1/3">Team</th>
                                                    <th className="history-th">Topic</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {capstoneHistory.map((item) => (
                                                    <React.Fragment key={item.year}>
                                                        {item.projects.map((proj, pIdx) => (
                                                            <tr key={`${item.year}-${pIdx}`} className="history-tr">
                                                                {/* Year Column - Spanning Rows */}
                                                                {pIdx === 0 && (
                                                                    <td
                                                                        rowSpan={item.projects.length}
                                                                        className="history-td-year"
                                                                    >
                                                                        <span className="history-year-badge">
                                                                            {item.year}
                                                                        </span>
                                                                    </td>
                                                                )}

                                                                {/* Team Column */}
                                                                <td className="history-td-content">
                                                                    <div className="history-cell-content">
                                                                        <Users size={18} className="history-mobile-icon" />
                                                                        <span className="history-text-primary">
                                                                            {proj.members}
                                                                        </span>
                                                                    </div>
                                                                </td>

                                                                {/* Topic Column */}
                                                                <td className="history-td-last">
                                                                    <div className="history-cell-content">
                                                                        <Presentation size={18} className="history-mobile-icon" />
                                                                        <span className="history-text-secondary">
                                                                            {proj.topic}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursesView;
