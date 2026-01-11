import { DateInfo, Description } from '@/types/Base'

export type ProjectType = 'government' | 'industry';

export interface Project {
    id: number;
    title: string;
    funding: string;      // 지원기관
    startDate: DateInfo;  // 프로젝트 시작 시점
    endDate: DateInfo;    // 프로젝트 종료 시점
    isCompleted: boolean; // 완료 여부 (true: 완료, false: 진행중)
    type: ProjectType;    // 프로젝트 구분
    content?: string;     // 내용
    link?: string;
    description?: Description[]; // 이후 별도의 서술 구조로 변경 필요 -> dict 형태
}
