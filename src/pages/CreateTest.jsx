import React, { useState } from 'react';
import { ChevronRight, Check, FileDown, Printer, Edit2, Save } from 'lucide-react';
import { CLASSES, SUBJECTS, CHAPTERS } from '../data/mockSyllabus';
import './CreateTest.css';

const StepIndicator = ({ currentStep }) => {
    const steps = ['Class & Subject', 'Chapters', 'Configuration', 'Final Paper'];

    return (
        <div className="step-indicator no-print">
            {steps.map((step, index) => {
                const isActive = currentStep === index + 1;
                const isCompleted = currentStep > index + 1;
                return (
                    <div key={index} className="step-item">
                        <div className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                            {isCompleted ? <Check size={16} /> : index + 1}
                        </div>
                        <span className={`step-label ${isActive || isCompleted ? 'active-text' : ''}`}>{step}</span>
                        {index < steps.length - 1 && <div className={`step-line ${isCompleted ? 'completed-line' : ''}`} />}
                    </div>
                );
            })}
        </div>
    );
};

const CreateTest = () => {
    const [step, setStep] = useState(1);
    const [testData, setTestData] = useState(() => {
        const savedSettings = JSON.parse(localStorage.getItem('appSettings')) || {};
        return {
            cls: '',
            subject: '',
            chapters: [],
            config: { mcqs: 10, shortQs: 5, longQs: 2, totalMarks: 50 },
            customQs: [],
            instituteName: savedSettings.defaultInstitute || 'My School',
            testTitle: savedSettings.defaultTestTitle || 'Monthly Assessment - 2026',
            address: savedSettings.address || '',
            mobile: savedSettings.mobile || ''
        };
    });

    const [isSaved, setIsSaved] = useState(false);

    const updateData = (key, value) => {
        setTestData(prev => ({ ...prev, [key]: value }));
    };

    const updateConfig = (key, value) => {
        setTestData(prev => ({ ...prev, config: { ...prev.config, [key]: parseInt(value) || 0 } }));
    };

    const nextStep = () => {
        if (step === 1 && (!testData.cls || !testData.subject)) return;
        if (step === 2 && testData.chapters.length === 0) return;
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const toggleChapter = (chapterId) => {
        setTestData(prev => {
            const isSelected = prev.chapters.includes(chapterId);
            if (isSelected) {
                return { ...prev, chapters: prev.chapters.filter(id => id !== chapterId) };
            } else {
                return { ...prev, chapters: [...prev.chapters, chapterId] };
            }
        });
    };

    const addCustomQ = () => {
        setTestData(prev => ({
            ...prev,
            customQs: [...prev.customQs, { id: Date.now().toString(), type: 'short', en: '', ur: '' }]
        }));
    };

    const updateCustomQ = (id, field, value) => {
        setTestData(prev => ({
            ...prev,
            customQs: prev.customQs.map(q => q.id === id ? { ...q, [field]: value } : q)
        }));
    };

    const removeCustomQ = (id) => {
        setTestData(prev => ({
            ...prev,
            customQs: prev.customQs.filter(q => q.id !== id)
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSave = () => {
        const existingTests = JSON.parse(localStorage.getItem('savedTests') || '[]');
        const newTest = {
            ...testData,
            id: Date.now().toString(),
            dateCreated: new Date().toISOString()
        };
        localStorage.setItem('savedTests', JSON.stringify([newTest, ...existingTests]));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="glass create-test-container">
            <div className="create-test-header no-print">
                <h1>{step === 4 ? 'Generated Paper Preview' : 'Create New Test'}</h1>
                <p className="text-muted">{step === 4 ? 'Review, edit, and print your customized test paper.' : 'Follow the wizard to generate a personalized test.'}</p>
            </div>

            <StepIndicator currentStep={step} />

            <div className="wizard-content">
                {step === 1 && (
                    <div className="wizard-step fade-in">
                        <h2>Select Class</h2>
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
                )}

                {step === 2 && (
                    <div className="wizard-step fade-in">
                        <h2>Select Chapters / Topics</h2>
                        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                            Choose the topics to include in the physical test.
                        </p>

                        <div className="chapters-list">
                            {CHAPTERS[`${testData.cls}_${testData.subject}`]?.map(ch => (
                                <label key={ch.id} className={`chapter-item ${testData.chapters.includes(ch.id) ? 'selected' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={testData.chapters.includes(ch.id)}
                                        onChange={() => toggleChapter(ch.id)}
                                    />
                                    <span>{ch.name}</span>
                                </label>
                            )) || <p className="text-muted">No mock chapters available for this selection. Try 9th Physics.</p>}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="wizard-step fade-in">
                        <h2>Test Configuration</h2>
                        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Set up the structure and branding of the exam.</p>

                        <div className="config-form">
                            <div className="form-group">
                                <label>Institute Name (Header)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={testData.instituteName}
                                    onChange={e => updateData('instituteName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Institute Address</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={testData.address}
                                    onChange={e => updateData('address', e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={testData.mobile}
                                    onChange={e => updateData('mobile', e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>
                            <div className="form-group">
                                <label>Test Title / Description</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={testData.testTitle}
                                    onChange={e => updateData('testTitle', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Total Marks</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={testData.config.totalMarks}
                                    onChange={e => updateConfig('totalMarks', e.target.value)}
                                />
                            </div>

                            <div className="nav-divider" style={{ margin: '2rem 0' }}></div>

                            <h3>Question Distribution</h3>
                            <div className="options-grid" style={{ marginTop: '1rem' }}>
                                <div className="form-group">
                                    <label>Number of MCQs</label>
                                    <input type="number" className="form-input" value={testData.config.mcqs} onChange={e => updateConfig('mcqs', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Short Questions</label>
                                    <input type="number" className="form-input" value={testData.config.shortQs} onChange={e => updateConfig('shortQs', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Long Questions</label>
                                    <input type="number" className="form-input" value={testData.config.longQs} onChange={e => updateConfig('longQs', e.target.value)} />
                                </div>
                            </div>

                            <div className="nav-divider" style={{ margin: '2rem 0' }}></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>Manual Custom Questions</h3>
                                <button className="btn btn-secondary" onClick={addCustomQ} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>+ Add Question</button>
                            </div>
                            <p className="text-muted" style={{ marginTop: '0.25rem' }}>Want to add specific questions? They will be appended to the generated ones.</p>

                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {testData.customQs.map((q, index) => (
                                    <div key={q.id} className="glass" style={{ padding: '1rem', borderRadius: '0.5rem', background: 'var(--bg-color)', position: 'relative' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.6rem', color: '#ef4444', borderColor: '#fca5a5', fontSize: '0.8rem' }}
                                            onClick={() => removeCustomQ(q.id)}
                                        >
                                            Remove
                                        </button>

                                        <div className="form-group" style={{ marginBottom: '1rem', maxWidth: '200px' }}>
                                            <label>Question Type</label>
                                            <select className="form-input" value={q.type} onChange={(e) => updateCustomQ(q.id, 'type', e.target.value)}>
                                                <option value="mcq">MCQ</option>
                                                <option value="short">Short Question</option>
                                                <option value="long">Long Question</option>
                                            </select>
                                        </div>

                                        <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="form-group">
                                                <label>English Text</label>
                                                <textarea
                                                    className="form-input"
                                                    rows="2"
                                                    value={q.en}
                                                    onChange={(e) => updateCustomQ(q.id, 'en', e.target.value)}
                                                    placeholder="Type question here..."
                                                ></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label>Urdu Text (Optional)</label>
                                                <textarea
                                                    className="form-input"
                                                    rows="2"
                                                    value={q.ur}
                                                    onChange={(e) => updateCustomQ(q.id, 'ur', e.target.value)}
                                                    placeholder="یہاں سوال ٹائپ کریں..."
                                                    style={{ fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", direction: 'rtl', fontSize: '1.2rem' }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="wizard-step fade-in" id="printable-area">
                        <div className="paper-container">
                            {/* View rendered only on print / paper preview */}
                            <div className="paper-header">
                                <h1 className="institute-title">{testData.instituteName}</h1>
                                {(testData.address || testData.mobile) && (
                                    <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: '-0.5rem 0 0.5rem 0' }}>
                                        {testData.address} {testData.address && testData.mobile ? ' | ' : ''} {testData.mobile}
                                    </p>
                                )}
                                <h2 className="test-subtitle">{testData.testTitle}</h2>

                                <div className="paper-meta">
                                    <div><strong>Class:</strong> {CLASSES.find(c => c.id === testData.cls)?.name || ''}</div>
                                    <div><strong>Subject:</strong> {SUBJECTS[testData.cls]?.find(s => s.id === testData.subject)?.name || ''}</div>
                                    <div><strong>Total Marks:</strong> {testData.config.totalMarks}</div>
                                    <div><strong>Time Allowed:</strong> 2 Hours</div>
                                </div>

                                <div className="student-details">
                                    <div>Name: _______________________</div>
                                    <div>Roll No: ________________</div>
                                    <div>Date: ___/___/202__</div>
                                </div>
                            </div>

                            <div className="paper-body">
                                {/* Objective Part */}
                                {testData.config.mcqs > 0 && (
                                    <div className="question-section">
                                        <div className="dual-lang-header">
                                            <h3 className="en">PART I - OBJECTIVE (MCQs)</h3>
                                            <h3 className="ur">حصہ اول - معروضی</h3>
                                        </div>
                                        <div className="dual-lang-header" style={{ marginBottom: '1rem' }}>
                                            <span className="en">Marks: {(testData.config.mcqs + testData.customQs.filter(q => q.type === 'mcq').length) * 1}</span>
                                            <span className="ur">نمبر: {(testData.config.mcqs + testData.customQs.filter(q => q.type === 'mcq').length) * 1}</span>
                                        </div>

                                        <div className="dual-lang-header">
                                            <p className="en"><strong>Q1: Choose the correct answer.</strong></p>
                                            <p className="ur"><strong>سوال 1: درست جواب کا انتخاب کریں۔</strong></p>
                                        </div>

                                        <div className="mcq-list">
                                            {Array.from({ length: testData.config.mcqs }).map((_, i) => (
                                                <div key={i} className="dual-mcq-item">
                                                    <div className="mcq-question-row">
                                                        <div className="mcq-en">{i + 1}. This is a mocked multiple choice question from the selected chapters?</div>
                                                        <div className="mcq-ur">یہ منتخب کردہ ابواب میں سے ایک فرضی کثیر الانتخابی سوال ہے؟ .{i + 1}</div>
                                                    </div>
                                                    <div className="mcq-options-row">
                                                        <div>(A) Option 1</div>
                                                        <div>(B) Option 2</div>
                                                        <div>(C) Option 3</div>
                                                        <div>(D) Option 4</div>
                                                    </div>
                                                </div>
                                            ))}
                                            {testData.customQs.filter(q => q.type === 'mcq').map((q, i) => (
                                                <div key={q.id} className="dual-mcq-item">
                                                    <div className="mcq-question-row">
                                                        <div className="mcq-en">{testData.config.mcqs + i + 1}. {q.en || "Custom MCQ"}</div>
                                                        <div className="mcq-ur">{q.ur || "کسٹم ایم سی کیو"} .{testData.config.mcqs + i + 1}</div>
                                                    </div>
                                                    <div className="mcq-options-row">
                                                        <div>(A)</div>
                                                        <div>(B)</div>
                                                        <div>(C)</div>
                                                        <div>(D)</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Subjective Part */}
                                <div style={{ pageBreakBefore: 'always', marginTop: '20px' }}></div>

                                {(testData.config.shortQs > 0 || testData.config.longQs > 0) && (
                                    <div className="question-section">
                                        <div className="dual-lang-header" style={{ borderBottom: '2px solid black', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                                            <h3 className="en">PART II - SUBJECTIVE</h3>
                                            <h3 className="ur">حصہ دوم - انشائیہ</h3>
                                        </div>

                                        {testData.config.shortQs > 0 && (
                                            <div className="short-qs" style={{ marginTop: '1.5rem' }}>
                                                <div className="dual-lang-header">
                                                    <p className="en"><strong>Q2: Write short answers. ({(testData.config.shortQs + testData.customQs.filter(q => q.type === 'short').length) * 2} Marks)</strong></p>
                                                    <p className="ur"><strong>سوال 2: مختصر جوابات لکھیں۔ ({(testData.config.shortQs + testData.customQs.filter(q => q.type === 'short').length) * 2} نمبر)</strong></p>
                                                </div>

                                                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {Array.from({ length: testData.config.shortQs }).map((_, i) => (
                                                        <div key={i} className="dual-subjective-q">
                                                            <div className="en">({i + 1}) Define and explain the concept related to selected topic {i + 1}.</div>
                                                            <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Nafees Web Naskh', 'Arial', sans-serif", fontSize: '1.25rem', direction: 'rtl' }}>منتخب کردہ عنوان {i + 1} سے متعلق تصور کی تعریف اور وضاحت کریں۔ ({i + 1})</div>
                                                        </div>
                                                    ))}
                                                    {testData.customQs.filter(q => q.type === 'short').map((q, i) => (
                                                        <div key={q.id} className="dual-subjective-q">
                                                            <div className="en">({testData.config.shortQs + i + 1}) {q.en || "Custom Short Question"}</div>
                                                            <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Nafees Web Naskh', 'Arial', sans-serif", fontSize: '1.25rem', direction: 'rtl' }}>{q.ur || "کسٹم مختصر سوال"} ({testData.config.shortQs + i + 1})</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {testData.config.longQs > 0 && (
                                            <div className="long-qs" style={{ marginTop: '2rem' }}>
                                                <div className="dual-lang-header">
                                                    <p className="en"><strong>Attempt questions in detail. ({(testData.config.longQs + testData.customQs.filter(q => q.type === 'long').length) * 5} Marks)</strong></p>
                                                    <p className="ur"><strong>تفصیلی جوابات لکھیں۔ ({(testData.config.longQs + testData.customQs.filter(q => q.type === 'long').length) * 5} نمبر)</strong></p>
                                                </div>

                                                <div style={{ marginTop: '1.5rem' }}>
                                                    {Array.from({ length: testData.config.longQs }).map((_, i) => (
                                                        <div key={i} style={{ marginBottom: '1.5rem' }}>
                                                            <div className="dual-subjective-q">
                                                                <strong className="en" style={{ minWidth: '40px' }}>Q{i + 3}:</strong>
                                                                <strong className="ur" style={{ minWidth: '40px', fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>سوال {i + 3}:</strong>
                                                            </div>
                                                            <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                                                <div className="en">(a) Describe in detail the phenomenon of the core topic.</div>
                                                                <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>بنیادی عنوان کے رجحان کو تفصیل سے بیان کریں۔ (a)</div>
                                                            </div>
                                                            <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '0.5rem' }}>
                                                                <div className="en">(b) Solve the related numerical or write the application.</div>
                                                                <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>متعلقہ عددی حل کریں یا درخواست لکھیں۔ (b)</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {testData.customQs.filter(q => q.type === 'long').map((q, i) => (
                                                        <div key={q.id} style={{ marginBottom: '1.5rem' }}>
                                                            <div className="dual-subjective-q">
                                                                <strong className="en" style={{ minWidth: '40px' }}>Q{testData.config.longQs + i + 3}:</strong>
                                                                <strong className="ur" style={{ minWidth: '40px', fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>سوال {testData.config.longQs + i + 3}:</strong>
                                                            </div>
                                                            <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                                                <div className="en">{q.en || "Custom Long Question"}</div>
                                                                <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>{q.ur || "کسٹم طویل سوال"}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="wizard-footer no-print">
                {step > 1 && (
                    <button className="btn btn-secondary" onClick={prevStep}>
                        Back
                    </button>
                )}
                <div style={{ flex: 1 }}></div>
                {step < 4 ? (
                    <button
                        className="btn"
                        onClick={nextStep}
                        disabled={
                            (step === 1 && (!testData.cls || !testData.subject)) ||
                            (step === 2 && testData.chapters.length === 0)
                        }
                    >
                        {step === 3 ? 'Generate Paper' : 'Next Step'} <ChevronRight size={18} />
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500' }}>✓ Saved successfully!</span>}
                        <button className="btn btn-secondary" onClick={handleSave} disabled={isSaved}>
                            <Save size={18} /> {isSaved ? 'Saved' : 'Save Test'}
                        </button>
                        <button className="btn" onClick={handlePrint}><Printer size={18} /> Print / Save as PDF</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateTest;
