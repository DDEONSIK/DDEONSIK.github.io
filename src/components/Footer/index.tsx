import React from 'react';
import { Github, Linkedin, Mail, BookOpen, User } from 'lucide-react';
import footerData from '@/data/footer.json';

const iconMap: { [key: string]: any } = {
    Github,
    Linkedin,
    Mail,
    BookOpen,
    User
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border py-12 mt-20">
            <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Copyright & Info */}
                <div className="text-sm text-muted-foreground text-center md:text-left space-y-1">
                    <p className="font-medium">
                        &copy; {footerData.copyrightYear} <a href={footerData.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{footerData.company}</a>. All Rights Reserved.
                    </p>
                    <p className="text-xs opacity-80">
                        Based on SEOULTECH AIS Lab | Provided by Google Antigravity
                    </p>
                    <p className="text-xs pt-1">
                        Contact: <a href={`mailto:${footerData.contact.email}`} className="hover:text-primary transition-colors">{footerData.contact.label}</a>
                    </p>
                </div>

                {/* Social Links (Right) */}
                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                    {footerData.socialLinks.map((link) => {
                        const Icon = iconMap[link.icon] || User;
                        return (
                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-semibold text-foreground">
                                <Icon size={18} />
                                <span>{link.name}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
};

export default Footer;