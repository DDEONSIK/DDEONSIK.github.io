export interface HeroSection {
    label: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    profileImage: string;
}

export interface HomeContent {
    hero: HeroSection;
}
