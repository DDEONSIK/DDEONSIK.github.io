import { NavItem } from '@/types/Navigation';

export const navigationData: NavItem[] = [
    {
        name: 'People',
        path: '/people',
        iconName: 'Users',
        dropdown: [
            { name: 'Professor', hash: 'professor' },
            { name: 'Members', hash: 'members' },
            { name: 'Alumni', hash: 'alumni' }
        ]
    },
    {
        name: 'Research',
        path: '/research',
        iconName: 'BookOpen',
        dropdown: [
            { name: 'Deep Learning / Deep RL', hash: '20000003952' },
            { name: 'Research Area 2', hash: 'research-area-2' },
            { name: 'Research Area 3', hash: 'research-area-3' },
            { name: 'Research Area 4', hash: 'research-area-4' },
            { name: 'Research Area 5', hash: 'research-area-5' }
        ]
    },
    {
        name: 'Courses',
        path: '/courses',
        iconName: 'Presentation',
        dropdown: [
            { name: 'Undergraduate', hash: 'undergraduate' },
            { name: 'Graduate', hash: 'graduate' },
            { name: 'Capstone Design', hash: 'capstone' }
        ]
    },
    {
        name: 'Projects',
        path: '/projects',
        iconName: 'Briefcase',
        dropdown: [
            { name: 'Ongoing', hash: 'ongoing' },
            { name: 'Completed [Gov]', hash: 'completed-gov' },
            { name: 'Completed [Industry]', hash: 'completed-industry' }
        ]
    },
    {
        name: 'Publications',
        path: '/publications',
        iconName: 'GraduationCap',
        dropdown: [
            { name: 'All Publications', hash: 'all' },
            { name: 'International Journal', hash: 'international-journal' },
            { name: 'International Conference', hash: 'international-conference' },
            { name: 'Domestic Journal', hash: 'domestic-journal' },
            { name: 'Domestic Conference', hash: 'domestic-conference' }
        ]
    },
    { name: 'Board', path: '/board', iconName: 'Layout' },
    { name: 'Contact', path: '/contact', iconName: 'Mail' }
];
