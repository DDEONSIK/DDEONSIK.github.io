import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CourseCategory, CourseItem, CapstoneHistoryItem } from '@/types/Course';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import CoursesView from './CoursesView';

// Import JSON data
import undergradAfter2023 from '@/data/courses/courses_undergrad_after_2023.json';
import undergradBefore2023 from '@/data/courses/courses_undergrad_before_2023.json';
import gradAfter2021 from '@/data/courses/courses_grad_after_2021.json';
import gradBefore2021 from '@/data/courses/courses_grad_before_2021.json';
import capstoneHistoryJson from '@/data/courses/capstone_history.json';

const CoursesContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<CourseCategory>('undergraduate');

    const tabs = [
        { id: 'undergraduate', label: 'Undergraduate', icon: <BookOpen size={18} /> },
        { id: 'graduate', label: 'Graduate', icon: <GraduationCap size={18} /> },
        { id: 'capstone', label: 'Capstone Design', icon: <Users size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area && ['undergraduate', 'graduate', 'capstone'].includes(area)) {
            setActiveTab(area as CourseCategory);
        }
    }, [location]);

    const handleTabClick = (id: CourseCategory) => {
        setActiveTab(id);
        navigate(`/courses?area=${id}`);
    };

    // Prepare data for the view
    // Extract titles for simple listing in the current view design
    const undergradCourses = {
        after2023: (undergradAfter2023 as CourseItem[]).map(c => c.title || ''),
        before2023: (undergradBefore2023 as CourseItem[]).map(c => c.title || '')
    };

    const gradCourses = {
        after2021: (gradAfter2021 as CourseItem[]).map(c => c.title || ''),
        before2021: (gradBefore2021 as CourseItem[]).map(c => c.title || '')
    };
    
    const capstoneHistory = capstoneHistoryJson as CapstoneHistoryItem[];

    return (
        <CoursesView
            activeTab={activeTab}
            onTabChange={handleTabClick}
            tabs={tabs}
            undergradCourses={undergradCourses}
            gradCourses={gradCourses}
            capstoneHistory={capstoneHistory}
        />
    );
};

export default CoursesContainer;
