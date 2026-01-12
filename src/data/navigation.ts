import { NavItem } from '@/types/Navigation';

export const navigationData: NavItem[] = [
    {
        name: 'Home',
        path: '/',
        iconName: 'Home'
    },
    {
        name: 'About',
        path: '/about',  // Was /people in original, mapping to About
        iconName: 'User'
    },
    {
        name: 'Research',
        path: '/research',
        iconName: 'BrainCircuit', // Changed to represent AI
        dropdown: [
            { name: 'Projects', hash: 'projects' }, // Merged view
            { name: 'Publications', hash: 'publications' }
        ]
    },
    {
        name: 'CV / Resume',
        path: '/cv', // New section
        iconName: 'FileText'
    },
    {
        name: 'Life',
        path: '/life', // Was /courses or similar, repurposed for "Life & Interests"
        iconName: 'Camera'
    },
    {
        name: 'Contact',
        path: '/contact',
        iconName: 'Mail'
    }
];
