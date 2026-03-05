import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Library } from 'lucide-react';
import { CLASSES, SUBJECTS, CHAPTERS } from '../data/mockSyllabus';

const ManageQuestions = () => {
    const [cls, setCls] = useState('');
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [type, setType] = useState('mcq');

    const [bulkText, setBulkText] = useState('');

    // Saved questions across classes/chapters (from localStorage)
    const [savedCustomQuestions, setSavedCustomQuestions] = useState({});

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const localBank = JSON.parse(localStorage.getItem('customQuestionBank') || '{}');
        setSavedCustomQuestions(localBank);
    }, []);

    const handleSave = () => {
        if (!cls || !subject || !chapter || !bulkText.trim()) return;

        // Parse lines
        const lines = bulkText.split('\n').filter(line => line.trim() !== '');

        const newQuestions = [];

        if (type === 'mcq') {
            // For MCQs, users often paste: 
            // Question ?
            // A) option 1
            // B) option 2
            // C) option 3
            // D) option 4
            // Let's try to group them in blocks of 5 if they paste like that.
            // Or if it's single line delimited by some char, but block of 5 is common.

            // Simple heuristic: read line by line. If a line doesn't start with A/B/C/D, it's a question.
            let currentQ = null;
            let optionsCollected = 0;

            for (let line of lines) {
                const trimmed = line.trim();
                const isOption = /^[A-D][\.\)\-]/i.test(trimmed);

                if (!isOption && optionsCollected === 0) {
                    // Start of a new question
                    if (currentQ) {
                        newQuestions.push(currentQ);
                    }
                    currentQ = { en: trimmed, ur: "", options: ['', '', '', ''] };
                    optionsCollected = 0;
                } else if (!isOption && optionsCollected > 0 && optionsCollected < 4) {
                    // Could be multiline question or something weird, just ignore to keep simple
                } else if (isOption && currentQ) {
                    // Extract just the option text, removing the A) part
                    const optText = trimmed.replace(/^[A-D][\.\)\-]\s*/i, '');
                    currentQ.options[optionsCollected] = optText;
                    optionsCollected++;

                    if (optionsCollected === 4) {
                        newQuestions.push(currentQ);
                        currentQ = null;
                        optionsCollected = 0;
                    }
                } else if (!isOption && !currentQ) {
                    // Start new Q
                    currentQ = { en: trimmed, ur: "", options: ['', '', '', ''] };
                }
            }
            // Push any remaining
            if (currentQ) newQuestions.push(currentQ);

        } else {
            // Short / Long are just 1 line per question
            lines.forEach(line => {
                newQuestions.push({ en: line.trim(), ur: "" });
            });
        }

        // Structure creation
        const clsSubj = `${cls}_${subject}`;
        const currentBank = { ...savedCustomQuestions };

        if (!currentBank[clsSubj]) currentBank[clsSubj] = {};
        if (!currentBank[clsSubj][chapter]) currentBank[clsSubj][chapter] = { mcq: [], short: [], long: [] };

        // Append
        currentBank[clsSubj][chapter][type] = [...(currentBank[clsSubj][chapter][type] || []), ...newQuestions];

        localStorage.setItem('customQuestionBank', JSON.stringify(currentBank));
        setSavedCustomQuestions(currentBank);
        setBulkText(''); // Clear input

        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    // Calculate how many questions currently exist in this category
    const clsSubj = `${cls}_${subject}`;
    const existingCount = savedCustomQuestions[clsSubj]?.[chapter]?.[type]?.length || 0;

    return (
        <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--primary-color)', color: 'white', padding: '0.75rem', borderRadius: '1rem' }}>
                    <Library size={24} />
                </div>
                <div>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Manage Question Bank</h1>
                    <p className="text-muted" style={{ margin: 0 }}>Add bulk questions to your personal database.</p>
                </div>
            </div>

            <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label>Select Class</label>
                    <select className="form-input" value={cls} onChange={(e) => { setCls(e.target.value); setSubject(''); setChapter(''); }}>
                        <option value="">-- Choose Class --</option>
                        {CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Select Subject</label>
                    <select className="form-input" value={subject} onChange={(e) => { setSubject(e.target.value); setChapter(''); }} disabled={!cls}>
                        <option value="">-- Choose Subject --</option>
                        {cls && SUBJECTS[cls]?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Select Chapter / Topic</label>
                    <select className="form-input" value={chapter} onChange={(e) => setChapter(e.target.value)} disabled={!subject}>
                        <option value="">-- Choose Chapter --</option>
                        {subject && CHAPTERS[`${cls}_${subject}`]?.map(ch => (
                            <React.Fragment key={ch.id}>
                                <option value={ch.id}>{ch.name}</option>
                                {ch.topics?.map(t => <option key={t.id} value={t.id}>--- {t.name}</option>)}
                            </React.Fragment>
                        ))}
                    </select>
                </div>
            </div>

            {chapter && (
                <div className="fade-in">
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <button className={`btn ${type === 'mcq' ? '' : 'btn-secondary'}`} onClick={() => setType('mcq')}>MCQs</button>
                        <button className={`btn ${type === 'short' ? '' : 'btn-secondary'}`} onClick={() => setType('short')}>Short Questions</button>
                        <button className={`btn ${type === 'long' ? '' : 'btn-secondary'}`} onClick={() => setType('long')}>Long Questions</button>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label>Paste Questions (One question per line)</label>
                        <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            Currently stored in this category: <strong>{existingCount}</strong> questions.
                        </p>
                        <textarea
                            className="form-input"
                            rows="10"
                            placeholder="Type or paste your questions here..."
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="btn" onClick={handleSave} disabled={!bulkText.trim()}>
                            <Save size={18} /> Save Questions to Bank
                        </button>
                        {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500' }}>✓ Saved successfully!</span>}
                    </div>
                </div>
            )}

            {chapter && existingCount > 0 && (
                <div className="fade-in" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                    <h2>Saved {type.toUpperCase()} Questions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        {savedCustomQuestions[clsSubj][chapter][type].map((q, index) => (
                            <div key={index} className="glass" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <textarea
                                        className="form-input"
                                        rows="2"
                                        value={q.en}
                                        onChange={(e) => {
                                            const newBank = { ...savedCustomQuestions };
                                            newBank[clsSubj][chapter][type][index].en = e.target.value;
                                            setSavedCustomQuestions(newBank);
                                        }}
                                        style={{ marginBottom: '0.5rem' }}
                                    />
                                    <textarea
                                        className="form-input"
                                        rows="2"
                                        placeholder="Urdu translation (optional)"
                                        value={q.ur || ''}
                                        onChange={(e) => {
                                            const newBank = { ...savedCustomQuestions };
                                            newBank[clsSubj][chapter][type][index].ur = e.target.value;
                                            setSavedCustomQuestions(newBank);
                                        }}
                                        style={{ fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", direction: 'rtl', fontSize: '1.2rem' }}
                                    />
                                </div>
                                {type === 'mcq' && (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {[0, 1, 2, 3].map((optIndex) => (
                                            <input
                                                key={optIndex}
                                                type="text"
                                                className="form-input"
                                                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                                value={q.options?.[optIndex] || ''}
                                                onChange={(e) => {
                                                    const newBank = { ...savedCustomQuestions };
                                                    if (!newBank[clsSubj][chapter][type][index].options) {
                                                        newBank[clsSubj][chapter][type][index].options = ['', '', '', ''];
                                                    }
                                                    newBank[clsSubj][chapter][type][index].options[optIndex] = e.target.value;
                                                    setSavedCustomQuestions(newBank);
                                                }}
                                                style={{ fontSize: '0.9rem', padding: '0.5rem' }}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            localStorage.setItem('customQuestionBank', JSON.stringify(savedCustomQuestions));
                                            setIsSaved(true);
                                            setTimeout(() => setIsSaved(false), 2000);
                                        }}
                                        title="Save Edits"
                                    >
                                        <Save size={16} />
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this question?')) {
                                                const newBank = { ...savedCustomQuestions };
                                                newBank[clsSubj][chapter][type].splice(index, 1);
                                                setSavedCustomQuestions(newBank);
                                                localStorage.setItem('customQuestionBank', JSON.stringify(newBank));
                                            }
                                        }}
                                        title="Delete Question"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageQuestions;
