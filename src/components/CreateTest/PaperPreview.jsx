import React from 'react';
import Latex from 'react-latex-next';
import { generateMockQuestion } from '../../utils/questionGenerator';
import { CLASSES, SUBJECTS } from '../../data/mockSyllabus';

const PaperPreview = ({ testData, actualTotalMarks, cloudBank }) => {
    return (
        <div className={`paper-container theme-${testData.theme} font-${testData.urduFont}`}>
            {testData.showWatermark && testData.logo && (
                <img src={testData.logo} alt="" className="watermark-bg" />
            )}
            
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
                {(testData.config.shortQs > 0 || testData.customQs.filter(q => q.type === 'short').length > 0) && (
                    <div className="question-section short-qs">
                        <div className="dual-lang-header">
                            <h3 className="en">PART II - SUBJECTIVE (Short Questions)</h3>
                            <h3 className="ur">حصہ دوم - انشائیہ (مختصر سوالات)</h3>
                        </div>
                        <div className="dual-lang-header" style={{ marginBottom: '1rem' }}>
                            <span className="en">Marks: {(testData.config.shortQsAttempt || testData.config.shortQs) * (testData.config.shortQMarks || 2)}</span>
                            <span className="ur">نمبر: {(testData.config.shortQsAttempt || testData.config.shortQs) * (testData.config.shortQMarks || 2)}</span>
                        </div>

                        <div className="dual-lang-header">
                            <p className="en"><strong>Q2: Answer any {testData.config.shortQsAttempt} of the following questions.</strong></p>
                            <p className="ur"><strong>سوال 2: درج ذیل میں سے کوئی سے {testData.config.shortQsAttempt} سوالات کے جوابات دیں۔</strong></p>
                        </div>

                        <div className="questions-container" style={{ marginTop: '1.5rem' }}>
                            {Array.from({ length: testData.config.shortQs }).map((_, i) => {
                                const q = generateMockQuestion('short', testData.cls, testData.subject, testData.chapters, i, cloudBank);
                                return (
                                    <div key={i} className="dual-subjective-q">
                                        <p className="en">{i + 1}. <Latex>{q.en}</Latex></p>
                                        <p className="ur">{q.ur} .{i + 1}</p>
                                    </div>
                                );
                            })}
                            {testData.customQs.filter(q => q.type === 'short').map((q, i) => (
                                <div key={q.id} className="dual-subjective-q">
                                    <p className="en">{testData.config.shortQs + i + 1}. <Latex>{q.en || "Custom Short Question"}</Latex></p>
                                    <p className="ur">{q.ur || "کسٹم مختصر سوال"} .{testData.config.shortQs + i + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {(testData.config.longQs > 0 || testData.customQs.filter(q => q.type === 'long').length > 0) && (
                    <div className="question-section long-qs">
                         <div className="dual-lang-header">
                            <h3 className="en">PART III - SUBJECTIVE (Long Questions)</h3>
                            <h3 className="ur">حصہ سوم - انشائیہ (تفصیلی سوالات)</h3>
                        </div>
                        <div className="dual-lang-header" style={{ marginBottom: '1rem' }}>
                            <span className="en">Marks: {(testData.config.longQsAttempt || testData.config.longQs) * (testData.config.longQMarks || 5)}</span>
                            <span className="ur">نمبر: {(testData.config.longQsAttempt || testData.config.longQs) * (testData.config.longQMarks || 5)}</span>
                        </div>

                        <div className="dual-lang-header">
                            <p className="en"><strong>Q3: Explain any {testData.config.longQsAttempt} in detail.</strong></p>
                            <p className="ur"><strong>سوال 3: کوئی سے {testData.config.longQsAttempt} سوالات کی تفصیلی وضاحت کریں۔</strong></p>
                        </div>

                        <div className="questions-container" style={{ marginTop: '1.5rem' }}>
                            {Array.from({ length: testData.config.longQs }).map((_, i) => {
                                const q = generateMockQuestion('long', testData.cls, testData.subject, testData.chapters, i, cloudBank);
                                return (
                                    <div key={i} className="dual-subjective-q">
                                        <p className="en">{i + 1}. <Latex>{q.en}</Latex></p>
                                        <p className="ur">{q.ur} .{i + 1}</p>
                                    </div>
                                );
                            })}
                            {testData.customQs.filter(q => q.type === 'long').map((q, i) => (
                                <div key={q.id} className="dual-subjective-q">
                                    <p className="en">{testData.config.longQs + i + 1}. <Latex>{q.en || "Custom Long Question"}</Latex></p>
                                    <p className="ur">{q.ur || "کسٹم تفصیلی سوال"} .{testData.config.longQs + i + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="paper-footer" style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
                Generated by Smart Test Generator SaaS
            </div>
        </div>
    );
};

export default PaperPreview;
