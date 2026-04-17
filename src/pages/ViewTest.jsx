import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, Save, Type, Minus, Plus, LayoutTemplate, SplitSquareHorizontal, FileEdit, Download, Files, FileDown, Loader2, Cloud } from 'lucide-react';
import { CLASSES, SUBJECTS } from '../data/mockSyllabus';
import { generateMockQuestion } from '../utils/questionGenerator';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../utils/AuthContext';
import Latex from 'react-latex-next';
import html2pdf from 'html2pdf.js';
import './CreateTest.css';

const ViewTest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const paperRef = useRef(null);
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [cloudBank, setCloudBank] = useState({});

    // Advanced Paper Settings
    const [settings, setSettings] = useState({
        lineHeight: 1.6,
        showHeader: true,
        showDividers: false,
        headerStyle: 'default', // 'default', 'centered', 'compact'
        isEditing: false,
        pageBreak: false
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                // 1. Fetch the Test
                const { data, error } = await supabase
                    .from('saved_tests')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setTestData({
                        id: data.id,
                        ...data.test_data
                    });
                }

                // 2. Fetch Questions from Cloud Bank (to use in generator)
                const { data: qsData } = await supabase
                    .from('custom_questions')
                    .select('*')
                    .eq('user_id', user.id);
                
                if (qsData) {
                    const structured = {};
                    qsData.forEach(q => {
                        const key = `${q.class}_${q.subject}`;
                        if (!structured[key]) structured[key] = {};
                        if (!structured[key][q.chapter]) structured[key][q.chapter] = {};
                        if (!structured[key][q.chapter][q.type]) structured[key][q.chapter][q.type] = [];
                        structured[key][q.chapter][q.type].push(q.data);
                    });
                    setCloudBank(structured);
                }
            } catch (err) {
                console.error('Fetch test/bank error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, user]);

    const handleSave = async () => {
        if (!testData || !user) return;
        try {
            const { error } = await supabase
                .from('saved_tests')
                .update({
                    test_data: testData,
                    test_title: testData.testTitle
                })
                .eq('id', id);

            if (error) throw error;
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err) {
            console.error('Cloud update error:', err);
            alert('Failed to save changes to cloud.');
        }
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
                .ur { text-align: right; direction: rtl; font-family: 'Jameel Noori Nastaleeq', 'Jameel Noori Nastaliq', 'Noto Nastaliq Urdu', 'Arial', sans-serif !important; font-size: 14pt; }
                .mcq-question-row, .dual-subjective-q { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .mcq-options-row { display: flex; justify-content: space-between; margin-bottom: 15px; }
                .mcq-en { flex: 1; text-align: left; }
                .mcq-ur { flex: 1; text-align: right; direction: rtl; font-family: 'Jameel Noori Nastaleeq', 'Jameel Noori Nastaliq', 'Noto Nastaliq Urdu', 'Arial', sans-serif !important; }
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

    const handleExportPDF = () => {
        if (!paperRef.current) return;
        
        const element = paperRef.current;
        const originalMargin = element.style.margin;
        const originalShadow = element.style.boxShadow;
        const originalBorder = element.style.border;
        
        element.style.margin = '0';
        element.style.boxShadow = 'none';
        element.style.border = 'none';

        const opt = {
            margin:       0.5,
            filename:     `${testData.testTitle ? testData.testTitle.replace(/\s+/g, '_') : 'Test_Paper'}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            element.style.margin = originalMargin;
            element.style.boxShadow = originalShadow;
            element.style.border = originalBorder;
        });
    };

    if (loading) return (
        <div className="glass" style={{ padding: '10rem 2rem', textAlign: 'center', minHeight: 'calc(100vh - 4rem)' }}>
            <Loader2 size={64} className="spin" style={{ color: 'var(--primary-color)', margin: '0 auto', opacity: 0.5 }} />
            <p className="text-muted" style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>Restoring paper from cloud...</p>
        </div>
    );

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
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Archive Viewer</h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginRight: '1rem', fontSize: '0.8rem' }}>
                            <Cloud size={14} /> Cloud Active
                        </span>
                        {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500', fontSize: '0.9rem' }}>✓ Cloud Synced</span>}
                        <button className="btn btn-secondary" onClick={handleSave}>
                            <Save size={16} /> Save Edits
                        </button>
                        <button className="btn btn-secondary" onClick={exportToWord} style={{ color: '#2563eb', borderColor: '#bfdbfe' }}>
                            <Download size={16} /> Word Doc
                        </button>
                        <button className="btn btn-secondary" onClick={handleExportPDF} style={{ color: '#0ea5e9', borderColor: '#bae6fd' }}>
                            <FileDown size={16} /> Download PDF
                        </button>
                        <button className="btn" onClick={() => window.print()}>
                            <Printer size={16} /> Print
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    {/* Theme Optimization */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem' }}>
                        <Files size={16} className="text-muted" />
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-color)' }}>ECO-COMPACT</span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button className={`btn-sm ${testData.theme === 'classic' ? 'active' : ''}`} onClick={() => handleDataChange('theme', 'classic')}>Standard</button>
                            <button className={`btn-sm ${testData.theme === 'compact' ? 'active' : ''}`} style={{ color: testData.theme === 'compact' ? '#10b981' : '' }} onClick={() => handleDataChange('theme', 'compact')}>Compact</button>
                            <button className={`btn-sm ${testData.theme === 'modern' ? 'active' : ''}`} onClick={() => handleDataChange('theme', 'modern')}>Premium</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem' }}>
                        <Type size={16} className="text-muted" />
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button className={`btn-sm ${testData.urduFont === 'nastaliq' ? 'active' : ''}`} onClick={() => handleDataChange('urduFont', 'nastaliq')}>Nastaliq</button>
                            <button className={`btn-sm ${testData.urduFont === 'regular' ? 'active' : ''}`} onClick={() => handleDataChange('urduFont', 'regular')}>Regular</button>
                        </div>
                    </div>

                    {/* Line Height Control */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Line Spacing</span>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem' }} onClick={() => changeLineHeight(-0.1)}><Minus size={14} /></button>
                        <span style={{ fontSize: '0.9rem', width: '30px', textAlign: 'center' }}>{settings.lineHeight.toFixed(1)}</span>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem' }} onClick={() => changeLineHeight(0.1)}><Plus size={14} /></button>
                    </div>

                    {/* Header Toggle/Style */}
                    <button className={`btn btn-secondary ${settings.showHeader ? '' : 'text-muted'}`} onClick={() => toggleSetting('showHeader')} style={{ opacity: settings.showHeader ? 1 : 0.6 }}>
                        <LayoutTemplate size={16} /> Header
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
                        <FileEdit size={16} /> {settings.isEditing ? 'Finish Edit' : 'Edit Mode'}
                    </button>
                </div>
            </div>

            <div className={`paper-container theme-${testData.theme || 'classic'} font-${testData.urduFont || 'nastaliq'}`} style={{ margin: 0, lineHeight: settings.lineHeight }} ref={paperRef}>
                {/* Editable Wrapper */}
                <div contentEditable={settings.isEditing} suppressContentEditableWarning={true} style={{ outline: settings.isEditing ? '2px dashed #cbd5e1' : 'none', padding: settings.isEditing ? '1rem' : '0', transition: 'all 0.2s' }}>

                    {/* Dynamic Header */}
                    {testData.showWatermark && testData.logo && (
                        <img src={testData.logo} alt="" className="watermark-bg" />
                    )}

                    {settings.showHeader && (
                        <div className={`paper-header style-${settings.headerStyle}`} style={{
                            textAlign: settings.headerStyle === 'centered' ? 'center' : 'left',
                            display: settings.headerStyle === 'compact' ? 'flex' : 'block',
                            justifyContent: 'space-between',
                            borderBottom: settings.headerStyle === 'compact' ? '2px solid black' : '2px solid black'
                        }}>
                            {testData.logo && settings.headerStyle !== 'compact' && (
                                <div className="institute-logo-container">
                                    <img src={testData.logo} alt="Institute Logo" className="institute-logo-img" />
                                </div>
                            )}
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
                                <div><strong>Marks:</strong> {testData.config?.totalMarks || 0}</div>
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
                        {testData.config?.mcqs > 0 && (
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
                                        const q = generateMockQuestion('mcq', testData.cls, testData.subject, testData.chapters, i, cloudBank);
                                        return (
                                            <div key={i} className="dual-mcq-item" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '1rem' : '0' }}>
                                                <div className="mcq-question-row">
                                                    <div className="mcq-en">{i + 1}. <Latex>{q.en}</Latex></div>
                                                    <div className="mcq-ur">{q.ur} .{i + 1}</div>
                                                </div>
                                                <div className="mcq-options-row" style={{ alignItems: 'flex-start' }}>
                                                    {[0, 1, 2, 3].map(optIndex => (
                                                        <div key={optIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                                            <span>({String.fromCharCode(65 + optIndex)}) <Latex>{q.options?.[optIndex] || `Option ${optIndex + 1}`}</Latex></span>
                                                            {q.urOptions?.[optIndex] && (
                                                                <span className="ur" style={{ fontSize: '1.25rem', direction: 'rtl' }}>
                                                                    {q.urOptions[optIndex]}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {testData.customQs?.filter(q => q.type === 'mcq').map((q, i) => (
                                        <div key={q.id} className="dual-mcq-item" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '1rem' : '0' }}>
                                            <div className="mcq-question-row">
                                                <div className="mcq-en">{testData.config.mcqs + i + 1}. <Latex>{q.en || "Custom MCQ"}</Latex></div>
                                                <div className="mcq-ur">{q.ur || "کسٹم ایم سی کیو"} .{testData.config.mcqs + i + 1}</div>
                                            </div>
                                            <div className="mcq-options-row" style={{ alignItems: 'flex-start' }}>
                                                {[0, 1, 2, 3].map(optIndex => (
                                                    <div key={optIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                                        <span>({String.fromCharCode(65 + optIndex)}) <Latex>{q.options?.[optIndex] || `Option ${optIndex + 1}`}</Latex></span>
                                                        {q.urOptions?.[optIndex] && (
                                                            <span className="ur" style={{ fontSize: '1.25rem', direction: 'rtl' }}>
                                                                {q.urOptions[optIndex]}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Subjective Part */}
                        <div style={{ pageBreakBefore: settings.pageBreak ? 'always' : 'auto', marginTop: '20px' }}></div>

                        {(testData.config?.shortQs > 0 || testData.config?.longQs > 0) && (
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

                                        <div className="questions-container" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {Array.from({ length: testData.config.shortQs }).map((_, i) => {
                                                const q = generateMockQuestion('short', testData.cls, testData.subject, testData.chapters, i, cloudBank);
                                                return (
                                                    <div key={i} className="dual-subjective-q" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '0.75rem' : '0' }}>
                                                        <div className="en">({i + 1}) <Latex>{q.en}</Latex></div>
                                                        <div className="ur" style={{ direction: 'rtl' }}>{q.ur} ({i + 1})</div>
                                                    </div>
                                                )
                                            })}
                                            {testData.customQs?.filter(q => q.type === 'short').map((q, i) => (
                                                <div key={q.id} className="dual-subjective-q" style={{ borderBottom: settings.showDividers ? '1px solid #eee' : 'none', paddingBottom: settings.showDividers ? '0.75rem' : '0' }}>
                                                    <div className="en">({testData.config.shortQs + i + 1}) <Latex>{q.en || "Custom Short Question"}</Latex></div>
                                                    <div className="ur" style={{ direction: 'rtl' }}>{q.ur || "کسٹم مختصر سوال"} ({testData.config.shortQs + i + 1})</div>
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
                                                const qA = generateMockQuestion('long', testData.cls, testData.subject, testData.chapters, i * 2, cloudBank);
                                                const qB = generateMockQuestion('long', testData.cls, testData.subject, testData.chapters, i * 2 + 1, cloudBank);
                                                return (
                                                    <div key={i} style={{ marginBottom: '1.5rem', borderBottom: settings.showDividers ? '1px solid #ccc' : 'none', paddingBottom: settings.showDividers ? '1.5rem' : '0' }}>
                                                        <div className="dual-subjective-q">
                                                            <strong className="en" style={{ minWidth: '40px' }}>Q{i + 3}:</strong>
                                                            <strong className="ur" style={{ minWidth: '40px', direction: 'rtl' }}>سوال {i + 3}:</strong>
                                                        </div>
                                                        <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                                            <div className="en">(a) <Latex>{qA.en}</Latex></div>
                                                            <div className="ur" style={{ direction: 'rtl' }}>{qA.ur} (a)</div>
                                                        </div>
                                                        <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '0.5rem' }}>
                                                            <div className="en">(b) <Latex>{qB.en}</Latex></div>
                                                            <div className="ur" style={{ direction: 'rtl' }}>{qB.ur} (b)</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {testData.customQs?.filter(q => q.type === 'long').map((q, i) => (
                                                <div key={q.id} style={{ marginBottom: '1.5rem', borderBottom: settings.showDividers ? '1px solid #ccc' : 'none', paddingBottom: settings.showDividers ? '1.5rem' : '0' }}>
                                                    <div className="dual-subjective-q">
                                                        <strong className="en" style={{ minWidth: '40px' }}>Q{testData.config.longQs + i + 3}:</strong>
                                                        <strong className="ur" style={{ minWidth: '40px', direction: 'rtl' }}>سوال {testData.config.longQs + i + 3}:</strong>
                                                    </div>
                                                    <div className="dual-subjective-q" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                                        <div className="en"><Latex>{q.en || "Custom Long Question"}</Latex></div>
                                                        <div className="ur" style={{ direction: 'rtl' }}>{q.ur || "کسٹم طویل سوال"}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="paper-footer" style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', color: '#555', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                        Designed by Muhammad Akmal Bashir | Smart Test Generator
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ViewTest;
