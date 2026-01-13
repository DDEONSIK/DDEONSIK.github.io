export interface DateInfo {
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

// ContactInfo removed as it was legacy lab data
