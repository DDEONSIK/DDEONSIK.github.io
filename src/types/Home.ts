import { Description } from './Base';

export interface HeroSection extends Description {
    welcomeLabel?: string;
    highlightedTitle?: string;
}

export interface CtaSection extends Description {
    buttonLabel?: string;
}

export interface HomeContent {
    hero: HeroSection;
    researchSummary: Description;
    cta: CtaSection;
}
