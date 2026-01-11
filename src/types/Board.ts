import { DateInfo, Description } from './Base';

export interface BoardItem extends Description {
    id: string;
    title: string;
    date: DateInfo;
    author: string;
}