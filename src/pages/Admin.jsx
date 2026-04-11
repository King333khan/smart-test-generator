import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../utils/AuthContext';
import { Users, Crown, ShieldAlert, CheckCircle, XCircle, Search } from 'lucide-react';

const Admin = () => {
    const { user } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // OWNER EMAIL CHECK (Security)
    const OWNER_EMAIL = 'king333khan@gmail.com'; 
    const isOwner = user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();

    const fetchProfiles = async () => {
        setLoading(true);
        setError(null);

        // Safety timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            if (loading) {
                setLoading(false);
                setError('Loading timed out. Please check your internet or Supabase RLS policies.');
            }
        }, 7000);

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, institute_name, plan_type, tests_count, max_tests, subscription_status, updated_at')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            if (data) setProfiles(data);
        } catch (err) {
            console.error('Error loading profiles:', err);
            setError(err.message || 'Failed to load profiles. Check RLS policies.');
        } finally {
            clearTimeout(timeout);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOwner) {
            fetchProfiles();
        }
    }, [isOwner]); // isOwner handles user loading state from AuthContext

    const togglePlan = async (profileId, currentPlan) => {
        const newPlan = currentPlan === 'Pro' ? 'Free' : 'Pro';
        const newMax = newPlan === 'Pro' ? 1000 : 10;
        
        await supabase
            .from('profiles')
            .update({ plan_type: newPlan, max_tests: newMax })
            .eq('id', profileId);
        
        fetchProfiles();
    };

    const toggleStatus = async (profileId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        
        await supabase
            .from('profiles')
            .update({ subscription_status: newStatus })
            .eq('id', profileId);
        
        fetchProfiles();
    };

    if (!isOwner) {
        return (
            <div className="glass fade-in" style={{ padding: '4rem', textAlign: 'center', margin: '2rem' }}>
                <ShieldAlert size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
                <h1 style={{ color: '#ef4444' }}>Access Denied</h1>
                <p>Only the SaaS owner can access the Master Admin Dashboard.</p>
            </div>
        );
    }

    const filteredProfiles = profiles.filter(p => 
        p.institute_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="glass fade-in" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', minHeight: 'calc(100vh - 5rem)' }}>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Master Admin</h1>
                    <p className="text-muted">Manage all registered institutes and their subscription status.</p>
                </div>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                    <input 
                        type="text" 
                        placeholder="Search institutes..." 
                        className="form-input" 
                        style={{ paddingLeft: '2.8rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="glass" style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--primary-light)', color: 'var(--primary-color)' }}>
                        <tr>
                            <th style={{ padding: '1.25rem' }}>Institute Name</th>
                            <th style={{ padding: '1.25rem' }}>Plan</th>
                            <th style={{ padding: '1.25rem' }}>Tests Used</th>
                            <th style={{ padding: '1.25rem' }}>Status</th>
                            <th style={{ padding: '1.25rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>Loading profiles...</td></tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>
                                    <div className="glass" style={{ padding: '2rem', border: '1px solid #ef4444' }}>
                                        <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>⚠️ Connection / Permission Error</h3>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                            Supabase could not load profiles. This is usually due to <strong>Row Level Security (RLS)</strong> policies or an invalid API key.
                                        </p>
                                        <code style={{ display: 'block', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '4px', textAlign: 'left', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                                            Details: {error}
                                        </code>
                                        <button className="btn" style={{ marginTop: '1.5rem', background: '#ef4444' }} onClick={fetchProfiles}>Retry Connection</button>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredProfiles.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>No institutes found.</td></tr>
                        ) : (
                            filteredProfiles.map((p) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ fontWeight: '700' }}>{p.institute_name || 'N/A'}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {p.id}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <span className={`badge ${p.plan_type === 'Pro' ? 'pro-badge' : ''}`} style={{ 
                                            background: p.plan_type === 'Pro' ? '#fef3c7' : '#f3f4f6',
                                            color: p.plan_type === 'Pro' ? '#b45309' : '#4b5563',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '999px',
                                            fontSize: '0.8rem',
                                            fontWeight: '700'
                                        }}>
                                            {p.plan_type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ fontWeight: '600' }}>{p.tests_count} / {p.max_tests}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: p.subscription_status === 'active' ? '#10b981' : '#ef4444', fontWeight: '700' }}>
                                            {p.subscription_status === 'active' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                            {p.subscription_status.toUpperCase()}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <button 
                                                className="btn btn-secondary" 
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                                                onClick={() => togglePlan(p.id, p.plan_type)}
                                            >
                                                {p.plan_type === 'Pro' ? 'Downgrade' : 'Make Pro'}
                                            </button>
                                            <button 
                                                className="btn" 
                                                style={{ 
                                                    padding: '0.5rem 1rem', 
                                                    fontSize: '0.8rem', 
                                                    background: p.subscription_status === 'active' ? '#fee2e2' : '#d1fae5',
                                                    color: p.subscription_status === 'active' ? '#ef4444' : '#10b981',
                                                    borderColor: 'transparent'
                                                }}
                                                onClick={() => toggleStatus(p.id, p.subscription_status)}
                                            >
                                                {p.subscription_status === 'active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
