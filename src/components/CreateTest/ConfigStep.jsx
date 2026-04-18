import React from 'react';
import { Edit2, School, MapPin, Phone, Save } from 'lucide-react';
import PaperPreview from './PaperPreview';

const ConfigStep = ({ 
    testData, 
    updateData, 
    updateConfig, 
    handleLogoUpload, 
    actualTotalMarks, 
    isPro, 
    handleSaveTemplate,
    addCustomQ,
    updateCustomQ,
    removeCustomQ,
    cloudBank
}) => {
    return (
        <div className="wizard-step fade-in">
            <div className="config-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '2rem', alignItems: 'start' }}>
                {/* Left Side: Form */}
                <div className="config-form-scroll" style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h2>Configuration</h2>
                            <p className="text-muted">Set up structure and branding.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={handleSaveTemplate} style={{ color: 'var(--primary-color)', fontWeight: '700' }}>
                            <Save size={16} /> SAVE AS TEMPLATE
                        </button>
                    </div>

                    <div className="config-form">
                        {/* Paper Theme & Styling */}
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '2px solid var(--primary-color)' }}>
                            <h3 style={{ fontSize: '1rem', margin: '0 0 1.25rem 0', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Edit2 size={18} /> Paper Theme & Styling
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div className="form-group">
                                    <label style={{ fontWeight: '700' }}>Paper Theme</label>
                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                        {['classic', 'modern', 'compact'].map(t => (
                                            <button 
                                                key={t}
                                                className={`btn ${testData.theme === t ? 'btn-primary' : 'btn-secondary'}`}
                                                style={{ flex: 1, textTransform: 'capitalize', fontSize: '0.8rem', padding: '0.6rem' }}
                                                onClick={() => updateData('theme', t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label style={{ fontWeight: '700' }}>Urdu Font Style</label>
                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                        <button 
                                            className={`btn ${testData.urduFont === 'nastaliq' ? 'btn-primary' : 'btn-secondary'}`}
                                            style={{ flex: 1, fontSize: '0.8rem', padding: '0.6rem' }}
                                            onClick={() => updateData('urduFont', 'nastaliq')}
                                        >
                                            Nastaliq (Best)
                                        </button>
                                        <button 
                                            className={`btn ${testData.urduFont === 'regular' ? 'btn-primary' : 'btn-secondary'}`}
                                            style={{ flex: 1, fontSize: '0.8rem', padding: '0.6rem' }}
                                            onClick={() => updateData('urduFont', 'regular')}
                                        >
                                            Standard
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Institute Details */}
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--primary-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary-color)' }}>Institute Details</h3>
                                <span className="badge" style={{ fontSize: '0.7rem', background: 'var(--primary-light)', color: 'var(--primary-color)' }}>AUTO-SYNCED TO CLOUD</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.8rem' }}>Institute Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <School size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                        <input type="text" className="form-input" style={{ paddingLeft: '2.5rem', fontSize: '0.9rem' }} value={testData.instituteName} onChange={e => updateData('instituteName', e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.8rem' }}>Test Title</label>
                                    <input type="text" className="form-input" style={{ fontSize: '0.9rem' }} value={testData.testTitle} onChange={e => updateData('testTitle', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.8rem' }}>Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <MapPin size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                        <input type="text" className="form-input" style={{ paddingLeft: '2.5rem', fontSize: '0.9rem' }} value={testData.address} onChange={e => updateData('address', e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.8rem' }}>Contact</label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                        <input type="text" className="form-input" style={{ paddingLeft: '2.5rem', fontSize: '0.9rem' }} value={testData.mobile} onChange={e => updateData('mobile', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Branding */}
                            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.25rem', paddingTop: '1.25rem' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Branding</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Update Institute Logo</label>
                                        <input type="file" accept="image/*" className="form-input" style={{ fontSize: '0.9rem', padding: '0.5rem' }} onChange={handleLogoUpload} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: !isPro ? 'not-allowed' : 'pointer', fontSize: '0.9rem', opacity: !isPro ? 0.7 : 1 }}>
                                            <input type="checkbox" disabled={!isPro} checked={testData.showWatermark} onChange={(e) => updateData('showWatermark', e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-color)' }} />
                                            <span>
                                                Show Watermark 
                                                {!isPro && <span style={{ fontSize: '0.65rem', background: '#fca5a5', color: '#7f1d1d', padding: '0.15rem 0.4rem', borderRadius: '4px', marginLeft: '0.5rem', fontWeight: 'bold' }}>PRO</span>}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marks Info */}
                        <div className="form-group" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-color)' }}>
                            <label style={{ color: 'var(--primary-color)', fontWeight: '800' }}>Calculated Total Marks</label>
                            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-color)' }}>{actualTotalMarks}</div>
                        </div>

                        {/* Question Distribution */}
                        <div className="config-section-box">
                            <h4>MCQs Section</h4>
                            <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <div className="form-group">
                                    <label>Total MCQs</label>
                                    <input type="number" className="form-input" value={testData.config.mcqs} onChange={e => updateConfig('mcqs', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Marks per MCQ</label>
                                    <input type="number" className="form-input" value={testData.config.mcqMarks} onChange={e => updateConfig('mcqMarks', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="config-section-box">
                            <h4>Short Questions</h4>
                            <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                                <div className="form-group">
                                    <label>Total Given</label>
                                    <input type="number" className="form-input" value={testData.config.shortQs} onChange={e => updateConfig('shortQs', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>To Attempt</label>
                                    <input type="number" className="form-input" value={testData.config.shortQsAttempt} onChange={e => updateConfig('shortQsAttempt', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Marks per Q</label>
                                    <input type="number" className="form-input" value={testData.config.shortQMarks} onChange={e => updateConfig('shortQMarks', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="config-section-box">
                            <h4>Long Questions</h4>
                            <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                                <div className="form-group">
                                    <label>Total Given</label>
                                    <input type="number" className="form-input" value={testData.config.longQs} onChange={e => updateConfig('longQs', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>To Attempt</label>
                                    <input type="number" className="form-input" value={testData.config.longQsAttempt} onChange={e => updateConfig('longQsAttempt', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Marks per Q</label>
                                    <input type="number" className="form-input" value={testData.config.longQMarks} onChange={e => updateConfig('longQMarks', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Custom Questions */}
                        <div style={{ margin: '2rem 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>Manual Custom Questions</h3>
                                <button className="btn btn-secondary" onClick={addCustomQ}>+ Add Question</button>
                            </div>
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {testData.customQs.map((q, index) => (
                                    <div key={q.id} className="glass" style={{ padding: '1rem', borderRadius: '0.5rem', background: 'var(--bg-color)', position: 'relative' }}>
                                        <button className="btn btn-secondary" style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ef4444' }} onClick={() => removeCustomQ(q.id)}>Remove</button>
                                        <div className="form-group" style={{ marginBottom: '1rem', maxWidth: '200px' }}>
                                            <label>Type</label>
                                            <select className="form-input" value={q.type} onChange={(e) => updateCustomQ(q.id, 'type', e.target.value)}>
                                                <option value="mcq">MCQ</option>
                                                <option value="short">Short Q</option>
                                                <option value="long">Long Q</option>
                                            </select>
                                        </div>
                                        <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                            <textarea className="form-input" rows="2" value={q.en} onChange={(e) => updateCustomQ(q.id, 'en', e.target.value)} placeholder="English question..." />
                                            <textarea className="form-input urdu-text" rows="2" value={q.ur} onChange={(e) => updateCustomQ(q.id, 'ur', e.target.value)} placeholder="اردو سوال..." />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Live Preview */}
                <div className="live-preview-container" style={{ position: 'sticky', top: '2rem', transform: 'scale(0.85)', transformOrigin: 'top center', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', borderRadius: '12px' }}>
                    <div style={{ padding: '0.5rem', background: 'var(--primary-color)', color: 'white', textAlign: 'center', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em' }}>LIVE PAPER PREVIEW</div>
                    <PaperPreview 
                        testData={testData} 
                        actualTotalMarks={actualTotalMarks} 
                        cloudBank={cloudBank} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfigStep;
