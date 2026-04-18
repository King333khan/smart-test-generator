import React from 'react';
import { FileDown, Printer, Save, CheckCircle } from 'lucide-react';
import PaperPreview from './PaperPreview';

const FinalPaperStep = ({ 
    testData, 
    actualTotalMarks, 
    cloudBank, 
    handlePrint, 
    handleExportPDF, 
    handleSave, 
    isSaved 
}) => {
    return (
        <div className="wizard-step fade-in">
            <div className="no-print" style={{ 
                marginBottom: '2rem', 
                display: 'flex', 
                gap: '1rem', 
                flexWrap: 'wrap', 
                padding: '1.5rem', 
                background: 'var(--primary-light)', 
                borderRadius: 'var(--radius-lg)', 
                border: '1px solid var(--primary-color)',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn" onClick={handlePrint} style={{ background: '#334155' }}>
                        <Printer size={18} /> Print Paper
                    </button>
                    <button className="btn" onClick={handleExportPDF} style={{ background: '#10b981' }}>
                        <FileDown size={18} /> Export PDF
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className={`btn ${isSaved ? 'btn-secondary' : ''}`} onClick={handleSave} disabled={isSaved}>
                        {isSaved ? <><CheckCircle size={18} /> Saved to Library</> : <><Save size={18} /> Save to Cloud</>}
                    </button>
                </div>
            </div>

            <div id="printable-area">
                <PaperPreview 
                    testData={testData} 
                    actualTotalMarks={actualTotalMarks} 
                    cloudBank={cloudBank} 
                />
            </div>
        </div>
    );
};

export default FinalPaperStep;
