export interface NavItem {
    name: string;
    path: string;
    iconName?: 'Home' | 'Users' | 'BookOpen' | 'GraduationCap' | 'Mail' | 'Presentation' | 'Briefcase' | 'Layout';
    dropdown?: { name: string; hash: string }[];
}
