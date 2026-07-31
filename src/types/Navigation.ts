export interface NavItem {
    name: string;
    path: string;
    iconName?: 'Home' | 'Users' | 'BookOpen' | 'GraduationCap' | 'Mail' | 'Presentation' | 'Briefcase' | 'Layout' | 'User' | 'FileText' | 'Camera' | 'BrainCircuit' | 'Heart';
    dropdown?: { name: string; hash: string }[];
}
