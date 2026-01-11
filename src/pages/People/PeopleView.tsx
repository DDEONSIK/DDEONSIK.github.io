import React, { useEffect } from 'react';
import { Mail, MapPin, GraduationCap, Briefcase, Award, BookOpen, Scroll, Calendar, Phone } from 'lucide-react';
import { Person, Student, Professor } from '@/types/Person';
import SmoothTabs from '@/components/SmoothTabs';
import './People.css';

interface PeopleViewProps {
    activeTab: 'Professor' | 'Members' | 'Alumni';
    tabs: { id: 'Professor' | 'Members' | 'Alumni'; label: string; icon: React.ReactNode }[];
    onTabChange: (id: 'Professor' | 'Members' | 'Alumni') => void;
    professor?: Person;
    sortedMembers: Person[];
    generalPhD: Person[];
    generalMS: Person[];
    professionalMS: Person[];
}

// 이미지 로드를 위한 Vite glob import (Absolute path)
const memberImages = import.meta.glob('/src/assets/people/**/*.webp', { eager: true });
const blankImage = (memberImages['/src/assets/people/blank.webp'] as any)?.default;

const PeopleView: React.FC<PeopleViewProps> = ({
    activeTab,
    tabs,
    onTabChange,
    professor,
    sortedMembers,
    generalPhD,
    generalMS,
    professionalMS
}) => {

    useEffect(() => {
        // console.log('Available member images keys:', Object.keys(memberImages));
    }, []);

    const getProfileImageUrl = (person: Person) => {
        const categoryMap: Record<string, string> = {
            'Professor': 'professor',
            'Member': 'students',
            'Alumni': 'students'
        };
        
        const folder = categoryMap[person.category];
        const filename = `${person.id}_${person.nameKo}.webp`;
        // Absolute path construction
        const path = `/src/assets/people/${folder}/${filename}`;
        
        let imageModule = memberImages[path];
        
        // Robust lookup
        if (!imageModule) {
            const partialPath = `/${folder}/${filename}`;
            const matchingKey = Object.keys(memberImages).find(k => k.endsWith(partialPath));
            if (matchingKey) {
                imageModule = memberImages[matchingKey];
            } else {
                 // console.warn(`Image not found for: ${person.nameKo} (ID: ${person.id}), Path checked: ${path}`);
            }
        }
        
        return (imageModule as any)?.default || blankImage || 'https://via.placeholder.com/150?text=No+Image';
    };

    const ProfileCard = ({ person }: { person: Person }) => {
        const isAlumniTab = activeTab === 'Alumni';
        const student = (person.category === 'Member' || person.category === 'Alumni') ? (person as Student) : null;

        // 학위 기간 계산
        const getYearRange = (year: number | string, degree?: string) => {
            const yearNum = typeof year === 'number' ? year : parseInt(year);
            if (isNaN(yearNum)) return year;
            if (degree === 'Ph.D.') return `${yearNum - 4} - ${yearNum}`;
            else return `${yearNum - 2} - ${yearNum}`;
        };

        const renderDescriptionsWithWrapper = () => {
            if (!student) return null;
            const descs = student.description;

            let content: React.ReactNode = null;

            // 1. Member in Alumni tab (Custom Text)
            if (isAlumniTab && person.category === 'Member') {
                let customText = "";
                if (student.course === 'Ph.D.' || student.course === 'M.S./Ph.D.') {
                    customText = "본교 박사 진학";
                } else if (student.course === 'Researcher') {
                    customText = "본교 연구원";
                }
                
                if (customText) {
                    content = (
                        <div className="flex items-start">
                            <Briefcase size={16} className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="font-medium text-slate-700 dark:text-slate-300">{customText}</span>
                        </div>
                    );
                }
            }
            // 2. Normal Description
            else if (descs && descs.length > 0) {
                const validDescs = descs.filter(d => 
                    (Array.isArray(d.contents) && d.contents.length > 0) || 
                    (typeof d.contents === 'string' && d.contents.trim() !== '')
                );

                if (validDescs.length > 0) {
                    content = validDescs.map((desc, idx) => {
                        let Icon = BookOpen;
                        if (desc.title === 'Current Workplace') Icon = Briefcase;
                        else if (desc.title === 'Research Interests') Icon = BookOpen;
        
                        return (
                            <div key={idx} className="flex items-start mt-2 first:mt-0">
                                <Icon size={16} className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                <div className="flex flex-col">
                                    {Array.isArray(desc.contents) ? (
                                        desc.contents.map((content: any, cIdx: number) => (
                                            <span key={cIdx} className="font-medium text-slate-700 dark:text-slate-300">
                                                {typeof content === 'string' ? content : JSON.stringify(content)}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="font-medium text-slate-700 dark:text-slate-300">
                                            {desc.contents as string}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    });
                }
            }

            if (!content) return null;

            return (
                <div className={isAlumniTab ? "pt-2 border-t border-slate-50 dark:border-slate-800 mt-2" : "mt-2"}>
                    {content}
                </div>
            );
        };

        return (
            <div className="profile-card">
                <div className="profile-card__image-container">
                    <img
                        src={getProfileImageUrl(person)}
                        alt={person.nameEn}
                        className="profile-card__image"
                        onError={(e) => { (e.target as HTMLImageElement).src = blankImage; }}
                    />
                </div>
                <div className="profile-card__info">
                    <h3 className="profile-card__name">{person.nameEn} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({person.nameKo})</span></h3>
                    {!isAlumniTab && (
                        <div className="profile-card__role">
                            {person.role}
                        </div>
                    )}
                    {person.email && (
                        <div className="profile-card__email">
                            <Mail size={14} className="text-slate-400 dark:text-slate-500" />
                            <span>{person.email}</span>
                        </div>
                    )}
                    
                    <div className="profile-card__bio">
                        
                        {/* 1. Academic Background */}
                        {student && student.academicBackground && student.academicBackground.length > 0 && (
                            <div className="flex items-start">
                                <GraduationCap size={16} className="text-slate-400 dark:text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                                <div className="flex flex-col w-full">
                                    {student.academicBackground.map((edu, idx) => {
                                        const isSeoulTech = edu.school && (edu.school.includes('서울과학기술대학교') || edu.school.includes('SeoulTech'));
                                        const showSchool = edu.school && (!isAlumniTab || !isSeoulTech);
                                        
                                        return (
                                            <div key={idx} className="mb-2 last:mb-0">
                                                <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                    {edu.degree} {showSchool ? `in ${edu.school}` : ''} ({edu.year})
                                                </div>
                                                {edu.thesis && (
                                                    <div className="flex items-start mt-1">
                                                        <Scroll size={14} className="text-blue-400 mr-1.5 mt-0.5 flex-shrink-0" />
                                                        <span className="text-xs italic text-slate-500 dark:text-slate-400 leading-snug">{edu.thesis}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 2. Description (Wrapped) */}
                        {renderDescriptionsWithWrapper()}
                    </div>
                </div>
            </div>
        );
    };

    const prof = professor as Professor;

    return (
        <div className="people-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="people-header">
                    <h1 className="people-header__title">
                        People
                    </h1>
                    <div className="people-header__underline"></div>
                </div>
                <SmoothTabs
                    tabs={tabs}
                    activeId={activeTab}
                    onChange={(id) => onTabChange(id as any)}
                    layoutIdPrefix="people"
                />

                <div className="animate-fade-in-up">
                    {activeTab === 'Professor' && prof && (
                        <div className="professor-card">
                            <div className="professor-card__content">
                                {/* Professor Profile */}
                                <div className="professor-profile">
                                    <div className="professor-image-container">
                                        <img src={getProfileImageUrl(prof)} alt={prof.nameEn} className="professor-image" />
                                    </div>
                                    <div className="professor-info">
                                        <h2 className="professor-name">{prof.nameEn} <span className="text-2xl font-bold text-slate-500 dark:text-slate-400">({prof.nameKo})</span></h2>
                                        <p className="professor-role">
                                            Professor <br className="md:hidden" /> Dept. of Automotive Engineering
                                        </p>
                                        <div className="professor-contact">
                                            <div className="professor-contact-item">
                                                <div className="professor-contact-icon">
                                                    <Mail size={18} />
                                                </div>
                                                <span className="professor-contact-text">{prof.email}</span>
                                            </div>
                                            {prof.phone && (
                                                <div className="professor-contact-item">
                                                    <div className="professor-contact-icon">
                                                        <Phone size={18} />
                                                    </div>
                                                    <span className="professor-contact-text">{prof.phone}</span>
                                                </div>
                                            )}
                                            <div className="professor-contact-item">
                                                <div className="professor-contact-icon">
                                                    <MapPin size={18} />
                                                </div>
                                                <span className="professor-contact-text">Room 719, Frontier Hall (#32), SeoulTech</span>
                                            </div>
                                        </div>
                                        <div className="professor-buttons">
                                            <button onClick={() => window.open('https://scholar.google.com/citations?view_op=list_works&hl=ko&hl=ko&user=d3UH4WoAAAAJ&pagesize=80', '_blank')} className="btn-outline">Google Scholar</button>
                                            <button onClick={() => window.open('https://orcid.org/0000-0002-4144-1000', '_blank')} className="btn-outline">ORCID</button>
                                            <button className="btn-outline">CV</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Research Interests */}
                                {prof.researchInterests && (
                                    <section className="info-section">
                                        <div className="info-section__header">
                                            <div className="info-section__icon">
                                                <BookOpen size={28} />
                                            </div>
                                            <h3 className="info-section__title">Research Interests</h3>
                                        </div>
                                        <div className="info-section__content">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {prof.researchInterests.map((item, idx) => (
                                                    <div key={idx} className="flex items-start">
                                                        <div className="w-2 h-2 mt-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Education */}
                                {prof.academicBackground && (
                                    <section className="info-section">
                                        <div className="info-section__header">
                                            <div className="info-section__icon">
                                                <GraduationCap size={28} />
                                            </div>
                                            <h3 className="info-section__title">Education</h3>
                                        </div>
                                        <div className="info-section__content space-y-8">
                                            {prof.academicBackground.map((edu, idx) => (
                                                <div key={idx} className="relative border-l-2 border-slate-100 dark:border-slate-800 pl-6 pb-2">
                                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400"></div>
                                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">{edu.degree}</h4>
                                                        <span className="text-slate-500 dark:text-slate-400 font-medium">{edu.year}</span>
                                                    </div>
                                                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">{edu.school}</p>
                                                    {edu.thesis && (
                                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg items-start flex">
                                                            <Scroll size={16} className="text-slate-400 dark:text-slate-500 mr-2 mt-1 flex-shrink-0" />
                                                            <p className="text-slate-600 dark:text-slate-400 italic text-sm">{edu.thesis}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Employment */}
                                {prof.career && (
                                    <section className="info-section">
                                        <div className="info-section__header">
                                            <div className="info-section__icon">
                                                <Briefcase size={28} />
                                            </div>
                                            <h3 className="info-section__title">Employment</h3>
                                        </div>
                                        <div className="info-section__content space-y-6">
                                            {prof.career.map((career, idx) => (
                                                <div key={idx} className="flex flex-col md:flex-row gap-2 md:gap-8">
                                                    <div className="md:w-48 flex-shrink-0">
                                                        <span className="font-bold text-slate-500 dark:text-slate-400">{career.period}</span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <p className="text-lg text-slate-800 dark:text-slate-200 font-medium">{career.role}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Awards */}
                                {prof.awards && (
                                    <section>
                                        <div className="info-section__header">
                                            <div className="info-section__icon">
                                                <Award size={28} />
                                            </div>
                                            <h3 className="info-section__title">Awards & Honors</h3>
                                        </div>
                                        <div className="info-section__content space-y-4 text-slate-700 dark:text-slate-300">
                                            {prof.awards.map((award, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <div className="w-1.5 h-1.5 mt-2.5 bg-slate-400 dark:bg-slate-500 rounded-full mr-3 flex-shrink-0"></div>
                                                    <span className="text-lg leading-relaxed">{award}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Members' && (
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {sortedMembers.map((p, idx) => (
                                    <ProfileCard key={idx} person={p} />
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Alumni' && (
                        <div className="max-w-6xl mx-auto space-y-24">
                            <section>
                                <div className="mb-12 text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 inline-flex items-center gap-3">
                                        General Graduate School
                                        <span className="text-lg font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">일반대학원</span>
                                    </h2>
                                </div>
                                <div className="space-y-16">
                                    {generalPhD.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-8 flex items-center">
                                                <div className="w-1.5 h-6 bg-blue-600 dark:bg-blue-500 mr-3 rounded-full"></div>
                                                Ph.D.
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {generalPhD.map((p, idx) => (
                                                    <ProfileCard key={idx} person={p} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {generalMS.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-8 flex items-center">
                                                <div className="w-1.5 h-6 bg-blue-600 dark:bg-blue-500 mr-3 rounded-full"></div>
                                                M.S.
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {generalMS.map((p, idx) => (
                                                    <ProfileCard key={idx} person={p} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                            <div className="w-full h-px bg-slate-200 dark:bg-slate-800"></div>
                            <section>
                                <div className="mb-12 text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 inline-flex items-center gap-3">
                                        Professional Graduate School
                                        <span className="text-lg font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">전문대학원</span>
                                    </h2>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-8 flex items-center">
                                        <div className="w-1.5 h-6 bg-blue-600 dark:bg-blue-500 mr-3 rounded-full"></div>
                                        M.S.
                                    </h3>
                                    {professionalMS.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {professionalMS.map((p, idx) => (
                                                <ProfileCard key={idx} person={p} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
                                            No alumni data available for this category.
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PeopleView;