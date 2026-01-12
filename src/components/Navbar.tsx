import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Rocket, Users, BookOpen, GraduationCap, Mail, Brain, Presentation, Briefcase, Layout, Home, Moon, Sun, User, FileText, Camera, BrainCircuit } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    // Helper to render icons
    const renderIcon = (iconName?: string) => {
        switch (iconName) {
            case 'Home': return <Home size={18} />;
            case 'Rocket': return <Rocket size={18} />;
            case 'Users': return <Users size={18} />;
            case 'User': return <User size={18} />;
            case 'BookOpen': return <BookOpen size={18} />;
            case 'GraduationCap': return <GraduationCap size={18} />;
            case 'Mail': return <Mail size={18} />;
            case 'Brain': return <Brain size={18} />;
            case 'BrainCircuit': return <BrainCircuit size={18} />;
            case 'Presentation': return <Presentation size={18} />;
            case 'Briefcase': return <Briefcase size={18} />;
            case 'Layout': return <Layout size={18} />;
            case 'FileText': return <FileText size={18} />;
            case 'Camera': return <Camera size={18} />;
            default: return null;
        }
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const handleNavigation = (path: string, hash?: string) => {
        setIsOpen(false);
        setActiveDropdown(null);
        if (hash) {
            navigate(`${path}?area=${hash}`);
        } else {
            navigate(path);
        }
    };

    const navLinks = navigationData;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-lg py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center space-x-2 group">
                        <span className={`text-2xl font-bold tracking-tighter ${isScrolled
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-800 dark:text-white'
                            }`}>
                            AIS <span className="text-blue-600 dark:text-blue-400">LAB</span>
                        </span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button
                                    onClick={() => handleNavigation(link.path)}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                        ${location.pathname === link.path
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                            : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {link.iconName && <span className="mr-2">{renderIcon(link.iconName)}</span>}
                                    {link.name}
                                    {link.dropdown && <ChevronDown size={14} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-200" />}
                                </button>

                                {/* Dropdown Menu */}
                                {link.dropdown && (
                                    <div
                                        className={`absolute top-full left-0 w-56 pt-2 transition-all duration-200 origin-top-left
                                            ${activeDropdown === link.name ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
                                        `}
                                    >
                                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden ring-1 ring-black/5">
                                            {link.dropdown.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNavigation(link.path, item.hash);
                                                    }}
                                                    className="block w-full text-left px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors truncate"
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Theme Toggle Button (Desktop) */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="ml-2 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* Theme Toggle Button (Mobile) */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
                    }`}
            >
                <div className="p-4 space-y-2">
                    {navLinks.map((link) => (
                        <div key={link.name} className="space-y-1">
                            <button
                                onClick={() => !link.dropdown && handleNavigation(link.path)}
                                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-colors
                                    ${location.pathname === link.path
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <div className="flex items-center" onClick={() => handleNavigation(link.path)}>
                                    {link.iconName && <span className="mr-3">{renderIcon(link.iconName)}</span>}
                                    {link.name}
                                </div>
                                {link.dropdown && (
                                    <div onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdown(activeDropdown === link.name ? null : link.name);
                                    }} className="p-2">
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`}
                                        />
                                    </div>
                                )}
                            </button>

                            {/* Mobile Dropdown */}
                            {link.dropdown && (
                                <div
                                    className={`pl-11 pr-4 space-y-1 overflow-hidden transition-all duration-300 ${activeDropdown === link.name ? 'max-h-64 opacity-100 py-2' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    {link.dropdown.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => handleNavigation(link.path, item.hash)}
                                            className="block w-full text-left px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors truncate"
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
