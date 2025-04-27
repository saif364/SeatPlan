import React, { useState } from 'react';

const StepNav = () => {
    const [activeStep, setActiveStep] = useState(2);

    const steps = [
        { name: "KUL CGK", icon: "✔️", isCompleted: true },
        { name: "Passengers", icon: "✔️", isCompleted: true },
        { name: "Seats", icon: "", isCompleted: false },
        { name: "Extras", icon: "🗑️", isCompleted: false },
        { name: "Payment", icon: "💳", isCompleted: false },
    ];

    return (
        <div className="flex justify-center w-full">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`relative flex items-center ${index !== steps.length - 1 ? 'mr-10' : ''}`}
                    >
                        <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full ${activeStep >= index
                                ? 'bg-teal-500 text-white'
                                : 'bg-gray-300 text-gray-500'
                                }`}
                            onClick={() => setActiveStep(index)}
                        >
                            <span>{step.icon}</span>
                        </div>
                        <div
                            className={`ml-2 ${activeStep >= index
                                ? 'text-teal-500'
                                : 'text-gray-500'
                                }`}
                        >
                            {step.name}
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-1/2 transform -translate-y-1/2 left-full w-8 h-8 flex items-center justify-center ${activeStep >= index + 1 ? 'text-teal-500' : 'text-gray-500'
                                    }`}
                            >
                                →
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepNav;
