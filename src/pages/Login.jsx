import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import appLogo from '../assets/logo.png';

const Login = () => {
    const { signIn, resetPassword } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (isForgotPassword) {
            // Password Reset Flow
            const { error: resetError } = await resetPassword(email);
            if (resetError) {
                setError(resetError.message);
            } else {
                setResetSent(true);
            }
            setLoading(false);
            return;
        }

        const { error: signInError } = await signIn({ email, password });

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="auth-container fade-in">
            {/* Left Brand Banner */}
            <div className="auth-banner">
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
                        <img src={appLogo} alt="Logo" style={{ width: '80px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }} />
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Welcome Back to<br/>Smart Test Generator
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
                        The #1 SaaS platform for educational institutes. Sign in to access your dashboard, generate intelligent tests, and save hours every week.
                    </p>
                    <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.8 }}>
                        <Sparkles size={20} />
                        <span style={{ fontWeight: 600 }}>Empowering Modern Education</span>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="auth-form-section">
                <div className="glass" style={{ 
                    width: '100%', 
                    maxWidth: '450px', 
                    padding: '3rem 2.5rem', 
                    borderRadius: 'var(--radius-lg)', 
                    boxShadow: 'var(--shadow-lg)' 
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>
                            {isForgotPassword ? 'Reset Password' : 'Sign In'}
                        </h2>
                        <p className="text-muted" style={{ marginTop: '0.5rem', fontWeight: '500' }}>
                            {isForgotPassword ? 'Enter your email to receive a reset link.' : "Access your institute's secure portal."}
                        </p>
                    </div>

                    {error && (
                        <div className="shake-anim" style={{ 
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

                    {resetSent ? (
                        <div className="fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                            <div style={{ background: '#d1fae5', color: '#10b981', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Sparkles size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Check your email</h3>
                            <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>We've sent a password reset link to <strong>{email}</strong></p>
                            <button className="btn btn-secondary" onClick={() => { setResetSent(false); setIsForgotPassword(false); }} style={{ width: '100%', justifyContent: 'center' }}>
                                Back to Log In
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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

                            {!isForgotPassword && (
                                <div className="form-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', margin: 0 }}>Password</label>
                                        <button 
                                            type="button" 
                                            onClick={() => setIsForgotPassword(true)}
                                            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
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
                            )}

                            <button 
                                type="submit" 
                                className="btn" 
                                disabled={loading}
                                style={{ width: '100%', height: '52px', marginTop: '0.5rem', fontSize: '1.05rem', fontWeight: '700', borderRadius: '12px', justifyContent: 'center' }}
                            >
                                {loading ? <Loader2 size={24} className="animate-spin" /> : (
                                    <>{isForgotPassword ? 'Send Reset Link' : <><LogIn size={20} /> Secure Sign In</>}</>
                                )}
                            </button>

                            {isForgotPassword && (
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => { setIsForgotPassword(false); setError(''); }}
                                    style={{ width: '100%', justifyContent: 'center', marginTop: '-0.5rem' }}
                                >
                                    Back to Sign In
                                </button>
                            )}
                        </form>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <span className="text-muted">Don't have an account? </span>
                        <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>Register Institute</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
