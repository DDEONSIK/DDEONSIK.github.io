import React, { useState } from 'react';
import { BoardItem } from '@/types/Board';
import { MessageSquare, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import './Board.css';

interface BoardViewProps {
    data: BoardItem[];
}

const formatDate = (date: { year: number; month: number; day?: number }) => {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day || 1).padStart(2, '0')}`;
};

const BoardView: React.FC<BoardViewProps> = ({ data }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const renderContents = (contents: any) => {
        if (!contents) return null;
        if (typeof contents === 'string') {
            return <p className="whitespace-pre-wrap">{contents}</p>;
        }
        if (Array.isArray(contents)) {
            return (
                <ul className="list-disc list-inside space-y-1">
                    {contents.map((content, idx) => (
                        <li key={idx}>{typeof content === 'string' ? content : JSON.stringify(content)}</li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <div className="board-wrapper">
            <div className="board-container">
                {/* Header */}
                <div className="board-header">
                    <h1 className="board-title">
                        Board
                    </h1>
                    <div className="board-divider"></div>
                </div>

                {/* Board List */}
                <div className="board-list-container">
                    <div className="board-table-wrapper">
                        <table className="board-table">
                            <thead className="board-thead">
                                <tr>
                                    <th className="board-th w-20 text-center">No.</th>
                                    <th className="board-th">Title</th>
                                    <th className="board-th w-40">Author</th>
                                    <th className="board-th w-40">Date</th>
                                </tr>
                            </thead>
                            <tbody className="board-tbody">
                                {data.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <tr 
                                            className={`board-tr group ${expandedId === item.id ? 'bg-muted/30' : ''}`}
                                            onClick={() => toggleExpand(item.id)}
                                        >
                                            <td className="board-td-no">
                                                {data.length - index}
                                            </td>
                                            <td className="board-td-title">
                                                <div className="board-title-content">
                                                    <MessageSquare size={16} className={`board-icon ${expandedId === item.id ? 'opacity-100' : ''}`} />
                                                    <span className={`board-text-title ${expandedId === item.id ? 'text-primary' : ''}`}>
                                                        {item.title}
                                                    </span>
                                                    {expandedId === item.id ? 
                                                        <ChevronUp size={14} className="ml-2 text-primary" /> : 
                                                        <ChevronDown size={14} className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    }
                                                </div>
                                            </td>
                                            <td className="board-td-meta">
                                                <div className="board-meta-content">
                                                    <User size={14} className="mr-2" />
                                                    <span>{item.author}</span>
                                                </div>
                                            </td>
                                            <td className="board-td-date">
                                                <div className="board-meta-content">
                                                    <Calendar size={14} className="mr-2" />
                                                    <span>{formatDate(item.date)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedId === item.id && (
                                            <tr className="bg-muted/10 cursor-default animate-fade-in-up">
                                                <td colSpan={4} className="px-12 py-8">
                                                    <div className="text-foreground/80 leading-relaxed pl-6 border-l-2 border-primary/20">
                                                        {renderContents(item.contents)}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardView;
