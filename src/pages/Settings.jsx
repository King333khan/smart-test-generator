import React, { useState, useEffect } from 'react';
import { Save, User, Building, Settings as SettingsIcon, Phone, MapPin, Lock } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        defaultInstitute: 'My School',
        defaultTestTitle: 'Monthly Assessment - 2026',
        address: '',
        mobile: '',
        theme: 'light'
    });
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [isSaved, setIsSaved] = useState(false);
    const [pwdSaved, setPwdSaved] = useState(false);

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('appSettings')) || {
            defaultInstitute: 'My School',
            defaultTestTitle: 'Monthly Assessment - 2026',
            address: '',
            mobile: '',
            theme: 'light'
        };
        setSettings(savedSettings);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('appSettings', JSON.stringify(settings));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
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

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 600px)', gap: '2rem' }}>
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

                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button className="btn" onClick={handleSave} disabled={isSaved}>
                                <Save size={18} /> {isSaved ? 'Saved' : 'Save Settings'}
                            </button>
                            {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500' }}>✓ Preferences updated</span>}
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', background: 'white', alignSelf: 'start' }}>
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
        </div>
    );
};

export default Settings;
