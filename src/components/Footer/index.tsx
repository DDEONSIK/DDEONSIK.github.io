import React from 'react';
import { Github, Linkedin, Mail, BookOpen, User } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border py-12 mt-20">
            <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Copyright & Info */}
                <div className="text-sm text-muted-foreground text-center md:text-left space-y-1">
                    <p className="font-medium">
                        &copy; 2026 <a href="https://github.com/DDEONSIK" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">DDEONSIK</a>. All Rights Reserved.
                    </p>
                    <p className="text-xs opacity-80">
                        Based on <a href="https://github.com/SEOULTECH-AIS/SEOULTECH-AIS.github.io" target="_blank" rel="noopener noreferrer" className="hover:underline">SEOULTECH AIS Lab</a> | Assisted by <a href="https://antigravity.google/" target="_blank" rel="noopener noreferrer" className="hover:underline">Google Antigravity</a>
                    </p>
                    <p className="text-xs pt-1">
                        Contact: <a href="mailto:engineer0104@naver.com" className="hover:text-primary transition-colors">engineer0104@naver.com</a>
                    </p>
                </div>

                {/* Social Links (Right) */}
                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                    <a href="https://github.com/DDEONSIK" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-secondary/30 hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-semibold text-foreground">
                        <Github size={18} />
                        <span>GitHub</span>
                    </a>
                    <a href="https://scholar.google.com/citations?user=PpmME_0AAAAJ&hl=ko&oi=sra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-secondary/30 hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-semibold text-foreground">
                        <BookOpen size={18} />
                        <span>Scholar</span>
                    </a>
                    <a href="https://orcid.org/0009-0006-3150-6866" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-secondary/30 hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-semibold text-foreground">
                        <User size={18} />
                        <span>ORCID</span>
                    </a>
                    <a href="https://www.linkedin.com/in/hyunsik-jeon-0a808437a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-secondary/30 hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-semibold text-foreground">
                        <Linkedin size={18} />
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;