import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../utils/supabaseClient';
import html2pdf from 'html2pdf.js';

// Components
import StepIndicator from '../components/CreateTest/StepIndicator';
import ClassSubjectStep from '../components/CreateTest/ClassSubjectStep';
import ChapterStep from '../components/CreateTest/ChapterStep';
import ConfigStep from '../components/CreateTest/ConfigStep';
import FinalPaperStep from '../components/CreateTest/FinalPaperStep';

import './CreateTest.css';

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
        theme: 'classic', 
        urduFont: 'nastaliq'
    });

    const [isSaved, setIsSaved] = useState(false);
    const [cloudBank, setCloudBank] = useState({});
    const [expandedChapters, setExpandedChapters] = useState([]);

    // Profile and data loading
    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoadingProfile(false);
                return;
            }
            try {
                const { data: templateData } = await supabase.from('test_templates').select('*').eq('user_id', user.id);
                if (templateData) setTemplates(templateData);

                const { data: qsData } = await supabase.from('custom_questions').select('*').eq('user_id', user.id);
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
                console.error('Data load error:', err);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchData();
    }, [user, profile]);

    const updateData = (key, value) => setTestData(prev => ({ ...prev, [key]: value }));
    const updateConfig = (key, value) => {
        setTestData(prev => ({ ...prev, config: { ...prev.config, [key]: parseInt(value) || 0 } }));
    };

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
            reader.onloadend = () => updateData('logo', reader.result);
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        if (step === 1 && (!testData.cls || !testData.subject)) return;
        if (step === 2 && testData.chapters.length === 0) return;
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const toggleChapterExpansion = (chId) => {
        setExpandedChapters(prev => prev.includes(chId) ? prev.filter(id => id !== chId) : [...prev, chId]);
    };

    const toggleChapterOrTopic = (id, isChapter, topicIds = []) => {
        setTestData(prev => {
            const selected = new Set(prev.chapters);
            if (isChapter) {
                if (selected.has(id)) {
                    selected.delete(id);
                    topicIds.forEach(tId => selected.delete(tId));
                } else {
                    selected.add(id);
                    topicIds.forEach(tId => selected.add(tId));
                }
            } else {
                selected.has(id) ? selected.delete(id) : selected.add(id);
            }
            return { ...prev, chapters: Array.from(selected) };
        });
    };

    const addCustomQ = () => updateData('customQs', [...testData.customQs, { id: Date.now().toString(), type: 'short', en: '', ur: '' }]);
    const updateCustomQ = (id, field, value) => {
        updateData('customQs', testData.customQs.map(q => q.id === id ? { ...q, [field]: value } : q));
    };
    const removeCustomQ = (id) => updateData('customQs', testData.customQs.filter(q => q.id !== id));

    const handlePrint = () => window.print();

    const handleExportPDF = () => {
        const element = document.querySelector('.paper-container');
        if (!element) return;
        const opt = {
            margin: 0.5,
            filename: `${testData.testTitle.replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleSave = async () => {
        if (!user) return alert('Please login.');
        try {
            await supabase.from('saved_tests').insert({
                user_id: user.id,
                test_title: testData.testTitle,
                cls: testData.cls,
                subject: testData.subject,
                config: testData.config,
                test_data: testData
            });
            await supabase.rpc('increment_test_count', { row_id: user.id });
            await refreshProfile();
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err) { console.error(err); }
    };

    const handleSaveTemplate = async () => {
        const name = window.prompt('Template Name:');
        if (!name) return;
        try {
            await supabase.from('test_templates').insert({
                user_id: user.id, name, cls: testData.cls, subject: testData.subject, config: testData.config, chapters: testData.chapters
            });
            const { data } = await supabase.from('test_templates').select('*').eq('user_id', user.id);
            if (data) setTemplates(data);
        } catch (err) { console.error(err); }
    };

    const handleLoadTemplate = (template) => {
        setTestData(prev => ({ ...prev, cls: template.cls, subject: template.subject, config: template.config, chapters: template.chapters }));
        setStep(2);
    };

    const stepVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="glass create-test-container" style={{ width: step === 3 ? '100%' : '1000px', maxWidth: '100%' }}>
            <div className="create-test-header no-print">
                <h1>{step === 4 ? 'Final Paper Review' : 'Create New Test'}</h1>
                <p className="text-muted">Generate professional tests in minutes.</p>
            </div>

            <StepIndicator currentStep={step} />

            <div className="wizard-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        {step === 1 && (
                            <ClassSubjectStep 
                                testData={testData} 
                                templates={templates} 
                                updateData={updateData} 
                                handleLoadTemplate={handleLoadTemplate} 
                            />
                        )}
                        {step === 2 && (
                            <ChapterStep 
                                testData={testData} 
                                expandedChapters={expandedChapters} 
                                toggleChapterExpansion={toggleChapterExpansion} 
                                toggleChapterOrTopic={toggleChapterOrTopic} 
                            />
                        )}
                        {step === 3 && (
                            <ConfigStep 
                                testData={testData} 
                                updateData={updateData} 
                                updateConfig={updateConfig} 
                                handleLogoUpload={handleLogoUpload} 
                                actualTotalMarks={actualTotalMarks} 
                                isPro={isPro} 
                                handleSaveTemplate={handleSaveTemplate} 
                                addCustomQ={addCustomQ} 
                                updateCustomQ={updateCustomQ} 
                                removeCustomQ={removeCustomQ} 
                                cloudBank={cloudBank} 
                            />
                        )}
                        {step === 4 && (
                            <FinalPaperStep 
                                testData={testData} 
                                actualTotalMarks={actualTotalMarks} 
                                cloudBank={cloudBank} 
                                handlePrint={handlePrint} 
                                handleExportPDF={handleExportPDF} 
                                handleSave={handleSave} 
                                isSaved={isSaved} 
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="wizard-footer no-print">
                {step > 1 && (
                    <button className="btn btn-secondary" onClick={prevStep}>
                        <ChevronLeft size={20} /> Previous
                    </button>
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                    {step < 4 && (
                        <button className="btn" onClick={nextStep} style={{ padding: '0.8rem 2.5rem' }}>
                            {step === 3 ? 'Generate Paper' : 'Continue'} <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateTest;
