import React from 'react';
import { Mail, MapPin, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import AISLogo from '@/assets/logo/AIS_logo.png';
import SeoulTechLogo from '@/assets/logo/Logo_seoultech_bar.jpg';
import './Footer.css';

const Footer = () => {
    const { theme, setTheme } = useTheme();

    return (
        <footer className="footer-root">
            <div className="footer-container">
                <div className="footer-inner">

                    {/* Left: Content (Lab Info, Contact, Legal) */}
                    <div className="footer-left">
                        {/* Title */}
                        <h3 className="footer-title">Autonomous Intelligent Systems Lab</h3>

                        {/* Wrapper for Contact + Divider + Legal in one line */}
                        <div className="footer-info-wrapper">

                            {/* Contact Info Group */}
                            <div className="footer-contact-group">
                                <div className="footer-contact-item">
                                    <MapPin size={14} className="text-muted-foreground" />
                                    <span>Room 702, Frontier Hall (#32)</span>
                                </div>
                                <div className="footer-contact-item">
                                    <Mail size={14} className="text-muted-foreground" />
                                    <span>jeha@seoultech.ac.kr</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="footer-divider"></div>

                            {/* Legal Info Group */}
                            <div className="footer-legal-group">
                                <a
                                    href="https://www.seoultech.ac.kr/sinfo/persnal/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-legal-link"
                                >
                                    개인정보처리방침
                                </a>
                                <span className="text-border">|</span>
                                <span>
                                    &copy; {new Date().getFullYear()} AIS Lab. All rights reserved.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Theme Toggle & Logos */}
                    <div className="footer-right">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="footer-theme-btn"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="footer-logo-container">
                            <img
                                src={AISLogo}
                                alt="AIS Lab Logo"
                                className="footer-logo"
                            />
                            <div className="footer-logo-divider"></div>
                            <img
                                src={SeoulTechLogo}
                                alt="SeoulTech Logo"
                                className="footer-logo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;