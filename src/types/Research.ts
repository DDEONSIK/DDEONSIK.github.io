import { Description } from '@/types/Base';

export type ResearchIconName = 'Brain' | 'Network' | 'Cpu' | 'ScanEye' | 'Microscope';

export interface ResearchTopic {
    id: string;
    title: string;
    icon: ResearchIconName;
    description: Description[];
    originalUrl?: string;
    imageUrl?: string;
    publications?: string[];
}