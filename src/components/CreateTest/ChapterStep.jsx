import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CHAPTERS } from '../../data/mockSyllabus';

const ChapterStep = ({ testData, expandedChapters, toggleChapterExpansion, toggleChapterOrTopic }) => {
    return (
        <div className="wizard-step fade-in">
            <h2>Select Chapters / Topics</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                Choose the topics to include in the physical test.
            </p>

            <div className="chapters-list">
                {CHAPTERS[`${testData.cls}_${testData.subject}`]?.map(ch => (
                    <div key={ch.id} className="chapter-group" style={{ marginBottom: '1rem' }}>
                        <div className={`chapter-item ${testData.chapters.includes(ch.id) ? 'selected' : ''}`} style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                <input
                                    type="checkbox"
                                    checked={testData.chapters.includes(ch.id)}
                                    onChange={() => toggleChapterOrTopic(ch.id, true, ch.topics?.map(t => t.id) || [])}
                                />
                                <span className={(testData.subject === 'urd' || testData.subject === 'isl' || testData.subject === 'tar') ? 'urdu-text' : ''}>{ch.name}</span>
                            </div>
                            {ch.topics && ch.topics.length > 0 && (
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '0.25rem', border: 'none', background: 'transparent' }}
                                    onClick={() => toggleChapterExpansion(ch.id)}
                                >
                                    {expandedChapters.includes(ch.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                            )}
                        </div>
                        {ch.topics && ch.topics.length > 0 && expandedChapters.includes(ch.id) && (
                            <div className="topics-list fade-in" style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {ch.topics.map(topic => (
                                    <label key={topic.id} className={`chapter-item ${testData.chapters.includes(topic.id) ? 'selected' : ''}`} style={{ fontSize: '0.9rem', padding: '0.5rem', minHeight: 'auto' }}>
                                        <input
                                            type="checkbox"
                                            checked={testData.chapters.includes(topic.id)}
                                            onChange={() => toggleChapterOrTopic(topic.id, false)}
                                        />
                                        <span className={(testData.subject === 'urd' || testData.subject === 'isl' || testData.subject === 'tar') ? 'urdu-text' : ''}>{topic.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )) || <p className="text-muted">No mock chapters available for this selection. Try 9th Physics.</p>}
            </div>
        </div>
    );
};

export default ChapterStep;
