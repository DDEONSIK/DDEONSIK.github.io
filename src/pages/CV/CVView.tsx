import { Calendar, Briefcase, GraduationCap, Award, Code2, Cpu, FileText, User, ExternalLink, Building2, ArrowRight, FileCheck, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import cvData from '@/data/cv.json';
// @ts-ignore
import cvPdf from '@/assets/Hyun-Sik_Jeon_Curriculum_Vitae.pdf';

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
                    <a
                        href={cvPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold rounded-lg transition-all shadow-md hover:shadow-lg shadow-primary/10 hover:shadow-primary/20 group shrink-0"
                    >
                        <FileText size={20} className="text-primary-foreground transition-transform group-hover:scale-105" />
                        View PDF CV
                    </a>
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
                                    <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-1">Military Service (Mandatory)</h4>
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
                                         <div className="text-md font-medium text-muted-foreground mt-1 flex items-center gap-1.5">
                                             {edu.department}
                                         </div>
                                         {/* Thesis Advisor [NEW] */}
                                         {/* @ts-ignore */}
                                         {edu.thesisAdvisor && (
                                             <div className="text-md font-medium text-muted-foreground mt-1">
                                                 Thesis Advisor: <span className="font-normal text-foreground">{edu.thesisAdvisor}</span>
                                             </div>
                                         )}
                                         {/* Thesis Info */}
                                         {/* @ts-ignore */}
                                         {edu.thesisTitle && (
                                             <div className="text-md font-medium text-muted-foreground mt-1">
                                                 Thesis Title:{" "}
                                                 {/* @ts-ignore */}
                                                 {edu.thesisLink ? (
                                                     <a
                                                         // @ts-ignore
                                                         href={edu.thesisLink}
                                                         target="_blank"
                                                         rel="noopener noreferrer"
                                                         className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4 inline group/thesis font-normal"
                                                     >
                                                         {/* @ts-ignore */}
                                                         {edu.thesisTitle}
                                                         <span className="inline-block ml-1 align-middle transform -translate-y-[1px]">
                                                             <ExternalLink size={14} className="text-muted-foreground opacity-70 group-hover/thesis:text-primary transition-colors" />
                                                         </span>
                                                     </a>
                                                 ) : (
                                                     // @ts-ignore
                                                     <span className="font-normal">{edu.thesisTitle}</span>
                                                  )}
                                             </div>
                                         )}
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
                                                         className="ml-1 hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4 inline group/link font-normal"
                                                     >
                                                         {/* @ts-ignore */}
                                                         {edu.labName}
                                                         <span className="inline-block ml-1 align-middle transform -translate-y-[1px]">
                                                             <ExternalLink size={14} className="text-muted-foreground opacity-70 group-hover/link:text-primary transition-colors" />
                                                         </span>
                                                     </a>
                                                 ) : (
                                                     // @ts-ignore
                                                     <span className="ml-1 font-normal">{edu.labName}</span>
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
                                {Object.entries(cvData.skills).map(([category, items]) => (
                                    <div key={category}>
                                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">{category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {/* @ts-ignore */}
                                            {Array.isArray(items) && items.map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Experience & Projects */}
                    <div className="lg:col-span-8 space-y-10">

                        {/* Experience */}
                        <section>
                            <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                <Briefcase className="mr-3 text-primary" /> Research & Professional Experience
                            </h2>

                             <div className="space-y-6">
                                 {cvData.experience.map((exp) => (
                                     <div key={exp.id} className="group bg-card border border-border rounded-xl p-6 hover-card">
                                         <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                             <div>
                                                 <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                                             </div>
                                             <div className="flex items-center text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md mt-2 md:mt-0 shrink-0 whitespace-nowrap">
                                                 <Calendar size={14} className="mr-2" />
                                                 {exp.period}
                                             </div>
                                         </div>
                                         <div className="text-lg text-muted-foreground flex items-center gap-1.5 mt-1 mb-3">
                                             <Building2 size={16} className="text-muted-foreground opacity-70 shrink-0" />
                                             {/* @ts-ignore */}
                                             {exp.website ? (
                                                 <a
                                                     // @ts-ignore
                                                     href={exp.website}
                                                     target="_blank"
                                                     rel="noopener noreferrer"
                                                     className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4 inline-flex items-center gap-1"
                                                 >
                                                     {exp.organization}
                                                     <ExternalLink size={13} className="text-muted-foreground opacity-60 inline" />
                                                 </a>
                                             ) : (
                                                 <span>{exp.organization}</span>
                                             )}
                                         </div>
                                         {/* Advisor / Supervisor [NEW] */}
                                         {/* @ts-ignore */}
                                         {(exp.advisor || exp.supervisor) && (
                                             <div className="text-sm italic text-muted-foreground mb-4">
                                                 {/* @ts-ignore */}
                                                 {exp.advisor ? `Advisor: ${exp.advisor}` : `Supervisor: ${exp.supervisor}`}
                                             </div>
                                         )}
                                         <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                                             {exp.descriptionItems.map((item, index) => (
                                                 <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                             ))}
                                         </ul>
                                         {/* @ts-ignore */}
                                         {exp.actionLink && (
                                             <div className="mt-6 flex justify-end">
                                                 <Link
                                                     // @ts-ignore
                                                     to={exp.actionLink}
                                                     className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold rounded-lg transition-all group"
                                                 >
                                                     {exp.actionLabel || "View Details"}
                                                     <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                                 </Link>
                                             </div>
                                         )}
                                     </div>
                                 ))}
                             </div>
                         </section>

                        {/* Research Projects */}
                        {/* @ts-ignore */}
                        {cvData.projects && cvData.projects.length > 0 && (
                            <section>
                                <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                    <Workflow className="mr-3 text-primary" /> Projects
                                </h2>
                                <div className="space-y-6">
                                    {/* @ts-ignore */}
                                    {cvData.projects.map((proj) => (
                                        <div key={proj.id} className="group bg-card border border-border rounded-xl p-6 hover-card">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors pr-4">{proj.title}</h3>
                                                </div>
                                                <div className="flex items-center text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md mt-2 md:mt-0 shrink-0 whitespace-nowrap">
                                                    <Calendar size={14} className="mr-2" />
                                                    {proj.period}
                                                </div>
                                            </div>
                                            <div className="text-lg text-muted-foreground flex items-center gap-1.5 mt-1 mb-3">
                                                <Building2 size={16} className="text-muted-foreground opacity-70 shrink-0" />
                                                <span>{proj.organization}</span>
                                            </div>
                                            {/* Advisor */}
                                            {/* @ts-ignore */}
                                            {proj.advisor && (
                                                <div className="text-sm italic text-muted-foreground mb-3">
                                                    Advisor: {proj.advisor}
                                                </div>
                                            )}
                                            {/* Funding */}
                                            {/* @ts-ignore */}
                                            {proj.funding && (
                                                <div className="text-md text-muted-foreground mb-3">
                                                    {proj.funding}
                                                </div>
                                            )}
                                            {/* Description Items */}
                                            {/* @ts-ignore */}
                                            {proj.descriptionItems && proj.descriptionItems.length > 0 && (
                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mt-3 border-t border-border/50 pt-3">
                                                    {/* @ts-ignore */}
                                                    {proj.descriptionItems.map((item, index) => (
                                                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Teaching Experiences */}
                        {/* @ts-ignore */}
                        {cvData.teaching && cvData.teaching.length > 0 && (
                            <section>
                                <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                    <GraduationCap className="mr-3 text-primary" /> Teaching Experiences
                                </h2>
                                <div className="space-y-6">
                                    {/* @ts-ignore */}
                                    {cvData.teaching.map((teach) => (
                                        <div key={teach.id} className="group bg-card border border-border rounded-xl p-6 hover-card">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{teach.role}</h3>
                                                </div>
                                                <div className="flex items-center text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md mt-2 md:mt-0 shrink-0 whitespace-nowrap">
                                                    <Calendar size={14} className="mr-2" />
                                                    {teach.period}
                                                </div>
                                            </div>
                                            <div className="text-lg text-muted-foreground flex items-center gap-1.5 mt-1 mb-3">
                                                <Building2 size={16} className="text-muted-foreground opacity-70 shrink-0" />
                                                <span>{teach.organization}</span>
                                            </div>
                                            {/* Instructor / Supervisor [NEW] */}
                                            {/* @ts-ignore */}
                                            {teach.instructor && (
                                                <div className="text-sm italic text-muted-foreground mb-3">
                                                    Instructor: {teach.instructor}
                                                </div>
                                            )}
                                            <div className="text-md text-muted-foreground mb-3">{teach.course}</div>
                                            {/* @ts-ignore */}
                                            {teach.descriptionItems && teach.descriptionItems.length > 0 && (
                                                <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
                                                    {/* @ts-ignore */}
                                                    {teach.descriptionItems.map((item, index) => (
                                                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Honors & Awards */}
                        {/* @ts-ignore */}
                        {cvData.awards && cvData.awards.length > 0 && (
                            <section>
                                <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                    <Award className="mr-3 text-primary" /> Honors & Awards
                                </h2>
                                <div className="space-y-6">
                                    {/* @ts-ignore */}
                                    {cvData.awards.map((award) => (
                                        <div key={award.id} className="group bg-card border border-border rounded-xl p-6 hover-card">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{award.title}</h3>
                                                </div>
                                                <div className="flex items-center text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md mt-2 md:mt-0 shrink-0 whitespace-nowrap">
                                                    <Calendar size={14} className="mr-2" />
                                                    {award.date}
                                                </div>
                                            </div>
                                            <div className="text-lg text-muted-foreground flex items-center gap-1.5 mt-1 mb-3">
                                                <Building2 size={16} className="text-muted-foreground opacity-70 shrink-0" />
                                                <span>{award.issuer}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed mt-4 border-t border-border pt-3">
                                                {award.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Achievements */}
                        {/* Certifications & Awards */}
                        <section>
                            <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                <FileCheck className="mr-3 text-primary" /> Certifications & Training
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
