export type PublicationCategory = 'all' | 'international-journal' | 'international-conference' | 'domestic-journal' | 'domestic-conference';

export interface PublicationItem {
    id: string;
    title: string;
    venue: string;
    year: number;
    category: PublicationCategory | string;
    author: string;
    doi?: string;
    link?: string;
}
