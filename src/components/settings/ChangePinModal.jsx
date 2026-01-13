import React, { useState, useRef, useEffect } from 'react';
import BaseModal from '../modals/BaseModal';
import { Button } from "@/components/ui/button";

const ChangePinModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('current'); // 'current' | 'new'
    const [pin, setPin] = useState(['', '', '', '']);
    const inputsRef = useRef([]);

    useEffect(() => {
        if (isOpen) {
            setStep('current');
            setPin(['', '', '', '']);
            // Focus first input
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
        }
    }, [isOpen]);

    const handleChange = (index, value) => {
        if (isNaN(Number(value))) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next input
        if (value && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);
        if (!/^\d+$/.test(pastedData)) return;

        const newPin = [...pin];
        pastedData.split('').forEach((char, index) => {
            if (index < 4) newPin[index] = char;
        });
        setPin(newPin);
        inputsRef.current[Math.min(pastedData.length, 3)].focus();
    };

    const handleSubmit = () => {
        if (step === 'current') {
            // Validate current PIN (mock)
            setStep('new');
            setPin(['', '', '', '']);
            inputsRef.current[0].focus();
        } else {
            // Submit new PIN (mock)
            onClose();
        }
    };

    const isComplete = pin.every(digit => digit !== '');

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Change PIN"
            maxWidth="max-w-md"
        >
            <div className="mt-2 text-center sm:text-left">
                <p className="text-sm text-gray-500 mb-6">
                    {step === 'current' ? 'Enter your current PIN' : 'Enter your new PIN'}
                </p>

                <div className="flex justify-center sm:justify-center gap-4 mb-8">
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputsRef.current[index] = el}
                            type="password"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5B04] transition-all"
                        />
                    ))}
                </div>

                <Button
                    className="w-full h-12 bg-[#E8EBED] text-[#808C91] hover:bg-[#d5d8db] hover:text-[#505C61] font-medium text-base mb-2 disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    style={{ backgroundColor: isComplete ? '#E8EBED' : undefined, color: isComplete ? '#1E1E1E' : undefined }} // Mimic design state if needed, or stick to shadcn variants
                >
                    Enter PIN
                </Button>
            </div>
        </BaseModal>
    );
};

export default ChangePinModal;
