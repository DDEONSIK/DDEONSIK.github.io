import React, { useMemo } from 'react';
import { FileText, Calendar, User, Tag } from 'lucide-react';
import journals from '@/data/publication/journal.json';
import conferences from '@/data/publication/conference.json';

interface Publication {
    id: string;
    title: string;
    author: (string | { family?: string; given?: string; literal?: string })[];
    containerTitle?: string;
    issued: { "date-parts": number[][] };
    type?: string;
}

// Helper to format author names from CSL-JSON
const formatAuthors = (authors: any[]) => {
    return authors.map(a => {
        if (a.literal) return a.literal;
        if (a.family && a.given) return `${a.given} ${a.family}`;
        return 'Unknown Author';
    }).join(', ');
};

// My Name Variations for Highlighting
const MY_NAMES = ['HyunSik Jeon', 'Jeon Hyun-Sik', 'H. Jeon', '전현식', 'Jeon, Hyun-Sik', 'Jong-Eun Ha']; // Added Professor Ha just to test highlighting if needed, but primarily Jeon.

const PublicationItem = ({ pub, index }: { pub: Publication, index: number }) => {
    const title = pub.title;
    const year = pub.issued?.["date-parts"]?.[0]?.[0] || 'N/A';
    const authors = formatAuthors(pub.author);
    const journal = pub.containerTitle || 'Unknown Venue';
    const isThesis = title.includes("Master's Thesis") || title.includes("Undergraduate");

    // Check my contribution
    // Rough logic: First author? 
    // The user explicitly requested "Lead Researcher" for Master's papers (implied recent 1st author).
    // I will check if the first author matches 'Jeon'.
    const firstAuthor = pub.author[0];
    let firstAuthorName = "";
    if (firstAuthor) {
        if (typeof firstAuthor === 'object') {
            if (firstAuthor.literal) firstAuthorName = firstAuthor.literal;
            else if (firstAuthor.family) firstAuthorName = `${firstAuthor.family} ${firstAuthor.given}`;
        } else if (typeof firstAuthor === 'string') {
            firstAuthorName = firstAuthor;
        }
    }

    // Normalize for check
    const isFirstAuthor = firstAuthorName.includes("Jeon") || firstAuthorName.includes("전현식") || firstAuthorName.includes("HyunSik");

    return (
        <div className="flex gap-6 items-start group relative pl-8 border-l border-border pb-8 last:pb-0 last:border-0">
            {/* Timeline Dot */}
            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-background transition-colors ${isFirstAuthor ? 'bg-primary' : 'bg-muted-foreground/30'}`}></div>

            <div className="pt-0.5">
                <span className="text-sm font-mono text-muted-foreground mb-1 block">{year}</span>
                <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <div className="text-muted-foreground text-sm mt-1">
                    {authors.split(', ').map((auth, i, arr) => (
                        <span key={i} className={MY_NAMES.some(n => auth.includes(n) || n.includes(auth)) ? "text-foreground font-semibold underline decoration-primary/30" : ""}>
                            {auth}{i < arr.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                    <span className="px-2 py-0.5 bg-secondary rounded text-secondary-foreground font-medium flex items-center">
                        <FileText size={10} className="mr-1" /> {journal}
                    </span>
                    {isFirstAuthor && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded font-bold flex items-center">
                            <User size={10} className="mr-1" /> Lead Researcher
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const PublicationsList = () => {
    // 1. Merge and Filter
    const allPubs = useMemo(() => {
        const rawList = [...journals, ...conferences];

        // Filter for "Jeon" or "전현식"
        const myPubs = rawList.filter(p => {
            const authStr = JSON.stringify(p.author);
            return authStr.includes("Jeon") || authStr.includes("전현식");
        });

        // Add Undergraduate Thesis (Placeholder as requested)
        myPubs.push({
            id: 'undergrad-thesis',
            title: 'Development of Lane Keeping Assist System (LKAS) based on Sliding Window',
            author: [{ literal: 'Jeon Hyun-Sik' }, { literal: 'Ha Jong-Eun' }],
            containerTitle: 'Undergraduate Thesis (Capstone)',
            issued: { 'date-parts': [[2023]] },
            type: 'thesis'
        } as any);

        // Sort by year desc
        return myPubs.sort((a, b) => {
            const yA = Number(a.issued?.["date-parts"]?.[0]?.[0]) || 0;
            const yB = Number(b.issued?.["date-parts"]?.[0]?.[0]) || 0;
            return yB - yA;
        });
    }, []);

    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
                <FileText className="mr-2 text-primary" /> Publications
            </h2>
            <div className="relative">
                {allPubs.map((pub, idx) => (
                    <PublicationItem key={idx} pub={pub as any} index={idx} />
                ))}
            </div>
        </div>
    );
};

export default PublicationsList;
