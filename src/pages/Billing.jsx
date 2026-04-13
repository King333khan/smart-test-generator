import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../utils/AuthContext';
import { CreditCard, CheckCircle, Clock, AlertCircle, Info, Send, Landmark, Smartphone } from 'lucide-react';

const Billing = () => {
    const { user, profile } = useAuth();
    const [requests, setRequests] = useState([]);
    const [trxId, setTrxId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('JazzCash');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (user) {
            fetchRequests();
        }
    }, [user]);

    const fetchRequests = async () => {
        setFetchLoading(true);
        try {
            const { data, error } = await supabase
                .from('payment_requests')
                .select('*')
                .eq('profile_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (err) {
            console.error('Error fetching requests:', err);
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg('');

        if (!trxId.trim()) {
            setError('Please enter a valid Transaction ID.');
            setLoading(false);
            return;
        }

        try {
            const { error: insertError } = await supabase
                .from('payment_requests')
                .insert([
                    {
                        profile_id: user.id,
                        trx_id: trxId.trim(),
                        payment_method: paymentMethod,
                        amount: 5000, // Monthly fee
                        status: 'pending'
                    }
                ]);

            if (insertError) throw insertError;

            setSuccessMsg('Payment request submitted successfully! Admin will verify and activate your Pro plan shortly.');
            setTrxId('');
            fetchRequests(); // Refresh the list
        } catch (err) {
            console.error('Submit error:', err);
            setError(err.message || 'Failed to submit request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{ padding: '2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CreditCard color="var(--primary-color)" /> Billing & Upgrade
                </h1>
                <p className="text-muted">Manage your subscription and submit payment requests.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Left Column: Current Plan & Payment Methods */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Current Status Box */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', borderTop: `4px solid ${profile?.plan_type === 'Pro' ? '#10b981' : '#f59e0b'}` }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Current Plan: <strong>{profile?.plan_type || 'Free'}</strong></h2>
                        
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                            <div>
                                <div className="text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Status</div>
                                <div style={{ fontWeight: 'bold', color: profile?.subscription_status === 'active' ? '#10b981' : '#ef4444' }}>
                                    {profile?.subscription_status?.toUpperCase() || 'INACTIVE'}
                                </div>
                            </div>
                            <div>
                                <div className="text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Usage</div>
                                <div style={{ fontWeight: 'bold' }}>{profile?.tests_count || 0} / {profile?.max_tests || 10} Tests</div>
                            </div>
                        </div>
                        
                        {profile?.plan_type !== 'Pro' && (
                            <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: '8px', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '500' }}>
                                <Info size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/>
                                Upgrade to Pro to unlock unlimited testing, past papers, and advanced AI test generation tools.
                            </div>
                        )}
                    </div>

                    {/* How to Pay Box */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '800' }}>How to Upgrade?</h2>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                            Rs. 5,000 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ month</span>
                        </div>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>Please transfer the amount to any of the following accounts and submit the Transaction ID (TID) below.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}><Smartphone size={20} /> JazzCash/EasyPaisa</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>0300-2379190</div>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>Account Title: Muhammad Akmal Bashir</div>
                            </div>
                            
                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}><Landmark size={20} /> Bank Transfer</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>PK20 MEEZ 0001 2345 6789</div>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>Bank: Meezan Bank<br/>Title: Smart Test Institute</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Submit TRX & History */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Submit Form */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '800' }}>Submit Payment Details</h2>
                        
                        {error && (
                            <div style={{ padding: '1rem', background: '#fee2e2', color: '#ef4444', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '600' }}>
                                <AlertCircle size={20} /> {error}
                            </div>
                        )}
                        {successMsg && (
                            <div style={{ padding: '1rem', background: '#d1fae5', color: '#10b981', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '600' }}>
                                <CheckCircle size={20} /> {successMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Payment Method</label>
                                <select 
                                    className="form-input" 
                                    style={{ width: '100%' }}
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="JazzCash">JazzCash</option>
                                    <option value="EasyPaisa">EasyPaisa</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </select>
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Transaction ID (TID)</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="e.g. 0213456789" 
                                    style={{ width: '100%' }}
                                    value={trxId}
                                    onChange={(e) => setTrxId(e.target.value)}
                                    required
                                />
                                <span className="text-muted" style={{ fontSize: '0.8rem', display: 'block', marginTop: '0.4rem' }}>You receive an 11-digit TID via SMS after transferring via JazzCash/EasyPaisa.</span>
                            </div>

                            <button type="submit" className="btn" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} disabled={loading}>
                                {loading ? 'Submitting...' : <><Send size={18} /> Verify Payment</>}
                            </button>
                        </form>
                    </div>

                    {/* History Table */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', flex: 1 }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Request History</h2>
                        
                        {fetchLoading ? (
                            <div className="text-muted">Loading history...</div>
                        ) : requests.length === 0 ? (
                            <div className="text-muted" style={{ textAlign: 'center', padding: '2rem 0' }}>No payment requests submitted yet.</div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr className="text-muted" style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                                            <th style={{ padding: '0.75rem 0' }}>Date</th>
                                            <th style={{ padding: '0.75rem 0' }}>Method</th>
                                            <th style={{ padding: '0.75rem 0' }}>TID</th>
                                            <th style={{ padding: '0.75rem 0' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map((req) => (
                                            <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '1rem 0', fontSize: '0.9rem' }}>{new Date(req.created_at).toLocaleDateString()}</td>
                                                <td style={{ padding: '1rem 0', fontSize: '0.9rem' }}>{req.payment_method}</td>
                                                <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{req.trx_id}</td>
                                                <td style={{ padding: '1rem 0' }}>
                                                    {req.status === 'pending' && <span style={{ color: '#f59e0b', background: '#fef3c7', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}><Clock size={12} style={{display:'inline', marginRight:'4px'}}/> Pending</span>}
                                                    {req.status === 'approved' && <span style={{ color: '#10b981', background: '#d1fae5', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}><CheckCircle size={12} style={{display:'inline', marginRight:'4px'}}/> Approved</span>}
                                                    {req.status === 'rejected' && <span style={{ color: '#ef4444', background: '#fee2e2', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}><AlertCircle size={12} style={{display:'inline', marginRight:'4px'}}/> Rejected</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Billing;
