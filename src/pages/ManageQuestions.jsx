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

        const newQuestions = lines.map(line => {
            // Basic parsing: Assuming user paste formats. For MCQs, they might just type the question, no options for now to keep simple, or a format we parse.
            // We'll store exactly what they wrote as English text for now. (Can be enhanced later)
            return { en: line.trim(), ur: "" };
        });

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
        </div>
    );
};

export default ManageQuestions;
