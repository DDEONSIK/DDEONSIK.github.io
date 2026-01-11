import { Description } from './Base';

export type CourseCategory = 'undergraduate' | 'graduate' | 'capstone';

export interface CourseItem extends Description {
    id: string; // Unique identifier
    // title and contents are inherited from Description
    
    category: CourseCategory;
    semester?: string; // Optional: e.g., "Spring", "Fall" or specific "2024 Spring"
    
    // Course Details
    credits?: number;
    gradeLevel?: string; // e.g., "3rd Year", "Masters"
    
    // Relationships
    prerequisite?: string[]; // IDs of prerequisite courses
    nextCourse?: string[]; // IDs of follow-up courses
    
    link?: string; // External link to course materials (syllabus, etc.)
}
