import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Library, Loader2 } from 'lucide-react';
import { CLASSES, SUBJECTS, CHAPTERS } from '../data/mockSyllabus';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../utils/AuthContext';

const ManageQuestions = () => {
    const { user } = useAuth();
    const [cls, setCls] = useState('');
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [type, setType] = useState('mcq');

    const [enText, setEnText] = useState('');
    const [urText, setUrText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [urOptions, setUrOptions] = useState(['', '', '', '']);

    const [savedQuestions, setSavedQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchQuestions = async () => {
        if (!user || !cls || !subject || !chapter) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('custom_questions')
                .select('*')
                .eq('user_id', user.id)
                .eq('class', cls)
                .eq('subject', subject)
                .eq('chapter', chapter)
                .eq('type', type)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSavedQuestions(data || []);
        } catch (err) {
            console.error('Fetch questions error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [user, cls, subject, chapter, type]);

    const handleAutoTranslate = async () => {
        if (!enText) return;
        alert('Auto-translate feature coming soon! Please enter Urdu manually for now.');
    };

    const handleSave = async () => {
        if (!user || !cls || !subject || !chapter || !enText.trim()) return;

        const newQuestionData = {
            en: enText.trim(),
            ur: urText.trim(),
            ...(type === 'mcq' && { options: [...options], urOptions: [...urOptions] })
        };

        try {
            const { error } = await supabase.from('custom_questions').insert({
                user_id: user.id,
                class: cls,
                subject: subject,
                chapter: chapter,
                type: type,
                data: newQuestionData
            });

            if (error) throw error;

            setEnText('');
            setUrText('');
            setOptions(['', '', '', '']);
            setUrOptions(['', '', '', '']);
            setIsSaved(true);
            fetchQuestions();
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err) {
            console.error('Save question error:', err);
            alert('Failed to save question. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;
        try {
            const { error } = await supabase
                .from('custom_questions')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchQuestions();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const filteredQuestions = savedQuestions.filter(q => 
        q.data.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (q.data.ur && q.data.ur.includes(searchTerm))
    );

    return (
        <div className="fade-in">
            <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', padding: '0.8rem', borderRadius: 'var(--radius-md)', display: 'flex' }}>
                        <Library size={28} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>Question Bank</h1>
                        <p className="text-muted" style={{ margin: '0.25rem 0 0 0', fontWeight: '500' }}>Manage and expand your custom education database.</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="form-group">
                        <label style={{ fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Class</label>
                        <select className="form-input" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} value={cls} onChange={(e) => { setCls(e.target.value); setSubject(''); setChapter(''); }}>
                            <option value="">-- Choose Class --</option>
                            {CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Subject</label>
                        <select className="form-input" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} value={subject} onChange={(e) => { setSubject(e.target.value); setChapter(''); }} disabled={!cls}>
                            <option value="">-- Choose Subject --</option>
                            {cls && SUBJECTS[cls]?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Chapter</label>
                        <select className="form-input" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} value={chapter} onChange={(e) => setChapter(e.target.value)} disabled={!subject}>
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
                    <div className="slide-up">
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', background: 'var(--primary-light)', padding: '0.5rem', borderRadius: 'var(--radius-md)', width: 'fit-content' }}>
                            {['mcq', 'short', 'long'].map(t => (
                                <button 
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`btn ${type === t ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ 
                                        padding: '0.5rem 1.25rem', 
                                        fontSize: '0.85rem', 
                                        boxShadow: type === t ? 'var(--shadow-md)' : 'none',
                                        border: 'none',
                                        backgroundColor: type === t ? 'var(--primary-color)' : 'transparent',
                                        color: type === t ? 'white' : 'var(--text-muted)'
                                    }}
                                >
                                    {t === 'mcq' ? 'MCQ' : t === 'short' ? 'Short Q' : 'Long Q'}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                            <div className="form-group">
                                <label style={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
                                    English Text
                                    <button onClick={handleAutoTranslate} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '700' }}>AUTO-TRANSLATE</button>
                                </label>
                                <textarea 
                                    className="form-input" 
                                    style={{ minHeight: '120px', borderRadius: 'var(--radius-md)', resize: 'vertical' }}
                                    placeholder="Enter English question text..."
                                    value={enText}
                                    onChange={(e) => setEnText(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ fontWeight: '700' }}>Urdu Text (Optional)</label>
                                <textarea 
                                    className="form-input urdu-text" 
                                    style={{ minHeight: '120px', borderRadius: 'var(--radius-md)', textAlign: 'right', direction: 'rtl', resize: 'vertical' }}
                                    placeholder="اردو میں سوال لکھیں..."
                                    value={urText}
                                    onChange={(e) => setUrText(e.target.value)}
                                />
                            </div>
                        </div>

                        {type === 'mcq' && (
                            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-color)', marginBottom: '2rem' }}>
                                <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase' }}>Options Configuration</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                                            <div style={{ flex: 1 }}>
                                                <input 
                                                    className="form-input" 
                                                    style={{ width: '100%', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}
                                                    placeholder={`Option ${String.fromCharCode(65 + i)} (EN)`}
                                                    value={options[i]}
                                                    onChange={(e) => {
                                                        const newOpt = [...options];
                                                        newOpt[i] = e.target.value;
                                                        setOptions(newOpt);
                                                    }}
                                                />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <input 
                                                    className="form-input urdu-text" 
                                                    style={{ width: '100%', borderRadius: 'var(--radius-md)', textAlign: 'right', direction: 'rtl', fontSize: '0.9rem' }}
                                                    placeholder={`آپشن ${String.fromCharCode(65 + i)} (UR)`}
                                                    value={urOptions[i]}
                                                    onChange={(e) => {
                                                        const newOpt = [...urOptions];
                                                        newOpt[i] = e.target.value;
                                                        setUrOptions(newOpt);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
                            {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '700' }}>✓ QUESTION ADDED</span>}
                            <button className="btn" onClick={handleSave} style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                <Save size={18} /> Save to Bank
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Existing Questions List */}
            {chapter && (
                <div className="glass slide-up" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.65rem', fontWeight: '800', margin: 0 }}>Review Existing {type.toUpperCase()}s ({filteredQuestions.length})</h2>
                        
                        <div style={{ position: 'relative', width: '300px' }}>
                            <input 
                                type="text"
                                className="form-input"
                                style={{ width: '100%', borderRadius: '999px', paddingLeft: '2.5rem', fontSize: '0.9rem', height: '42px' }}
                                placeholder="Search in this chapter..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Plus size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {loading ? (
                            <div style={{ padding: '4rem', textAlign: 'center' }}>
                                <Loader2 size={48} className="spin" style={{ color: 'var(--primary-color)', margin: '0 auto' }} />
                                <p style={{ marginTop: '1rem', fontWeight: '600' }}>Fetching from Cloud...</p>
                            </div>
                        ) : filteredQuestions.length === 0 ? (
                            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)' }}>
                                <Library size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                <p style={{ fontWeight: '600', margin: 0 }}>No questions found matching your criteria.</p>
                            </div>
                        ) : (
                            filteredQuestions.map((q) => (
                                <div key={q.id} className="glass" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)', background: 'white' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: '0 0 1rem 0', fontWeight: '700', fontSize: '1.1rem', lineHeight: 1.6 }}>{q.data.en}</p>
                                            {q.data.ur && <p className="urdu-text" style={{ margin: 0, color: 'var(--primary-color)', fontSize: '1.25rem', marginBottom: '1rem' }}>{q.data.ur}</p>}
                                            
                                            {type === 'mcq' && q.data.options && (
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem', padding: '1.25rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)' }}>
                                                    {q.data.options.map((opt, i) => (
                                                        <div key={i} style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                                                            <span style={{ fontWeight: '800', color: 'var(--primary-color)', marginRight: '0.6rem' }}>{String.fromCharCode(65 + i)}</span>
                                                            {opt}
                                                            {q.data.urOptions?.[i] && <div className="urdu-text" style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.2rem' }}>{q.data.urOptions[i]}</div>}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <button 
                                                className="btn btn-secondary" 
                                                style={{ padding: '0.6rem', color: '#ef4444', border: '1px solid transparent' }}
                                                onClick={() => handleDelete(q.id)}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageQuestions;
