import React from 'react';
import { CLASSES, SUBJECTS } from '../../data/mockSyllabus';

const ClassSubjectStep = ({ testData, templates, updateData, handleLoadTemplate }) => {
    return (
        <div className="wizard-step fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Select Class</h2>
                {templates.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--primary-light)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-color)' }}>LOAD TEMPLATE:</span>
                        <select 
                            className="form-input" 
                            style={{ width: 'auto', minWidth: '200px', fontSize: '0.85rem', height: '35px', padding: '0 1rem' }}
                            onChange={(e) => {
                                const t = templates.find(temp => temp.id === e.target.value);
                                if (t) handleLoadTemplate(t);
                            }}
                            defaultValue=""
                        >
                            <option value="" disabled>-- Choose Template --</option>
                            {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                )}
            </div>
            <div className="options-grid">
                {CLASSES.map(cls => (
                    <div
                        key={cls.id}
                        className={`option-card ${testData.cls === cls.id ? 'selected' : ''}`}
                        onClick={() => { updateData('cls', cls.id); updateData('subject', ''); updateData('chapters', []); }}
                    >
                        <h3>{cls.name}</h3>
                    </div>
                ))}
            </div>

            {testData.cls && (
                <div className="fade-in" style={{ marginTop: '2rem' }}>
                    <h2>Select Subject</h2>
                    <div className="options-grid">
                        {SUBJECTS[testData.cls].map(sub =>
                            <div
                                key={sub.id}
                                className={`option-card ${testData.subject === sub.id ? 'selected' : ''}`}
                                onClick={() => { updateData('subject', sub.id); updateData('chapters', []); }}
                            >
                                {sub.cover && (
                                    <div className="cover-image-wrapper">
                                        <img src={sub.cover} alt={`${sub.name} Cover`} className="cover-image" />
                                    </div>
                                )}
                                <h3>{sub.name}</h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassSubjectStep;
