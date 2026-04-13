import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { UserPlus, Mail, Lock, AlertCircle, Loader2, School, CheckCircle2 } from 'lucide-react';
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
        }
    };

    if (success) {
        return (
            <div className="auth-container fade-in">
                <div className="auth-banner" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <CheckCircle2 size={100} style={{ margin: '0 auto 2rem', opacity: 0.9 }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            Registration Successful!
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '500px', margin: '0 auto' }}>
                            Your institute has been registered. Please check your inbox to verify your email address before logging in.
                        </p>
                    </div>
                </div>
                <div className="auth-form-section">
                    <div className="glass" style={{ textAlign: 'center', padding: '4rem 3rem', maxWidth: '450px', borderRadius: 'var(--radius-lg)' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-dark)' }}>Next Steps</h2>
                        <p className="text-muted" style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>We've sent a verification link to <strong>{email}</strong>. Click the link inside to activate your portal.</p>
                        <Link to="/login" className="btn" style={{ width: '100%', textDecoration: 'none', height: '52px', fontSize: '1.1rem', borderRadius: '12px' }}>Go to Login Page</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container fade-in">
            {/* Left Brand Banner */}
            <div className="auth-banner" style={{ background: 'linear-gradient(135deg, var(--secondary-color), #334155)' }}>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left', background: 'rgba(255,255,255,0.1)', padding: '3rem', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1.2 }}>
                            "A single subscription<br/>changed how we<br/>conduct exams."
                        </h1>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Principal, Smart Public School</div>
                            <div style={{ opacity: 0.8 }}>Saved 25+ hours weekly</div>
                        </div>
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
                        <img src={appLogo} alt="Logo" style={{ width: '56px', marginBottom: '1rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }} />
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>Create Account</h2>
                        <p className="text-muted" style={{ marginTop: '0.5rem', fontWeight: '500' }}>Start your 10-test free evaluation.</p>
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
                                    placeholder="E.g. Nexus Academy"
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
                                    placeholder="admin@institute.com"
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
                            style={{ width: '100%', height: '52px', marginTop: '0.5rem', fontSize: '1.05rem', fontWeight: '700', borderRadius: '12px' }}
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : <><UserPlus size={20} /> Create Free Account</>}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <span className="text-muted">Already registered? </span>
                        <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
