import React from 'react';
import { Check } from 'lucide-react';

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

export default StepIndicator;
