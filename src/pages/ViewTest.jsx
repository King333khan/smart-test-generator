import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, Save, Type, Minus, Plus, LayoutTemplate, SplitSquareHorizontal, FileEdit, Download } from 'lucide-react';
import { CLASSES, SUBJECTS } from '../data/mockSyllabus';
import { generateMockQuestion } from '../utils/questionGenerator';
import './CreateTest.css';

const ViewTest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const paperRef = useRef(null);
    const [testData, setTestData] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    // Advanced Paper Settings
    const [settings, setSettings] = useState({
        lineHeight: 1.6,
        showHeader: true,
        showDividers: false,
        headerStyle: 'default', // 'default', 'centered', 'compact'
        isEditing: false
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedTests') || '[]');
        const test = saved.find(t => t.id === id);
        if (test) {
            setTestData(test);
        }
    }, [id]);

    const handleSave = () => {
        // If they editing manually, we should ideally extract innerHTML, but for now 
        // we just save the current testData overrides
        if (!testData) return;
        const saved = JSON.parse(localStorage.getItem('savedTests') || '[]');
        const updatedTests = saved.map(t => t.id === testData.id ? testData : t);
        localStorage.setItem('savedTests', JSON.stringify(updatedTests));

        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleDataChange = (field, value) => {
        setTestData(prev => ({ ...prev, [field]: value }));
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const changeLineHeight = (delta) => {
        setSettings(prev => ({
            ...prev,
            lineHeight: Math.max(1.1, Math.min(3.0, prev.lineHeight + delta))
        }));
    };

    const cycleHeaderStyle = () => {
        const styles = ['default', 'centered', 'compact'];
        const currentIndex = styles.indexOf(settings.headerStyle);
        setSettings(prev => ({
            ...prev,
            headerStyle: styles[(currentIndex + 1) % styles.length]
        }));
    };

    const exportToWord = () => {
        if (!paperRef.current) return;

        // Header & Footer for MS Word compatibility
        const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>Export HTML To Doc</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: ${settings.lineHeight};
                    margin: 20px;
                }
                .institute-title { text-align: ${settings.headerStyle === 'centered' ? 'center' : 'left'}; font-size: 24pt; font-weight: bold; }
                .test-subtitle { text-align: ${settings.headerStyle === 'centered' ? 'center' : 'left'}; font-size: 16pt; font-weight: bold; }
                .paper-meta { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .dual-lang-header { margin-top: 15px; margin-bottom: 10px; font-weight: bold; }
                .en { text-align: left; direction: ltr; }
                .ur { text-align: right; direction: rtl; font-family: 'Jameel Noori Nastaleeq', 'Arial', sans-serif; font-size: 14pt; }
                .mcq-question-row, .dual-subjective-q { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .mcq-options-row { display: flex; justify-content: space-between; margin-bottom: 15px; }
                .mcq-en { flex: 1; text-align: left; }
                .mcq-ur { flex: 1; text-align: right; direction: rtl; font-family: 'Jameel Noori Nastaleeq', 'Arial', sans-serif;}
                hr { border: 0; border-bottom: 1px dashed #ccc; margin: 15px 0; }
                @page { size: A4; margin: 1in; }
            </style>
        </head><body>`;

        const content = paperRef.current.innerHTML;
        const postHtml = "</body></html>";
        const html = preHtml + content + postHtml;

        const blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });

        // Create a link and trigger download
        const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        const filename = testData.testTitle ? `${testData.testTitle.replace(/\s+/g, '_')}.doc` : 'Test_Paper.doc';

        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    };

    if (!testData) return (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center', minHeight: 'calc(100vh - 4rem)' }}>
            <h2>Test not found or could not be loaded.</h2>
            <button className="btn" onClick={() => navigate('/saved')} style={{ marginTop: '1rem' }}>
                <ArrowLeft size={16} /> Back to Saved Tests
            </button>
        </div>
    );

    return (
        <div className="glass create-test-container" style={{ padding: '0', background: 'transparent', border: 'none', boxShadow: 'none' }}>

            {/* Advanced Paper Formatting Toolbar */}
            <div className="no-print" style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '1rem',
                marginBottom: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="btn btn-secondary" onClick={() => navigate('/saved')}>
                            <ArrowLeft size={16} /> Back
                        </button>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Advanced Toolbar</h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500', fontSize: '0.9rem' }}>✓ Saved changes</span>}
                        <button className="btn btn-secondary" onClick={handleSave}>
                            <Save size={16} /> Save Edits
                        </button>
                        <button className="btn btn-secondary" onClick={exportToWord} style={{ color: '#2563eb', borderColor: '#bfdbfe' }}>
                            <Download size={16} /> Download Word
                        </button>
                        <button className="btn" onClick={() => window.print()}>
                            <Printer size={16} /> Print Test
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    {/* Line Height Control */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem' }}>
                        <Type size={16} className="text-muted" />
                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Line Spacing</span>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem' }} onClick={() => changeLineHeight(-0.1)}><Minus size={14} /></button>
                        <span style={{ fontSize: '0.9rem', width: '30px', textAlign: 'center' }}>{settings.lineHeight.toFixed(1)}</span>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem' }} onClick={() => changeLineHeight(0.1)}><Plus size={14} /></button>
                    </div>

                    {/* Header Toggle/Style */}
                    <button className={`btn btn-secondary ${settings.showHeader ? '' : 'text-muted'}`} onClick={() => toggleSetting('showHeader')} style={{ opacity: settings.showHeader ? 1 : 0.6 }}>
                        <LayoutTemplate size={16} /> {settings.showHeader ? 'Hide Header' : 'Show Header'}
                    </button>

                    {settings.showHeader && (
                        <button className="btn btn-secondary" onClick={cycleHeaderStyle}>
                            Style: {settings.headerStyle.charAt(0).toUpperCase() + settings.headerStyle.slice(1)}
                        </button>
                    )}

                    {/* Dividers */}
                    <button className={`btn btn-secondary ${settings.showDividers ? 'active' : ''}`} onClick={() => toggleSetting('showDividers')} style={{ borderColor: settings.showDividers ? 'var(--primary-color)' : '' }}>
                        <SplitSquareHorizontal size={16} /> {settings.showDividers ? 'Remove Lines' : 'Add Lines'}
                    </button>

                    {/* Manual Editing Toggle */}
                    <button className="btn btn-secondary" onClick={() => toggleSetting('isEditing')} style={{ background: settings.isEditing ? 'var(--primary-color)' : '', color: settings.isEditing ? 'white' : '' }}>
                        <FileEdit size={16} /> {settings.isEditing ? 'Finish Edit' : 'Manual Edit'}
                    </button>
                </div>
            </div>

            <div className="paper-container" style={{ margin: 0, lineHeight: settings.lineHeight }} ref={paperRef}>
                {/* Editable Wrapper */}
                <div contentEditable={settings.isEditing} suppressContentEditableWarning={true} style={{ outline: settings.isEditing ? '2px dashed #cbd5e1' : 'none', padding: settings.isEditing ? '1rem' : '0', transition: 'all 0.2s' }}>

                    {/* Dynamic Header */}
                    {settings.showHeader && (
                        <div className={`paper-header style-${settings.headerStyle}`} style={{
                            textAlign: settings.headerStyle === 'centered' ? 'center' : 'left',
                            display: settings.headerStyle === 'compact' ? 'flex' : 'block',
                            justifyContent: 'space-between',
                            borderBottom: settings.headerStyle === 'compact' ? '2px solid black' : '2px solid black'
                        }}>
                            <div>
                                <h1 className="institute-title" style={{ fontSize: settings.headerStyle === 'compact' ? '1.5rem' : '2rem' }}>{testData.instituteName}</h1>
                                {settings.headerStyle !== 'compact' && (testData.address || testData.mobile) && (
                                    <p style={{
                                        textAlign: settings.headerStyle === 'centered' ? 'center' : 'left',
                                        fontSize: '0.9rem',
                                        margin: '-0.25rem 0 0.5rem 0'
                                    }}>
                                        {testData.address} {testData.address && testData.mobile ? ' | ' : ''} {testData.mobile}
                                    </p>
                                )}
                                <h2 className="test-subtitle" style={{ fontSize: settings.headerStyle === 'compact' ? '1rem' : '1.25rem', marginBottom: settings.headerStyle === 'compact' ? '0' : '1.5rem' }}>{testData.testTitle}</h2>
                            </div>

                            <div className="paper-meta" style={{
                                display: 'flex',
                                gap: settings.headerStyle === 'compact' ? '1rem' : '2rem',
                                marginBottom: settings.headerStyle === 'compact' ? '0' : '1.5rem',
                                justifyContent: settings.headerStyle === 'centered' ? 'center' : 'auto'
                            }}>
                                <div><strong>Class:</strong> {CLASSES.find(c => c.id === testData.cls)?.name || ''}</div>
                                <div><strong>Subject:</strong> {SUBJECTS[testData.cls]?.find(s => s.id === testData.subject)?.name || ''}</div>
                                <div><strong>Marks:</strong> {testData.config.totalMarks}</div>
                                {settings.headerStyle !== 'compact' && <div><strong>Time:</strong> 2 Hours</div>}
                            </div>

                            {settings.headerStyle !== 'compact' && (
                                <div className="student-details" style={{
                                    justifyContent: settings.headerStyle === 'centered' ? 'center' : 'space-between',
                                    gap: settings.headerStyle === 'centered' ? '2rem' : '0'
                                }}>
                                    <div>Name: _______________________</div>
                                    <div>Roll No: ___________</div>
                                    <div>Date: ___/___/20__</div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="paper-body">
                        {/* Objective Part */}
                        {testData.config.mcqs > 0 && (
                            <div className="question-section">
                                <div className="dual-lang-header">
                                    <h3 className="en">PART I - OBJECTIVE (MCQs)</h3>
                                    <h3 className="ur">حصہ اول - معروضی</h3>
                                </div>
                                <div className="dual-lang-header" style={{ marginBottom: '1rem', borderBottom: settings.showDividers ? '1px dashed #ccc' : 'none', paddingBottom: '0.5rem' }}>
                                    <span className="en">Marks: {(testData.config.mcqs + (testData.customQs?.filter(q => q.type === 'mcq').length || 0)) * (testData.config.mcqMarks || 1)}</span>
                                    <span className="ur">نمبر: {(testData.config.mcqs + (testData.customQs?.filter(q => q.type === 'mcq').length || 0)) * (testData.config.mcqMarks || 1)}</span>
                                </div>

                                <div className="dual-lang-header">
                                    <p className="en"><strong>Q1: Choose the correct answer.</strong></p>
                                    <p className="ur"><strong>سوال 1: درست جواب کا انتخاب کریں۔</strong></p>
                                </div>

                                <div className="mcq-list">
                                    {Array.from({ length: testData.config.mcqs }).map((_, i) => {
                                        const q = generateMockQuestion('mcq', testData.cls, testData.subject, testData.chapters, i);
                                        return (
                                            <div key={i} className="dual-mcq-item" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '1rem' : '0' }}>
                                                <div className="mcq-question-row">
                                                    <div className="mcq-en">{i + 1}. {q.en}</div>
                                                    <div className="mcq-ur">{q.ur} .{i + 1}</div>
                                                </div>
                                                <div className="mcq-options-row">
                                                    <div>(A) {q.options?.[0] || 'Option 1'}</div>
                                                    <div>(B) {q.options?.[1] || 'Option 2'}</div>
                                                    <div>(C) {q.options?.[2] || 'Option 3'}</div>
                                                    <div>(D) {q.options?.[3] || 'Option 4'}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {testData.customQs?.filter(q => q.type === 'mcq').map((q, i) => (
                                        <div key={q.id} className="dual-mcq-item" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '1rem' : '0' }}>
                                            <div className="mcq-question-row">
                                                <div className="mcq-en">{testData.config.mcqs + i + 1}. {q.en || "Custom MCQ"}</div>
                                                <div className="mcq-ur">{q.ur || "کسٹم ایم سی کیو"} .{testData.config.mcqs + i + 1}</div>
                                            </div>
                                            <div className="mcq-options-row">
                                                <div>(A) {q.options?.[0] || ''}</div>
                                                <div>(B) {q.options?.[1] || ''}</div>
                                                <div>(C) {q.options?.[2] || ''}</div>
                                                <div>(D) {q.options?.[3] || ''}</div>
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
                                        <div className="dual-lang-header" style={{ borderBottom: settings.showDividers ? '1px dashed #ccc' : 'none', paddingBottom: '0.5rem' }}>
                                            <p className="en"><strong>Q2: Write short answers of any {testData.config.shortQsAttempt || testData.config.shortQs} questions. ({(testData.config.shortQsAttempt || testData.config.shortQs) * (testData.config.shortQMarks || 2)} Marks)</strong></p>
                                            <p className="ur"><strong>سوال 2: کوئی سے {testData.config.shortQsAttempt || testData.config.shortQs} مختصر جوابات لکھیں۔ ({(testData.config.shortQsAttempt || testData.config.shortQs) * (testData.config.shortQMarks || 2)} نمبر)</strong></p>
                                        </div>

                                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {Array.from({ length: testData.config.shortQs }).map((_, i) => {
                                                const q = generateMockQuestion('short', testData.cls, testData.subject, testData.chapters, i);
                                                return (
                                                    <div key={i} className="dual-subjective-q" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '0.75rem' : '0' }}>
                                                        <div className="en">({i + 1}) {q.en}</div>
                                                        <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Nafees Web Naskh', 'Arial', sans-serif", fontSize: '1.25rem', direction: 'rtl' }}>{q.ur} ({i + 1})</div>
                                                    </div>
                                                )
                                            })}
                                            {testData.customQs?.filter(q => q.type === 'short').map((q, i) => (
                                                <div key={q.id} className="dual-subjective-q" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '0.75rem' : '0' }}>
                                                    <div className="en">({testData.config.shortQs + i + 1}) {q.en || "Custom Short Question"}</div>
                                                    <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Nafees Web Naskh', 'Arial', sans-serif", fontSize: '1.25rem', direction: 'rtl' }}>{q.ur || "کسٹم مختصر سوال"} ({testData.config.shortQs + i + 1})</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {testData.config.longQs > 0 && (
                                    <div className="long-qs" style={{ marginTop: '2rem' }}>
                                        <div className="dual-lang-header" style={{ borderBottom: settings.showDividers ? '1px dashed #ccc' : 'none', paddingBottom: '0.5rem' }}>
                                            <p className="en"><strong>Attempt any {testData.config.longQsAttempt || testData.config.longQs} questions in detail. ({(testData.config.longQsAttempt || testData.config.longQs) * (testData.config.longQMarks || 5)} Marks)</strong></p>
                                            <p className="ur"><strong>کوئی سے {testData.config.longQsAttempt || testData.config.longQs} تفصیلی جوابات لکھیں۔ ({(testData.config.longQsAttempt || testData.config.longQs) * (testData.config.longQMarks || 5)} نمبر)</strong></p>
                                        </div>

                                        <div style={{ marginTop: '1.5rem' }}>
                                            {Array.from({ length: testData.config.longQs }).map((_, i) => {
                                                const qA = generateMockQuestion('long', testData.cls, testData.subject, testData.chapters, i * 2);
                                                const qB = generateMockQuestion('long', testData.cls, testData.subject, testData.chapters, i * 2 + 1);
                                                return (
                                                    <div key={i} style={{ marginBottom: '1.5rem', borderBottom: settings.showDividers ? '1px solid #ccc' : 'none', paddingBottom: settings.showDividers ? '1.5rem' : '0' }}>
                                                        <div className="dual-subjective-q">
                                                            <strong className="en" style={{ minWidth: '40px' }}>Q{i + 3}:</strong>
                                                            <strong className="ur" style={{ minWidth: '40px', fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>سوال {i + 3}:</strong>
                                                        </div>
                                                        <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                                            <div className="en">(a) {qA.en}</div>
                                                            <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>{qA.ur} (a)</div>
                                                        </div>
                                                        <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '0.5rem' }}>
                                                            <div className="en">(b) {qB.en}</div>
                                                            <div className="ur" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Arial', sans-serif", direction: 'rtl', fontSize: '1.25rem' }}>{qB.ur} (b)</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {testData.customQs?.filter(q => q.type === 'long').map((q, i) => (
                                                <div key={q.id} style={{ marginBottom: '1.5rem', borderBottom: settings.showDividers ? '1px solid #ccc' : 'none', paddingBottom: settings.showDividers ? '1.5rem' : '0' }}>
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
        </div >
    );
};

export default ViewTest;
