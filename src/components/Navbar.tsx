import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, User, FileText, BrainCircuit, Mail, Heart } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // Theme toggle removed for now to enforce "Clean" look, or can be kept if desired. 
    // Keeping it simple.

    // Icon helper
    const renderIcon = (iconName?: string) => {
        switch (iconName) {
            case 'Home': return <Home size={18} />;
            case 'User': return <User size={18} />;
            case 'BrainCircuit': return <BrainCircuit size={18} />;
            case 'FileText': return <FileText size={18} />;
            case 'Mail': return <Mail size={18} />;
            case 'Heart': return <Heart size={18} />;
            default: return null;
        }
    };

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-background/90 backdrop-blur-md border-b border-border py-4 shadow-sm'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center">
                    {/* Brand */}
                    <NavLink to="/" className="group">
                        <span className="text-xl md:text-2xl font-heading font-bold tracking-tight text-foreground">
                            Hyun-Sik <span className="text-primary">Jeon</span>
                        </span>
                    </NavLink>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationData.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `
                                    flex items-center text-sm font-medium transition-colors duration-200
                                    ${isActive
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }
                                `}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg transition-all duration-300 origin-top overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6 space-y-4">
                    {navigationData.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => `
                                flex items-center p-3 rounded-lg text-base font-medium transition-colors
                                ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }
                            `}
                        >
                            <span className="mr-3">{renderIcon(link.iconName)}</span>
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
