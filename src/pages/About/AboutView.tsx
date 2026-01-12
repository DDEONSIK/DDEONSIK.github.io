import React from 'react';
import { User, Code2, Heart, Zap, Terminal, Coffee, Book } from 'lucide-react';
import cvIdImg from '@/assets/profile/cv_id.jpg';

const AboutView = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container-custom max-w-5xl">

                {/* Profile Header (Clean & Tidy) */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-20">
                    {/* ID Photo (Formal) */}
                    <div className="shrink-0 w-48 h-64 rounded-lg overflow-hidden shadow-md border border-border">
                        <img 
                            src={cvIdImg} 
                            alt="Jeon Hyun-Sik Identification" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Intro Text */}
                    <div className="flex-1 text-center md:text-left pt-2">
                        <h4 className="text-primary font-mono text-sm tracking-widest mb-3 uppercase">About Me</h4>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                            Engineer Jeon Hyun-Sik
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I am a researcher bridging the gap between perception and reasoning. 
                            My work focuses on building autonomous systems that are not just intelligent, but reliable and interpretable.
                            I value clean code, clear thoughts, and continuous improvement.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                             <div className="px-4 py-2 bg-secondary rounded-full text-foreground text-sm font-medium flex items-center">
                                <Terminal size={16} className="mr-2 text-primary"/> System Architect
                             </div>
                             <div className="px-4 py-2 bg-secondary rounded-full text-foreground text-sm font-medium flex items-center">
                                <Zap size={16} className="mr-2 text-primary"/> Fast Learner
                             </div>
                             <div className="px-4 py-2 bg-secondary rounded-full text-foreground text-sm font-medium flex items-center">
                                <Coffee size={16} className="mr-2 text-primary"/> Team Player
                             </div>
                        </div>
                    </div>
                </div>

                {/* Narrative Grid (Structured) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Card 1 */}
                    <div className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                            <Code2 size={20} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">Engineering Philosophy</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            "Robustness over Complexity." <br/>
                            I believe the best systems are those that can be trusted. In my research on 3D Visual Grounding and Occupancy Networks, I prioritize algorithms that perform consistently in the real world, ensuring safety and reliability.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                            <Book size={20} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">Continuous Growth</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Technology never stops evolving, and neither do I. <br/>
                            I actively engage with the open-source community and stay updated with the latest papers in CV and Robotics. I view every challenge as an opportunity to refine my mental models and technical skills.
                        </p>
                    </div>

                    {/* Card 3 (Full Width) */}
                    <div className="md:col-span-2 bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start">
                         <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <Heart size={20} />
                        </div>
                        <div>
                             <h3 className="text-xl font-bold mb-3 text-foreground">Beyond the Workspace</h3>
                             <p className="text-muted-foreground leading-relaxed">
                                 When I step away from the keyboard, I seek balance through photography and cycling. 
                                 These hobbies teach me patience and perspective—qualities that directly translate to better engineering. 
                                 I am also a firm believer in knowledge sharing and enjoy mentoring junior students in my lab.
                             </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AboutView;
