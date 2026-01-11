import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Users, GraduationCap } from 'lucide-react';
import professorData from '@/data/people/professor.json';
import studentsDataRaw from '@/data/people/students.json';
import { Person, Student, Professor } from '@/types/Person';
import PeopleView from '@/pages/People/PeopleView';

const professor = professorData as Professor;
const students = studentsDataRaw as Student[];

const PeopleContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'Professor' | 'Members' | 'Alumni'>('Professor');

    const tabs: { id: 'Professor' | 'Members' | 'Alumni'; label: string; icon: React.ReactNode }[] = [
        { id: 'Professor', label: 'Professor', icon: <User size={18} /> },
        { id: 'Members', label: 'Members', icon: <Users size={18} /> },
        { id: 'Alumni', label: 'Alumni', icon: <GraduationCap size={18} /> },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area) {
            const capitalizedArea = area.charAt(0).toUpperCase() + area.slice(1);
            if (['Professor', 'Members', 'Alumni'].includes(capitalizedArea)) {
                setActiveTab(capitalizedArea as 'Professor' | 'Members' | 'Alumni');
            }
        }
    }, [location]);

    const handleTabClick = (id: 'Professor' | 'Members' | 'Alumni') => {
        setActiveTab(id);
        navigate(`/people?area=${id.toLowerCase()}`);
    };

    // Filter Members and Alumni from unified data
    const members = students.filter(p => p.category === 'Member');
    
    // Alumni include graduated students AND members who obtained a graduate degree from our lab
    const alumni = students.filter(p => {
        if (p.category === 'Alumni') return true;
        if (p.category === 'Member') {
            // Check if they have a graduate degree from SeoulTech
            return p.academicBackground?.some(degree => 
                (degree.degree === 'M.S.' || degree.degree === 'Ph.D.') &&
                (degree.school.includes('서울과학기술대학교') || degree.school.includes('SeoulTech'))
            );
        }
        return false;
    });

    // Sort Members: Ph.D. first, then M.S.
    const sortedMembers = [...members].sort((a, b) => {
        const getPriority = (m: Student) => {
            if (m.course === 'Ph.D.' || m.course === 'M.S./Ph.D.' || m.role.includes('Ph.D.')) return 1;
            return 2; // M.S. and others
        };
        return getPriority(a) - getPriority(b);
    });

    // Helper to extract graduation year for sorting
    const getGraduationYear = (p: Person) => {
        if (p.academicBackground && p.academicBackground.length > 0) {
            const lastDegree = p.academicBackground[p.academicBackground.length - 1];
            if (typeof lastDegree.year === 'number') return lastDegree.year;
            return parseInt(lastDegree.year) || 0;
        }
        return 0;
    };

    // Sort Alumni: Ascending (Oldest -> Newest)
    const sortAlumni = (list: Person[]) => {
        return [...list].sort((a, b) => getGraduationYear(a) - getGraduationYear(b));
    };

    // Split Alumni Logic
    // Members are considered part of General Graduate School
    const generalAlumni = alumni.filter(p => 
        p.course === 'General Graduated' || 
        p.category === 'Member'
    );
    const professionalAlumni = alumni.filter(p => p.course === 'Professional Graduated');

    // Filter by final degree obtained
    const isPhD = (p: Person) => {
        if (!p.academicBackground) return false;
        // Check if any degree is Ph.D.
        return p.academicBackground.some(d => d.degree === 'Ph.D.');
    };

    const generalPhD = sortAlumni(generalAlumni.filter(p => isPhD(p)));
    const generalMS = sortAlumni(generalAlumni.filter(p => !isPhD(p)));

    const professionalMS = sortAlumni(professionalAlumni);

    return (
        <PeopleView
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={handleTabClick}
            professor={professor}
            sortedMembers={sortedMembers}
            generalPhD={generalPhD}
            generalMS={generalMS}
            professionalMS={professionalMS}
        />
    );
};

export default PeopleContainer;
