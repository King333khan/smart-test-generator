import React, { useState } from 'react';
import { BookOpen, Calendar, MapPin, Search, FileDown, ExternalLink } from 'lucide-react';
import { PAST_PAPERS, YEARS, BOARDS } from '../data/mockPastPapers';
import { CLASSES, SUBJECTS } from '../data/mockSyllabus';
import './PastPapers.css';

const PastPapers = () => {
    const [filters, setFilters] = useState({
        cls: '',
        subject: '',
        year: '',
        board: '',
        search: ''
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };
            // Auto reset subject if class changes
            if (key === 'cls') {
                newFilters.subject = '';
            }
            return newFilters;
        });
    };

    const handleDownload = (paper) => {
        // Create a mock text content representing the past paper
        const content = `SMART TEST GENERATOR\n====================\n\nTitle: ${paper.title}\nClass: ${paper.classId}\nSubject: ${paper.subjectId}\nYear: ${paper.year}\nBoard: ${paper.board}\nType: ${paper.type}\n\n[This is a simulated downloaded paper from the Smart Test Generator.]`;
        
        // Create a blob and trigger download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${paper.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const filteredPapers = PAST_PAPERS.filter(paper => {
        const matchesClass = !filters.cls || paper.classId === filters.cls;
        const matchesSubject = !filters.subject || paper.subjectId === filters.subject;
        const matchesYear = !filters.year || paper.year === filters.year;
        const matchesBoard = !filters.board || paper.board === filters.board;
        const matchesSearch = !filters.search || paper.title.toLowerCase().includes(filters.search.toLowerCase());

        return matchesClass && matchesSubject && matchesYear && matchesBoard && matchesSearch;
    });

    return (
        <div className="past-papers-container fade-in">
            <div className="pp-header">
                <div>
                    <h1>Past Papers Archive</h1>
                    <p className="text-muted">Browse and download past board examination papers.</p>
                </div>
            </div>

            <div className="pp-filters glass">
                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search papers by title..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>

                <div className="filter-dropdowns">
                    <div className="filter-group">
                        <label>Class</label>
                        <select
                            value={filters.cls}
                            onChange={(e) => handleFilterChange('cls', e.target.value)}
                            className="form-select"
                        >
                            <option value="">All Classes</option>
                            {CLASSES.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Subject</label>
                        <select
                            value={filters.subject}
                            onChange={(e) => handleFilterChange('subject', e.target.value)}
                            className="form-select"
                            disabled={!filters.cls}
                        >
                            <option value="">All Subjects</option>
                            {filters.cls && SUBJECTS[filters.cls]?.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Year</label>
                        <select
                            value={filters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="form-select"
                        >
                            <option value="">All Years</option>
                            {YEARS.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Board</label>
                        <select
                            value={filters.board}
                            onChange={(e) => handleFilterChange('board', e.target.value)}
                            className="form-select"
                        >
                            <option value="">All Boards</option>
                            {BOARDS.map(board => (
                                <option key={board} value={board}>{board}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="pp-grid">
                {filteredPapers.length > 0 ? (
                    filteredPapers.map(paper => (
                        <div key={paper.id} className="pp-card glass slide-up">
                            <div className="pp-card-header">
                                <h3>{paper.title}</h3>
                                <span className="pp-badge">{paper.type}</span>
                            </div>

                            <div className="pp-card-meta">
                                <div className="meta-item">
                                    <BookOpen size={16} />
                                    <span>{paper.classId}th Class - {SUBJECTS[paper.classId]?.find(s => s.id === paper.subjectId)?.name || paper.subjectId}</span>
                                </div>
                                <div className="meta-item">
                                    <MapPin size={16} />
                                    <span>{paper.board} Board</span>
                                </div>
                                <div className="meta-item">
                                    <Calendar size={16} />
                                    <span>{paper.year}</span>
                                </div>
                            </div>

                            <div className="pp-card-actions">
                                <button className="btn btn-secondary">
                                    <ExternalLink size={18} />
                                    View
                                </button>
                                <button className="btn btn-primary" onClick={() => handleDownload(paper)}>
                                    <FileDown size={18} />
                                    Download Paper
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <BookOpen size={48} className="text-muted" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>No past papers found</h3>
                        <p className="text-muted">Try adjusting your filters to see more results.</p>
                        <button
                            className="btn btn-secondary"
                            style={{ mt: '1rem' }}
                            onClick={() => setFilters({ cls: '', subject: '', year: '', board: '', search: '' })}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PastPapers;
