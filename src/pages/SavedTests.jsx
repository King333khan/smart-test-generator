import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Trash2, Printer, Loader2, Cloud } from 'lucide-react';
import { CLASSES, SUBJECTS } from '../data/mockSyllabus';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../utils/AuthContext';

const SavedTests = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTests = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('saved_tests')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTests(data.map(item => ({
                id: item.id,
                ...item.test_data,
                dateCreated: item.created_at
            })));
        } catch (err) {
            console.error('Fetch tests error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTests();
    }, [user]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this test permanently?')) return;
        try {
            const { error } = await supabase
                .from('saved_tests')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchTests();
        } catch (err) {
            console.error('Delete test error:', err);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getClassName = (id) => CLASSES.find(c => c.id === id)?.name || id;
    const getSubjectName = (clsId, subId) => SUBJECTS[clsId]?.find(s => s.id === subId)?.name || subId;

    return (
        <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem', minHeight: 'calc(100vh - 4rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Saved Tests</h1>
                    <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Cloud size={16} /> All tests are synced to your cloud account.
                    </p>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
                    <Loader2 size={64} className="spin" style={{ color: 'var(--primary-color)', margin: '0 auto', opacity: 0.5 }} />
                    <p className="text-muted" style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>Accessing cloud archives...</p>
                </div>
            ) : tests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed var(--border-color)', borderRadius: '1rem' }}>
                    <FileText size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <h3>No saved tests found</h3>
                    <p className="text-muted" style={{ marginTop: '0.5rem' }}>Create your first test to see it here.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {tests.map(test => (
                        <div key={test.id} className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{test.testTitle}</h3>
                                <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)', borderRadius: '1rem', fontWeight: 'bold' }}>
                                    {test.config?.totalMarks || 0} Marks
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FileText size={16} /> {getClassName(test.cls)} • {getSubjectName(test.cls, test.subject)}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} /> {formatDate(test.dateCreated)}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1, color: '#ef4444', borderColor: '#fca5a5', padding: '0.5rem' }}
                                    onClick={() => handleDelete(test.id)}
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                                <button className="btn" style={{ flex: 1, padding: '0.5rem' }} onClick={() => navigate(`/test/${test.id}`)}>
                                    <Printer size={16} /> Open
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedTests;
