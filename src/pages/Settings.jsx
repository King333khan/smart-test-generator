import React, { useState, useEffect } from 'react';
import { Save, User, Building, Settings as SettingsIcon, Phone, MapPin, Lock } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../utils/supabaseClient';

const Settings = () => {
    const { user, profile, updateProfile, refreshProfile } = useAuth();
    const [settings, setSettings] = useState({
        defaultInstitute: 'My School',
        defaultTestTitle: 'Monthly Assessment - 2026',
        address: '',
        mobile: '',
        theme: 'light',
        logo: null
    });
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [isSaved, setIsSaved] = useState(false);
    const [pwdSaved, setPwdSaved] = useState(false);

    useEffect(() => {
        if (profile) {
            setSettings({
                defaultInstitute: profile.institute_name || '',
                defaultTestTitle: profile.default_test_title || 'Monthly Assessment - 2026',
                address: profile.address || '',
                mobile: profile.mobile || '',
                theme: profile.theme || 'light',
                logo: profile.institute_logo_url || null
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!user) {
            alert('Please login to save settings');
            return;
        }

        try {
            await updateProfile({
                institute_name: settings.defaultInstitute,
                default_test_title: settings.defaultTestTitle,
                address: settings.address,
                mobile: settings.mobile,
                institute_logo_url: settings.logo,
                theme: settings.theme
            });
            
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err) {
            console.error('Error in handleSave:', err);
            alert('Failed to save settings to cloud.');
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            // Compress Image using Canvas before storing
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_SIZE = 400; // slightly larger for cloud
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                setSettings(prev => ({ ...prev, logo: compressedBase64 }));
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSave = () => {
        if (passwordData.new && passwordData.new === passwordData.confirm) {
            // Mock password save
            setPwdSaved(true);
            setTimeout(() => setPwdSaved(false), 3000);
            setPasswordData({ current: '', new: '', confirm: '' });
        } else {
            alert("New passwords don't match or are empty!");
        }
    };

    return (
        <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem', minHeight: 'calc(100vh - 4rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--primary-color)', color: 'white', borderRadius: '0.75rem' }}>
                    <SettingsIcon size={24} />
                </div>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: 0 }}>Settings</h1>
                    <p className="text-muted">Manage your application preferences and defaults.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) minmax(400px, 1fr)', gap: '2rem', alignItems: 'start' }}>
                {/* Left Column: Settings Forms */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Profile & Defaults Section */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', background: 'white' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                            <Building size={20} className="text-muted" /> Institute Defaults
                        </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                                Default Institute Name
                            </label>
                            <input
                                type="text"
                                name="defaultInstitute"
                                value={settings.defaultInstitute}
                                onChange={handleChange}
                                style={{
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <span className="text-muted" style={{ fontSize: '0.8rem' }}>This will be pre-filled as the header when creating new tests.</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                                Default Test Title
                            </label>
                            <input
                                type="text"
                                name="defaultTestTitle"
                                value={settings.defaultTestTitle}
                                onChange={handleChange}
                                style={{
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <MapPin size={16} className="text-muted" /> Institute Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="E.g. 123 Main St, Lahore"
                                value={settings.address}
                                onChange={handleChange}
                                style={{
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Phone size={16} className="text-muted" /> Mobile / Contact Number
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="E.g. 0300-1234567"
                                value={settings.mobile}
                                onChange={handleChange}
                                style={{
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                                Default Institute Logo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                style={{
                                    padding: '0.5rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.9rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                            {settings.logo && (
                                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={settings.logo} alt="Preview" style={{ height: '40px', objectFit: 'contain' }} />
                                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => setSettings(prev => ({...prev, logo: null}))}>Remove Logo</button>
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button className="btn" onClick={handleSave} disabled={isSaved}>
                                <Save size={18} /> {isSaved ? 'Saved' : 'Save Settings'}
                            </button>
                            {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500' }}>✓ Preferences updated</span>}
                        </div>
                    </div>
                    
                    {/* Branding Tier (Pro Only Feature) */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', background: 'white', marginTop: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <SettingsIcon size={20} className="text-muted" /> Branding Control
                        </h2>
                        <div style={{ 
                            padding: '1rem', 
                            borderRadius: '0.75rem', 
                            background: isPro ? '#f0fdf4' : '#fff7ed',
                            border: `1px solid ${isPro ? '#10b981' : '#f97316'}`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '0.95rem', margin: 0, color: isPro ? '#15803d' : '#9a3412' }}>
                                    {isPro ? '✓ White-labeling Active' : '⚠ Limited Branding'}
                                </h3>
                                <p style={{ fontSize: '0.8rem', margin: '0.25rem 0 0 0', opacity: 0.8 }}>
                                    {isPro 
                                        ? 'The "Designed by..." attribution is now hidden from your papers.' 
                                        : 'Upgrade to PRO to remove the "Designed by..." signature from your tests.'}
                                </p>
                            </div>
                            {!isPro && (
                                <button className="btn btn-sm" style={{ background: '#f97316', color: 'white' }} onClick={() => window.location.href = '/billing'}>
                                    Upgrade
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                    {/* Security Section */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', background: 'white' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                            <Lock size={20} className="text-muted" /> Security
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem' }}>Current Password</label>
                                <input
                                    type="password"
                                    name="current"
                                    value={passwordData.current}
                                    onChange={handlePasswordChange}
                                    style={{ padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem' }}>New Password</label>
                                <input
                                    type="password"
                                    name="new"
                                    value={passwordData.new}
                                    onChange={handlePasswordChange}
                                    style={{ padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem' }}>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirm"
                                    value={passwordData.confirm}
                                    onChange={handlePasswordChange}
                                    style={{ padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button className="btn btn-secondary" onClick={handlePasswordSave} disabled={pwdSaved}>
                                    <Lock size={18} /> {pwdSaved ? 'Password Changed' : 'Update Password'}
                                </button>
                                {pwdSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500' }}>✓ Success</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Preview & Instructions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'sticky', top: '2rem' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', background: 'white' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                            <SettingsIcon size={20} /> Live Header Preview
                        </h2>
                        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            This is how your institute header will appear on exported PDF tests.
                        </p>
                        
                        <div style={{ 
                            padding: '2rem', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '0.5rem', 
                            background: '#f8fafc',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Watermark preview simulation */}
                            {settings.logo && (
                                <img src={settings.logo} alt="" style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    opacity: 0.05, maxHeight: '80%', maxWidth: '80%', pointerEvents: 'none'
                                }} />
                            )}
                            
                            <div style={{ borderBottom: '3px solid #1e293b', paddingBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                                {settings.logo && (
                                    <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 1rem 0' }}>
                                        <img src={settings.logo} alt="Institute Logo" style={{ maxHeight: '60px', objectFit: 'contain' }} />
                                    </div>
                                )}
                                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', textAlign: 'center', margin: '0 0 0.5rem 0', color: '#0f172a' }}>
                                    {settings.defaultInstitute || 'Institute Name'}
                                </h1>
                                {(settings.address || settings.mobile) && (
                                    <p style={{ textAlign: 'center', fontSize: '0.85rem', margin: '0 0 0.75rem 0', color: '#334155' }}>
                                        {settings.address} {settings.address && settings.mobile ? ' | ' : ''} {settings.mobile}
                                    </p>
                                )}
                                <h2 style={{ fontSize: '1.1rem', fontWeight: '600', textAlign: 'center', margin: 0, color: '#475569' }}>
                                    {settings.defaultTestTitle || 'Test Title'}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
