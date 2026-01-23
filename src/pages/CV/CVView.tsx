import { Calendar, Briefcase, GraduationCap, Award, Code2, Cpu, FileText, User, ExternalLink, Building2 } from 'lucide-react';
import cvData from '@/data/cv.json';

const CVView: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container-custom max-w-5xl">

                {/* Header */}
                <header className="mb-16 border-b border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{cvData.header.title}</h1>
                        <p className="text-xl text-muted-foreground flex items-center gap-2">
                            <Briefcase size={20} className="text-primary" />
                            {cvData.header.subtitle}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Personal, Education, Skills */}
                    <div className="lg:col-span-4 space-y-12">

                        {/* Personal Information */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold mb-6 text-foreground">
                                <User className="mr-3 text-primary" /> Personal Info
                            </h2>
                            <div className="space-y-4 border-l-2 border-border ml-2 pl-6 relative">
                                {/* Name */}
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-1">Name</h4>
                                    <div className="text-muted-foreground font-medium flex items-center gap-2">
                                        {/* @ts-ignore */}
                                        {cvData.personalInfo.nameEn} <span className="text-border">|</span> {/* @ts-ignore */}{cvData.personalInfo.nameKo}
                                    </div>
                                </div>
                                {/* Nationality */}
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-1">Nationality</h4>
                                    <div className="text-muted-foreground font-medium flex items-center gap-2">
                                        {cvData.personalInfo.nationality}
                                    </div>
                                </div>
                                {/* Gender / Birth Date */}
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-1">Gender / Birth Date</h4>
                                    <div className="text-muted-foreground font-medium flex items-center gap-2">
                                        {/* @ts-ignore */}
                                        {cvData.personalInfo.gender} <span className="text-border">|</span> {/* @ts-ignore */}{cvData.personalInfo.birthDate}
                                    </div>
                                </div>
                                {/* Military */}
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-1">Military Service</h4>
                                    <div className="text-muted-foreground font-medium leading-tight">
                                        {/* @ts-ignore */}
                                        {cvData.personalInfo.militaryWebsite ? (
                                            <a
                                                // @ts-ignore
                                                href={cvData.personalInfo.militaryWebsite}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4 inline align-baseline group"
                                            >
                                                {cvData.personalInfo.military}
                                                <span className="inline-block ml-1 align-middle transform -translate-y-[1px]">
                                                    <ExternalLink size={14} className="text-muted-foreground opacity-70 group-hover:text-primary transition-colors" />
                                                </span>
                                            </a>
                                        ) : (
                                            cvData.personalInfo.military
                                        )}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {/* @ts-ignore */}
                                        {cvData.personalInfo.militaryDetails}
                                    </div>
                                </div>
                                {/* Contact */}
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-1">Contact</h4>
                                    <div className="text-muted-foreground font-medium">
                                        {cvData.personalInfo.email}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold mb-6 text-foreground">
                                <GraduationCap className="mr-3 text-primary" /> Education
                            </h2>
                            <div className="space-y-8 border-l-2 border-border ml-2 pl-6 relative">
                                {cvData.education.map((edu) => (
                                    <div key={edu.id} className="relative">
                                        <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full ring-4 ring-background ${edu.status === 'current' ? 'bg-primary' : 'bg-border'}`}></div>
                                        <h3 className="font-bold text-lg leading-tight">
                                            {edu.degree} <span className="text-muted-foreground font-normal">at</span>{' '}
                                            {edu.website ? (
                                                <a href={edu.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4 inline align-baseline group">
                                                    {edu.institution}
                                                    <span className="inline-block ml-1 align-middle transform -translate-y-[1px]">
                                                        <ExternalLink size={14} className="text-muted-foreground opacity-70 group-hover:text-primary transition-colors" />
                                                    </span>
                                                </a>
                                            ) : (
                                                <span>{edu.institution}</span>
                                            )}
                                        </h3>
                                        {/* Department */}
                                        <div className="text-md font-medium text-muted-foreground mt-1">
                                            {edu.department}
                                        </div>
                                        {/* Lab Info */}
                                        {/* @ts-ignore */}
                                        {edu.labName && (
                                            <div className="text-md font-medium text-muted-foreground mt-1 flex items-center">
                                                Research Lab:{" "}
                                                {/* @ts-ignore */}
                                                {edu.labLink ? (
                                                    <a
                                                        // @ts-ignore
                                                        href={edu.labLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="ml-1 hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4 inline group/link"
                                                    >
                                                        {/* @ts-ignore */}
                                                        {edu.labName}
                                                        <span className="inline-block ml-1 align-middle transform -translate-y-[1px]">
                                                            <ExternalLink size={14} className="text-muted-foreground opacity-70 group-hover/link:text-primary transition-colors" />
                                                        </span>
                                                    </a>
                                                ) : (
                                                    // @ts-ignore
                                                    <span className="ml-1">{edu.labName}</span>
                                                )}
                                            </div>
                                        )}
                                        {/* Period */}
                                        <div className="text-sm text-muted-foreground mb-2 mt-1">{edu.period}</div>
                                        {/* GPA / Desc */}
                                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mt-2">
                                            {edu.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold mb-6 text-foreground">
                                <Code2 className="mr-3 text-primary" /> Technical Skills
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Languages</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {cvData.skills.languages.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Tools & Platforms</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {cvData.skills.tools.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Knowledge</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {/* @ts-ignore */}
                                        {cvData.skills.knowledge && cvData.skills.knowledge.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Experience & Projects */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Experience */}
                        <section>
                            <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                <Briefcase className="mr-3 text-primary" /> Professional Experience
                            </h2>

                            <div className="space-y-10">
                                {cvData.experience.map((exp) => (
                                    <div key={exp.id} className="group bg-card border border-border rounded-xl p-6 hover-card">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                                                <div className="text-lg text-muted-foreground">{exp.organization}</div>
                                            </div>
                                            <div className="flex items-center text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md mt-2 md:mt-0">
                                                <Calendar size={14} className="mr-2" />
                                                {exp.period}
                                            </div>
                                        </div>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                                            {exp.descriptionItems.map((item, index) => (
                                                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Achievements */}
                        {/* Certifications & Awards */}
                        <section>
                            <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                <Award className="mr-3 text-primary" /> Certifications & Field Training
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* @ts-ignore */}
                                {cvData.certifications.map((item) => (
                                    <div key={item.id} className="bg-card border border-border rounded-xl p-6 hover-card flex flex-col h-full group relative">

                                        <div className="mb-4">
                                            {/* Title Row - Clickable if link exists */}
                                            <h3 className="font-bold text-lg leading-tight text-foreground mb-2 pr-6">
                                                {/* @ts-ignore */}
                                                {item.link ? (
                                                    <a
                                                        // @ts-ignore
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4 inline group/link"
                                                        title="View Certificate"
                                                    >
                                                        {item.title}
                                                        <span className="inline-block ml-1 align-middle transform -translate-y-[1px]">
                                                            <ExternalLink size={14} className="text-muted-foreground opacity-70 group-hover/link:text-primary transition-colors" />
                                                        </span>
                                                    </a>
                                                ) : (
                                                    item.title
                                                )}
                                            </h3>

                                            {/* Tag Row */}
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                <span className="inline-block px-2 py-1 bg-secondary text-muted-foreground text-xs font-semibold rounded-md uppercase tracking-wide border border-border/50">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-4 space-y-1">
                                            {/* Issuer with Icon */}
                                            <div className="text-sm font-medium text-muted-foreground flex items-start">
                                                <Building2 size={14} className="mr-2 opacity-70 shrink-0 mt-[3px]" />
                                                <span className="leading-tight">{item.issuer}</span>
                                            </div>
                                            {/* Date */}
                                            <div className="text-sm text-muted-foreground flex items-center">
                                                <Calendar size={14} className="mr-2 opacity-70" />
                                                {item.date}
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed mt-auto border-t border-border pt-3">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CVView;
