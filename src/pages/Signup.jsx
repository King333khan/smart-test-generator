import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { UserPlus, Mail, Lock, AlertCircle, Loader2, School } from 'lucide-react';
import appLogo from '../assets/logo.png';

const Signup = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [instituteName, setInstituteName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error: signUpError } = await signUp({ 
            email, 
            password,
            options: {
                data: {
                    institute_name: instituteName
                }
            }
        });

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            // In a real app, users usually need to confirm their email.
            // For now, we'll suggest checking email or redirecting.
        }
    };

    if (success) {
        return (
            <div className="fade-in" style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'var(--bg-color)',
                padding: '1.5rem'
            }}>
                <div className="glass" style={{ textAlign: 'center', padding: '3rem', maxWidth: '450px', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ background: '#10b981', color: 'white', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 1.5rem auto' }}>
                        <UserPlus size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem' }}>Check Your Email</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>We've sent a verification link to <strong>{email}</strong>. Please confirm your email to activate your institute's account.</p>
                    <Link to="/login" className="btn" style={{ width: '100%', textDecoration: 'none' }}>Go to Login</Link>
                </div>
            </div>
        );
    }

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
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>Register Institute</h1>
                    <p className="text-muted" style={{ marginTop: '0.5rem', fontWeight: '500' }}>Join our platform and start generating professional tests.</p>
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

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Institute Name</label>
                        <div style={{ position: 'relative' }}>
                            <School size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                required 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', width: '100%', borderRadius: 'var(--radius-md)' }} 
                                placeholder="E.g. Smart Public School"
                                value={instituteName}
                                onChange={(e) => setInstituteName(e.target.value)}
                            />
                        </div>
                    </div>

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
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <><UserPlus size={20} /> Register Account</>}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem' }}>
                    <span className="text-muted">Already registered? </span>
                    <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
