import { Description } from './Base';

// 1. 학위 정보 (공통)
export interface DegreeInfo {
    degree: 'B.S.' | 'M.S.' | 'Ph.D.' | 'M.S./Ph.D.' | 'Researcher';
    school: string;
    year: number | string;
    thesis?: string;
}

// 2. 기본 정보 (Base)
export interface BasePerson {
    id: number;         // 호출 번호
    nameKo: string;     // 국문명
    nameEn: string;     // 영문명
    role: string;       // 직책
    email?: string;     // email 주소
    academicBackground?: DegreeInfo[];
    image?: string;     // 이미지 경로 오버라이드용 (선택)
}

// 3. 교수 (Professor)
export interface Professor extends BasePerson {
    category: 'Professor';
    phone: string;
    career: { period: string; role: string; }[];
    awards: string[];
    researchInterests: string[];
}

// 4. 학생 (재학생 + 졸업생 통합)
export interface Student extends BasePerson {
    category: 'Member' | 'Alumni';
    
    /**
     * 과정 정보 및 졸업 구분
     * - M.S./Ph.D.: 석박사 통합 과정
     * - General Graduated: 일반대학원 졸업
     * - Professional Graduated: 특수대학원 졸업
     */
    course: 'Ph.D.' | 'M.S.' | 'M.S./Ph.D.' | 'Researcher' | 'General Graduated' | 'Professional Graduated';

    /**
     * 통합 상세 정보
     * - title: 'Research Interests' or 'Current Workplace'
     * - contents: string[]
     */
    description: Description[]; 
}

export type Person = Professor | Student;