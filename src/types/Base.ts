export interface DateInfo{
    year: number;
    month: number;
    day?: number;
}

export interface Description {
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    // content can be a simple string, a list of strings, or an array of sub-descriptions
    contents?: string | string[] | Description[];
}

export interface ContactInfo {
    address: {
        university: string;
        room: string;
        street: string;
    };
    email: string;
    phone: string;
    recruitment: {
        title: string;
        description: string;
    };
    research: {
        title: string;
        description: string[]; // Changed to array for multiple paragraphs
        note: string;
        capabilities: string;
    };
    labLife: {
        title: string;
        description: string;
    };
    contactInstruction: {
        title: string;
        description: string;
    };
}
