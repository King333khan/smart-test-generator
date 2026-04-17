import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../utils/AuthContext';
import { Users, Crown, ShieldAlert, CheckCircle, XCircle, Search, CreditCard, Clock } from 'lucide-react';

const Admin = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('institutes'); // 'institutes' or 'payments'
    
    // State for Institutes
    const [profiles, setProfiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    // State for Payments
    const [paymentRequests, setPaymentRequests] = useState([]);
    
    // Shared State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // OWNER EMAIL CHECK (Security)
    const OWNER_EMAIL = 'king333khan@gmail.com'; 
    const isOwner = user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();

    const fetchProfiles = async () => {
        setLoading(true);
        setError(null);
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
            setLoading(false);
        }
    };

    const fetchPaymentRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            // Using foreign key relation to get institute_name
            const { data, error } = await supabase
                .from('payment_requests')
                .select('*, profiles(institute_name)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setPaymentRequests(data);
        } catch (err) {
            console.error('Error loading payments:', err);
            setError(err.message || 'Failed to load payment requests. Ensure payment_requests table exists.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOwner) {
            if (activeTab === 'institutes') fetchProfiles();
            if (activeTab === 'payments') fetchPaymentRequests();
        }
    }, [isOwner, activeTab]);

    // Institute Actions
    const togglePlan = async (profileId, currentPlan) => {
        const newPlan = currentPlan === 'Pro' ? 'Free' : 'Pro';
        const newMax = newPlan === 'Pro' ? 1000 : 10;
        await supabase.from('profiles').update({ plan_type: newPlan, max_tests: newMax }).eq('id', profileId);
        fetchProfiles();
    };

    const toggleStatus = async (profileId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        await supabase.from('profiles').update({ subscription_status: newStatus }).eq('id', profileId);
        fetchProfiles();
    };

    // Payment Actions
    const handlePaymentAction = async (requestId, profileId, action) => {
        try {
            if (action === 'approve') {
                // 1. Update payment request status
                await supabase.from('payment_requests').update({ status: 'approved' }).eq('id', requestId);
                // 2. Upgrade the user's profile to Pro automatically
                await supabase.from('profiles').update({ 
                    plan_type: 'Pro', 
                    max_tests: 1000, 
                    subscription_status: 'active' 
                }).eq('id', profileId);
            } else if (action === 'reject') {
                await supabase.from('payment_requests').update({ status: 'rejected' }).eq('id', requestId);
            }
            fetchPaymentRequests();
        } catch (err) {
            console.error('Action failed:', err);
            alert('Action failed. Make sure you have the correct permissions.');
        }
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

    // KPI Calculations
    const totalInstitutes = profiles.length;
    const proInstitutes = profiles.filter(p => p.plan_type === 'Pro').length;
    const totalTestsGenerated = profiles.reduce((sum, p) => sum + (p.tests_count || 0), 0);
    const totalRevenue = paymentRequests.filter(r => r.status === 'approved').reduce((sum, req) => sum + Number(req.amount), 0);

    return (
        <div className="glass fade-in" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', minHeight: 'calc(100vh - 5rem)' }}>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Master Admin</h1>
                    <p className="text-muted">Manage your SaaS platform, users, and billing.</p>
                </div>
                
                {/* Custom Tabs */}
                <div style={{ display: 'flex', background: 'var(--card-bg)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <button 
                        className={`btn ${activeTab === 'institutes' ? '' : 'btn-secondary'}`} 
                        style={{ border: 'none', boxShadow: 'none', borderRadius: '8px' }}
                        onClick={() => setActiveTab('institutes')}
                    >
                        <Users size={18} /> Institutes
                    </button>
                    <button 
                        className={`btn ${activeTab === 'payments' ? '' : 'btn-secondary'}`} 
                        style={{ border: 'none', boxShadow: 'none', borderRadius: '8px' }}
                        onClick={() => setActiveTab('payments')}
                    >
                        <CreditCard size={18} /> Payment Requests
                    </button>
                </div>
            </div>

            {/* KPI Dashboard Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)', color: 'white', border: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', opacity: 0.8 }}>
                        <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '600' }}>Total Institutes</h3>
                        <Users size={24} />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{totalInstitutes}</div>
                </div>

                <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', border: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', opacity: 0.8 }}>
                        <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '600' }}>Platform Revenue</h3>
                        <CreditCard size={24} />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>Rs. {totalRevenue.toLocaleString()}</div>
                </div>

                <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', border: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', opacity: 0.8 }}>
                        <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '600' }}>Pro Subscribers</h3>
                        <Crown size={24} />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{proInstitutes}</div>
                </div>

                <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white', border: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', opacity: 0.8 }}>
                        <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '600' }}>Tests Generated</h3>
                        <Clock size={24} />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{totalTestsGenerated}</div>
                </div>
            </div>

            {activeTab === 'institutes' && (
                <div className="fade-in">
                    <div style={{ position: 'relative', width: '300px', marginBottom: '1.5rem' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                        <input 
                            type="text" 
                            placeholder="Search institutes..." 
                            className="form-input" 
                            style={{ paddingLeft: '2.8rem', width: '100%', borderRadius: '999px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                                    <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}><div className="animate-spin" style={{display:'inline-block'}}><Search size={24}/></div></td></tr>
                                ) : error ? (
                                    <tr><td colSpan="5" style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</td></tr>
                                ) : filteredProfiles.length === 0 ? (
                                    <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>No institutes found.</td></tr>
                                ) : (
                                    filteredProfiles.map((p) => (
                                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{ fontWeight: '700' }}>{p.institute_name || 'N/A'}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {p.id}</div>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <span style={{ 
                                                    background: p.plan_type === 'Pro' ? '#fef3c7' : '#f3f4f6',
                                                    color: p.plan_type === 'Pro' ? '#b45309' : '#4b5563',
                                                    padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700'
                                                }}>
                                                    {p.plan_type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}><div style={{ fontWeight: '600' }}>{p.tests_count} / {p.max_tests}</div></td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: p.subscription_status === 'active' ? '#10b981' : '#ef4444', fontWeight: '700' }}>
                                                    {p.subscription_status === 'active' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                                    {p.subscription_status.toUpperCase()}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => togglePlan(p.id, p.plan_type)}>
                                                        Toggle Plan
                                                    </button>
                                                    <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: p.subscription_status === 'active' ? '#fee2e2' : '#d1fae5', color: p.subscription_status === 'active' ? '#ef4444' : '#10b981', borderColor:'transparent' }} onClick={() => toggleStatus(p.id, p.subscription_status)}>
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
            )}

            {activeTab === 'payments' && (
                <div className="fade-in">
                    <div className="glass" style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#fef3c7', color: '#b45309' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem' }}>Date</th>
                                    <th style={{ padding: '1.25rem' }}>Institute Name</th>
                                    <th style={{ padding: '1.25rem' }}>TID / Method</th>
                                    <th style={{ padding: '1.25rem' }}>Status</th>
                                    <th style={{ padding: '1.25rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</td></tr>
                                ) : error ? (
                                    <tr><td colSpan="5" style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</td></tr>
                                ) : paymentRequests.length === 0 ? (
                                    <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>No pending payment requests.</td></tr>
                                ) : (
                                    paymentRequests.map((req) => (
                                        <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1.25rem', fontSize: '0.9rem' }}>
                                                {new Date(req.created_at).toLocaleDateString()}<br/>
                                                <span className="text-muted" style={{fontSize: '0.7rem'}}>{new Date(req.created_at).toLocaleTimeString()}</span>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{ fontWeight: '700' }}>{req.profiles?.institute_name || 'Unknown'}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {req.profile_id}</div>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{req.trx_id}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.payment_method} - Rs. {req.amount}</div>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                {req.status === 'pending' && <span style={{ color: '#f59e0b', background: '#fef3c7', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Pending</span>}
                                                {req.status === 'approved' && <span style={{ color: '#10b981', background: '#d1fae5', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Approved</span>}
                                                {req.status === 'rejected' && <span style={{ color: '#ef4444', background: '#fee2e2', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Rejected</span>}
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                {req.status === 'pending' ? (
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button 
                                                            className="btn" 
                                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#10b981', color: 'white', borderColor:'transparent' }} 
                                                            onClick={() => handlePaymentAction(req.id, req.profile_id, 'approve')}
                                                        >
                                                            <CheckCircle size={14}/> Approve
                                                        </button>
                                                        <button 
                                                            className="btn btn-secondary" 
                                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }} 
                                                            onClick={() => handlePaymentAction(req.id, req.profile_id, 'reject')}
                                                        >
                                                            <XCircle size={14}/> Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>No actions available</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
