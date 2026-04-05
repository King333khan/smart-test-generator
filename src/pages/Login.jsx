import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import appLogo from '../assets/logo.png';

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error: signInError } = await signIn({ email, password });

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="fade-in" style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'var(--bg-color)',
            padding: '1.5rem'
        }}>
            <div className="glass" style={{ 
                width: '100%', 
                maxWidth: '450px', 
                padding: '3rem', 
                borderRadius: 'var(--radius-lg)', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <img src={appLogo} alt="Logo" style={{ width: '64px', marginBottom: '1.5rem', borderRadius: '12px' }} />
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>Welcome Back</h1>
                    <p className="text-muted" style={{ marginTop: '0.5rem', fontWeight: '500' }}>Sign in to manage your institute's tests.</p>
                </div>

                {error && (
                    <div style={{ 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        color: '#ef4444', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-md)', 
                        marginBottom: '1.5rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="email" 
                                required 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', width: '100%', borderRadius: 'var(--radius-md)' }} 
                                placeholder="name@institute.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="password" 
                                required 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', width: '100%', borderRadius: 'var(--radius-md)' }} 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn" 
                        disabled={loading}
                        style={{ width: '100%', height: '52px', marginTop: '1rem', fontSize: '1rem' }}
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <><LogIn size={20} /> Sign In</>}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem' }}>
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>Register Institute</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
