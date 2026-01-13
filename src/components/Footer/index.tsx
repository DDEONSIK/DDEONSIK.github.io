import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Copyright */}
                <div className="text-sm text-muted-foreground text-center md:text-left space-y-1">
                    <p className="font-medium">
                        &copy; 2026 <a href="https://github.com/DDEONSIK" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">DDEONSIK</a>. All Rights Reserved.
                    </p>
                    <p className="text-xs opacity-80">
                        Based on <a href="https://github.com/SEOULTECH-AIS/SEOULTECH-AIS.github.io" target="_blank" rel="noopener noreferrer" className="hover:underline">SEOULTECH AIS Lab</a> | Assisted by <a href="https://antigravity.google/" target="_blank" rel="noopener noreferrer" className="hover:underline">Google Antigravity</a>
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center md:justify-end gap-6 opacity-0">
                    {/* Links moved to CV header */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;