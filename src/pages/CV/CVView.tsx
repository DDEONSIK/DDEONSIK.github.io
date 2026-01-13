import React from 'react';
import { Calendar, Briefcase, GraduationCap, Award, Code2, Cpu, Github, Linkedin, Mail, BookOpen, User } from 'lucide-react';

const CVView = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container-custom max-w-5xl">

                {/* Header */}
                <header className="mb-16 border-b border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Curriculum Vitae</h1>
                        <p className="text-xl text-muted-foreground flex items-center gap-2">
                            <Briefcase size={20} className="text-primary" />
                            Autonomous Perception Engineer & Researcher
                        </p>
                    </div>

                    {/* Social Links moved to Footer */}
                    <div className="hidden"></div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Education & Skills (Sticky-ish) */}
                    <div className="space-y-12">

                        {/* Education */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold mb-6 text-foreground">
                                <GraduationCap className="mr-3 text-primary" /> Education
                            </h2>
                            <div className="space-y-8 border-l-2 border-border ml-2 pl-6 relative">
                                {/* Item 1 */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
                                    <h3 className="font-bold text-lg">M.S. in Artificial Intelligence</h3>
                                    <div className="text-primary font-medium">SeoulTech</div>
                                    <div className="text-sm text-muted-foreground mb-2">2024 - Present</div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Focus: 3D Vision, Sensor Fusion for Autonomous Driving.
                                        <br />GPA: 4.5/4.5
                                    </p>
                                </div>
                                {/* Item 2 */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-border ring-4 ring-background"></div>
                                    <h3 className="font-bold text-lg">B.S. in Automotive Engineering</h3>
                                    <div className="text-muted-foreground font-medium">Shinhan Univ.</div>
                                    <div className="text-sm text-muted-foreground mb-2">2018 - 2024</div>
                                    <p className="text-sm text-muted-foreground">
                                        Focus: Embedded Systems, Vehicle Dynamics.
                                    </p>
                                </div>
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
                                        {['Python', 'C++', 'MATLAB', 'TypeScript'].map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">AI / Frameworks</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['PyTorch', 'TensorFlow', 'Opencv', 'Scikit-learn'].map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Tools & Platforms</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Docker', 'Linux (Ubuntu)', 'ROS 2', 'Git'].map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Experience & Projects (Timeline) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Experience */}
                        <section>
                            <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                <Briefcase className="mr-3 text-primary" /> Professional Experience
                            </h2>

                            <div className="space-y-10">
                                {/* Experience Item */}
                                <div className="group bg-card border border-border rounded-xl p-6 hover-card">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Graduate Researcher</h3>
                                            <div className="text-lg text-muted-foreground">Neural Systems Lab (SeoulTech)</div>
                                        </div>
                                        <div className="flex items-center text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md mt-2 md:mt-0">
                                            <Calendar size={14} className="mr-2" />
                                            2024.03 - Present
                                        </div>
                                    </div>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                                        <li>Conducting research on <strong>3D Visual Grounding</strong> using relational depth text.</li>
                                        <li>Developing lightweight <strong>UniAD</strong> models for edge-device deployment.</li>
                                        <li>Implementing multi-view 3D occupancy networks (ViewFormer) for complex urban scenes.</li>
                                    </ul>
                                </div>

                                {/* Experience Item */}
                                <div className="group bg-card border border-border rounded-xl p-6 hover-card">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Undergraduate Research Intern</h3>
                                            <div className="text-lg text-muted-foreground">Intelligent Mobility Lab</div>
                                        </div>
                                        <div className="flex items-center text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md mt-2 md:mt-0">
                                            <Calendar size={14} className="mr-2" />
                                            2022.06 - 2023.12
                                        </div>
                                    </div>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                                        <li>Developed a <strong>Lane Keeping Assist System (LKAS)</strong> using sliding window algorithms.</li>
                                        <li>Participated in the 2023 University Creative Mobility Competition (Bronze Award).</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Recent Publications Preview */}
                        <section>
                            <h2 className="flex items-center text-3xl font-bold mb-8 text-foreground">
                                <Award className="mr-3 text-primary" /> Key Achievements
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-secondary/30 p-6 rounded-xl border border-border">
                                    <Cpu className="text-accent mb-4" size={32} />
                                    <h3 className="font-bold text-lg mb-2">Domestic Conference Best Paper</h3>
                                    <p className="text-sm text-muted-foreground">ICROS 2025 - Awarded for "Lightweight UniAD" research.</p>
                                </div>
                                <div className="bg-secondary/30 p-6 rounded-xl border border-border">
                                    <Award className="text-accent mb-4" size={32} />
                                    <h3 className="font-bold text-lg mb-2">Automotive Engineer License</h3>
                                    <p className="text-sm text-muted-foreground">Certified by HRD Korea (2022).</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CVView;
