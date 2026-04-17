import React, { useState, useEffect } from 'react';
import { 
    ChevronRight, 
    ChevronLeft, 
    Check, 
    FileDown, 
    Printer, 
    Edit2, 
    Save, 
    ChevronDown, 
    ChevronUp, 
    School, 
    MapPin, 
    Phone, 
    FileText, 
    AlertCircle, 
    CheckCircle, 
    Download, 
    Trash2, 
    Plus 
} from 'lucide-react';
import { CLASSES, SUBJECTS, CHAPTERS } from '../data/mockSyllabus';
import { generateMockQuestion } from '../utils/questionGenerator';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../utils/supabaseClient';
import Latex from 'react-latex-next';
import html2pdf from 'html2pdf.js';
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
    const { user, profile, isPro, refreshProfile } = useAuth();
    const [step, setStep] = useState(1);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [templates, setTemplates] = useState([]);
    const [testData, setTestData] = useState({
        cls: '',
        subject: '',
        chapters: [],
        config: { mcqs: 10, mcqMarks: 1, shortQs: 5, shortQsAttempt: 5, shortQMarks: 2, longQs: 2, longQsAttempt: 2, longQMarks: 5, totalMarks: 50 },
        customQs: [],
        instituteName: '',
        testTitle: 'Monthly Assessment - 2026',
        address: '',
        mobile: '',
        logo: null,
        showWatermark: false,
        theme: 'classic', // classic, modern, compact
        urduFont: 'nastaliq' // nastaliq, regular
    });

    const [isSaved, setIsSaved] = useState(false);
    const isLimitReached = !isPro && profile && profile.tests_count >= profile.max_tests;

    const [cloudBank, setCloudBank] = useState({});

    // Fetch profile data and templates from Supabase
    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoadingProfile(false);
                return;
            }
            try {
                // Load templates
                const { data: templateData } = await supabase
                    .from('test_templates')
                    .select('*')
                    .eq('user_id', user.id);
                if (templateData) setTemplates(templateData);

                // Load custom question bank for the generator
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

                // Setup profile-based defaults
                if (profile) {
                    setTestData(prev => ({
                        ...prev,
                        instituteName: profile.institute_name || prev.instituteName,
                        address: profile.address || prev.address,
                        mobile: profile.mobile || prev.mobile,
                        logo: profile.institute_logo_url || prev.logo
                    }));
                }
            } catch (err) {
                console.error('Initial data load error:', err);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchData();
    }, [user, profile]);

    const [expandedChapters, setExpandedChapters] = useState([]); // State for expanded chapter IDs

    const toggleChapterExpansion = (chapterId) => {
        setExpandedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(id => id !== chapterId)
                : [...prev, chapterId]
        );
    };

    const updateData = (key, value) => {
        setTestData(prev => ({ ...prev, [key]: value }));
    };

    const updateConfig = (key, value) => {
        setTestData(prev => ({ ...prev, config: { ...prev.config, [key]: parseInt(value) || 0 } }));
    };

    // Calculate total marks dynamically
    const calculateTotalMarks = () => {
        const mcqTotal = (testData.config.mcqs + testData.customQs.filter(q => q.type === 'mcq').length) * (testData.config.mcqMarks || 1);
        const shortTotal = (testData.config.shortQsAttempt || testData.config.shortQs) * (testData.config.shortQMarks || 2);
        const longTotal = (testData.config.longQsAttempt || testData.config.longQs) * (testData.config.longQMarks || 5);
        return mcqTotal + shortTotal + longTotal;
    };

    const actualTotalMarks = calculateTotalMarks();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateData('logo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        if (step === 1 && (!testData.cls || !testData.subject)) return;
        if (step === 2 && testData.chapters.length === 0) return;
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const toggleChapterOrTopic = (id, isChapter, topicIds = []) => {
        setTestData(prev => {
            const currentSelected = new Set(prev.chapters);

            if (isChapter) {
                // If chapter is already selected, deselect chapter and all its topics
                if (currentSelected.has(id)) {
                    currentSelected.delete(id);
                    topicIds.forEach(tId => currentSelected.delete(tId));
                } else {
                    // Select chapter and all its topics
                    currentSelected.add(id);
                    topicIds.forEach(tId => currentSelected.add(tId));
                }
            } else {
                // Toggling individual topic
                if (currentSelected.has(id)) {
                    currentSelected.delete(id);
                } else {
                    currentSelected.add(id);
                }

                // Optional: Auto-select/deselect parent chapter based on topics selected
                // (Omitted here to keep the logic simple as requested: "if I select a chapter it selects all, if I select a topic it only selects the topic")
            }

            return { ...prev, chapters: Array.from(currentSelected) };
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

    const handleExportPDF = () => {
        const element = document.querySelector('.paper-container');
        if (!element) return;
        
        // Save original styles
        const originalMargin = element.style.margin;
        const originalShadow = element.style.boxShadow;
        const originalBorder = element.style.border;
        
        // Remove aesthetics for PDF
        element.style.margin = '0';
        element.style.boxShadow = 'none';
        element.style.border = 'none';

        const opt = {
            margin:       0.5,
            filename:     `${testData.testTitle.replace(/\s+/g, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            // Restore original styles
            element.style.margin = originalMargin;
            element.style.boxShadow = originalShadow;
            element.style.border = originalBorder;
        });
    };

    const handleSave = async () => {
        if (!user) {
            alert('Please login to save your test to the cloud.');
            return;
        }

        try {
            const { data, error } = await supabase.from('saved_tests').insert({
                user_id: user.id,
                test_title: testData.testTitle,
                cls: testData.cls,
                subject: testData.subject,
                config: testData.config,
                test_data: testData
            }).select();

            if (error) throw error;
            
            // Increment count in Supabase Profile
            await supabase.rpc('increment_test_count', { row_id: user.id });
            await refreshProfile();

            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err) {
            console.error('Cloud save error:', err);
            alert('Failed to save to cloud. Check your connection.');
        }
    };

    const handleSaveTemplate = async () => {
        if (!user) return;
        const name = window.prompt('Enter a name for this template:', `${getClassName(testData.cls)} ${getSubjectName(testData.cls, testData.subject)} Template`);
        if (!name) return;

        try {
            const { error } = await supabase.from('test_templates').insert({
                user_id: user.id,
                name,
                cls: testData.cls,
                subject: testData.subject,
                config: testData.config,
                chapters: testData.chapters
            });
            if (error) throw error;
            alert('Template saved successfully!');
            
            // Refresh templates list
            const { data } = await supabase.from('test_templates').select('*').eq('user_id', user.id);
            if (data) setTemplates(data);
        } catch (err) {
            console.error('Template save error:', err);
        }
    };

    const handleLoadTemplate = (template) => {
        setTestData(prev => ({
            ...prev,
            cls: template.cls,
            subject: template.subject,
            config: template.config,
            chapters: template.chapters
        }));
        setStep(2); // Jump to chapters to confirm
    };

    const getClassName = (id) => CLASSES.find(c => c.id === id)?.name || id;
    const getSubjectName = (clsId, subId) => SUBJECTS[clsId]?.find(s => s.id === subId)?.name || subId;

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
                )}

                {step === 2 && (
                    <div className="wizard-step fade-in">
                        <h2>Select Chapters / Topics</h2>
                        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                            Choose the topics to include in the physical test.
                        </p>

                        <div className="chapters-list">
                            {CHAPTERS[`${testData.cls}_${testData.subject}`]?.map(ch => (
                                <div key={ch.id} className="chapter-group" style={{ marginBottom: '1rem' }}>
                                    <div className={`chapter-item ${testData.chapters.includes(ch.id) ? 'selected' : ''}`} style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <input
                                                type="checkbox"
                                                checked={testData.chapters.includes(ch.id)}
                                                onChange={() => toggleChapterOrTopic(ch.id, true, ch.topics?.map(t => t.id) || [])}
                                            />
                                            <span className={(testData.subject === 'urd' || testData.subject === 'isl' || testData.subject === 'tar') ? 'urdu-text' : ''}>{ch.name}</span>
                                        </div>
                                        {ch.topics && ch.topics.length > 0 && (
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.25rem', border: 'none', background: 'transparent' }}
                                                onClick={() => toggleChapterExpansion(ch.id)}
                                            >
                                                {expandedChapters.includes(ch.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                        )}
                                    </div>
                                    {ch.topics && ch.topics.length > 0 && expandedChapters.includes(ch.id) && (
                                        <div className="topics-list fade-in" style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            {ch.topics.map(topic => (
                                                <label key={topic.id} className={`chapter-item ${testData.chapters.includes(topic.id) ? 'selected' : ''}`} style={{ fontSize: '0.9rem', padding: '0.5rem', minHeight: 'auto' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={testData.chapters.includes(topic.id)}
                                                        onChange={() => toggleChapterOrTopic(topic.id, false)}
                                                    />
                                                    <span className={(testData.subject === 'urd' || testData.subject === 'isl' || testData.subject === 'tar') ? 'urdu-text' : ''}>{topic.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )) || <p className="text-muted">No mock chapters available for this selection. Try 9th Physics.</p>}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="wizard-step fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h2>Test Configuration</h2>
                                <p className="text-muted">Set up the structure and branding of the exam.</p>
                            </div>
                            <button className="btn btn-secondary" onClick={handleSaveTemplate} style={{ color: 'var(--primary-color)', fontWeight: '700' }}>
                                <Save size={16} /> SAVE AS TEMPLATE
                            </button>
                        </div>

                        <div className="config-form">
                            {/* Layout & Style Theme Selector */}
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

                            {/* Simplified Header for SaaS */}
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
                                
                                {/* Logo and Watermark Settings */}
                                <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.25rem', paddingTop: '1.25rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Branding</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '0.8rem' }}>Update Institute Logo</label>
                                            <input type="file" accept="image/*" className="form-input" style={{ fontSize: '0.9rem', padding: '0.5rem' }} onChange={handleLogoUpload} />
                                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.7 }}>Recommended: PNG with transparent background.</p>
                                        </div>
                                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: !isPro ? 'not-allowed' : 'pointer', fontSize: '0.9rem', opacity: !isPro ? 0.7 : 1 }}>
                                                <input type="checkbox" disabled={!isPro} checked={testData.showWatermark} onChange={(e) => updateData('showWatermark', e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-color)' }} />
                                                <span>
                                                    Show Logo as Watermark 
                                                    {!isPro && <span style={{ fontSize: '0.65rem', background: '#fca5a5', color: '#7f1d1d', padding: '0.15rem 0.4rem', borderRadius: '4px', marginLeft: '0.5rem', fontWeight: 'bold' }}>PRO</span>}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-color)' }}>
                                <label style={{ color: 'var(--primary-color)', fontWeight: '800' }}>Calculated Total Marks</label>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-color)' }}>
                                    {actualTotalMarks}
                                </div>
                                <p style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0', opacity: 0.7 }}>Automatic sum of all sections</p>
                            </div>

                            <div className="nav-divider" style={{ margin: '2rem 0' }}></div>

                            <h3>Question Distribution & Marks</h3>

                            <div className="config-section-box">
                                <h4>Multiple Choice Questions (MCQs)</h4>
                                <div className="options-grid" style={{ marginTop: '0.5rem', gridTemplateColumns: '1fr 1fr' }}>
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

                            <div className="config-section-box" style={{ marginTop: '1.5rem' }}>
                                <h4>Short Questions</h4>
                                <div className="options-grid" style={{ marginTop: '0.5rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                    <div className="form-group">
                                        <label>Total Given</label>
                                        <input type="number" className="form-input" value={testData.config.shortQs} onChange={e => updateConfig('shortQs', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>To Attempt</label>
                                        <input type="number" className="form-input" value={testData.config.shortQsAttempt} onChange={e => updateConfig('shortQsAttempt', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Marks per Question</label>
                                        <input type="number" className="form-input" value={testData.config.shortQMarks} onChange={e => updateConfig('shortQMarks', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="config-section-box" style={{ marginTop: '1.5rem' }}>
                                <h4>Long Questions</h4>
                                <div className="options-grid" style={{ marginTop: '0.5rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                    <div className="form-group">
                                        <label>Total Given</label>
                                        <input type="number" className="form-input" value={testData.config.longQs} onChange={e => updateConfig('longQs', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>To Attempt</label>
                                        <input type="number" className="form-input" value={testData.config.longQsAttempt} onChange={e => updateConfig('longQsAttempt', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Marks per Question</label>
                                        <input type="number" className="form-input" value={testData.config.longQMarks} onChange={e => updateConfig('longQMarks', e.target.value)} />
                                    </div>
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
                        <div className="no-print" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '1rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-color)' }}>
                            <div style={{ fontWeight: '700', color: 'var(--primary-color)', marginRight: '1rem', display: 'flex', alignItems: 'center' }}>
                                <FileText size={20} style={{ marginRight: '0.5rem' }} /> PAGE OPTIMIZATION
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input type="radio" name="theme" checked={testData.theme === 'classic'} onChange={() => updateData('theme', 'classic')} /> Standard
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700', color: '#10b981' }}>
                                    <input type="radio" name="theme" checked={testData.theme === 'compact'} onChange={() => updateData('theme', 'compact')} /> Eco-Compact (1-2 Pages)
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input type="radio" name="theme" checked={testData.theme === 'modern'} onChange={() => updateData('theme', 'modern')} /> Premium
                                </label>
                            </div>
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input type="radio" name="font" checked={testData.urduFont === 'nastaliq'} onChange={() => updateData('urduFont', 'nastaliq')} /> Nastaliq
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input type="radio" name="font" checked={testData.urduFont === 'regular'} onChange={() => updateData('urduFont', 'regular')} /> Regular
                                </label>
                            </div>
                        </div>

                        <div className={`paper-container theme-${testData.theme} font-${testData.urduFont}`}>
                            {testData.showWatermark && testData.logo && (
                                <img src={testData.logo} alt="" className="watermark-bg" />
                            )}
                            
                            {/* View rendered only on print / paper preview */}
                            <div className="paper-header">
                                {testData.logo && (
                                    <div className="institute-logo-container">
                                        <img src={testData.logo} alt="Institute Logo" className="institute-logo-img" />
                                    </div>
                                )}
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
                                    <div><strong>Total Marks:</strong> {actualTotalMarks}</div>
                                    <div><strong>Time:</strong> 2 Hours</div>
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
                                            <span className="en">Marks: {(testData.config.mcqs + testData.customQs.filter(q => q.type === 'mcq').length) * (testData.config.mcqMarks || 1)}</span>
                                            <span className="ur">نمبر: {(testData.config.mcqs + testData.customQs.filter(q => q.type === 'mcq').length) * (testData.config.mcqMarks || 1)}</span>
                                        </div>

                                        <div className="dual-lang-header">
                                            <p className="en"><strong>Q1: Choose the correct answer.</strong></p>
                                            <p className="ur"><strong>سوال 1: درست جواب کا انتخاب کریں۔</strong></p>
                                        </div>

                                        <div className="mcq-list">
                                            {Array.from({ length: testData.config.mcqs }).map((_, i) => {
                                                const q = generateMockQuestion('mcq', testData.cls, testData.subject, testData.chapters, i, cloudBank);
                                                return (
                                                    <div key={i} className="dual-mcq-item">
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
                                            {testData.customQs.filter(q => q.type === 'mcq').map((q, i) => (
                                                <div key={q.id} className="dual-mcq-item">
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
                                <div style={{ pageBreakBefore: 'auto', marginTop: '20px' }}></div>

                                {(testData.config.shortQs > 0 || testData.config.longQs > 0) && (
                                    <div className="question-section">
                                        <div className="dual-lang-header" style={{ borderBottom: '2px solid black', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                                            <h3 className="en">PART II - SUBJECTIVE</h3>
                                            <h3 className="ur">حصہ دوم - انشائیہ</h3>
                                        </div>

                                        {testData.config.shortQs > 0 && (
                                            <div className="short-qs" style={{ marginTop: '1.5rem' }}>
                                                <div className="dual-lang-header">
                                                    <p className="en"><strong>Q2: Write short answers of any {testData.config.shortQsAttempt || testData.config.shortQs} questions. ({(testData.config.shortQsAttempt || testData.config.shortQs) * (testData.config.shortQMarks || 2)} Marks)</strong></p>
                                                    <p className="ur"><strong>سوال 2: کوئی سے {testData.config.shortQsAttempt || testData.config.shortQs} مختصر جوابات لکھیں۔ ({(testData.config.shortQsAttempt || testData.config.shortQs) * (testData.config.shortQMarks || 2)} نمبر)</strong></p>
                                                </div>

                                                <div className="questions-container" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {Array.from({ length: testData.config.shortQs }).map((_, i) => {
                                                        const q = generateMockQuestion('short', testData.cls, testData.subject, testData.chapters, i, cloudBank);
                                                        return (
                                                            <div key={i} className="dual-subjective-q">
                                                                <div className="en">({i + 1}) <Latex>{q.en}</Latex></div>
                                                                <div className="ur" style={{ direction: 'rtl' }}>{q.ur} ({i + 1})</div>
                                                            </div>
                                                        )
                                                    })}
                                                    {testData.customQs.filter(q => q.type === 'short').map((q, i) => (
                                                        <div key={q.id} className="dual-subjective-q">
                                                            <div className="en">({testData.config.shortQs + i + 1}) <Latex>{q.en || "Custom Short Question"}</Latex></div>
                                                            <div className="ur" style={{ direction: 'rtl' }}>{q.ur || "کسٹم مختصر سوال"} ({testData.config.shortQs + i + 1})</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {testData.config.longQs > 0 && (
                                            <div className="long-qs" style={{ marginTop: '2rem' }}>
                                                <div className="dual-lang-header">
                                                    <p className="en"><strong>Attempt any {testData.config.longQsAttempt || testData.config.longQs} questions in detail. ({(testData.config.longQsAttempt || testData.config.longQs) * (testData.config.longQMarks || 5)} Marks)</strong></p>
                                                    <p className="ur"><strong>کوئی سے {testData.config.longQsAttempt || testData.config.longQs} تفصیلی جوابات لکھیں۔ ({(testData.config.longQsAttempt || testData.config.longQs) * (testData.config.longQMarks || 5)} نمبر)</strong></p>
                                                </div>

                                                <div style={{ marginTop: '1.5rem' }}>
                                                    {Array.from({ length: testData.config.longQs }).map((_, i) => {
                                                        const qA = generateMockQuestion('long', testData.cls, testData.subject, testData.chapters, i * 2, cloudBank);
                                                        const qB = generateMockQuestion('long', testData.cls, testData.subject, testData.chapters, i * 2 + 1, cloudBank);
                                                        return (
                                                            <div key={i} style={{ marginBottom: '1.5rem' }}>
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
                                                    {testData.customQs.filter(q => q.type === 'long').map((q, i) => (
                                                        <div key={q.id} style={{ marginBottom: '1.5rem' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        {isLimitReached && step === 3 && (
                            <div style={{ color: '#ef4444', fontWeight: '700', background: '#fee2e2', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                                ⚠️ Test Limit Reached (Free Plan). Please upgrade to continue.
                            </div>
                        )}
                        <button
                            className="btn"
                            onClick={nextStep}
                            disabled={
                                (step === 1 && (!testData.cls || !testData.subject)) ||
                                (step === 2 && testData.chapters.length === 0) ||
                                (step === 3 && isLimitReached)
                            }
                        >
                            {step === 3 ? 'Generate Paper' : 'Next Step'} <ChevronRight size={18} />
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {isSaved && <span className="text-muted fade-in" style={{ color: '#10b981', fontWeight: '500' }}>✓ Saved successfully!</span>}
                        <button className="btn btn-secondary" onClick={handleSave} disabled={isSaved}>
                            <Save size={18} /> {isSaved ? 'Saved' : 'Save Test'}
                        </button>
                        <button className="btn btn-secondary" onClick={handleExportPDF} style={{ color: '#0ea5e9', borderColor: '#bae6fd' }}>
                            <FileDown size={18} /> Download PDF
                        </button>
                        <button className="btn" onClick={handlePrint}><Printer size={18} /> Print Sheet</button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default CreateTest;
