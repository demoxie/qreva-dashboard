import React, { useState, useRef, useEffect } from 'react';
import BaseModal from '../modals/BaseModal';
import { Button } from "@/components/ui/button";

const ChangePinModal = ({ isOpen, onClose, onSubmit }) => {
    const [step, setStep] = useState('current'); // 'current' | 'new' | 'confirm'
    const [pin, setPin] = useState(['', '', '', '']);
    const [newPinTemp, setNewPinTemp] = useState('');
    const [error, setError] = useState('');
    const inputsRef = useRef([]);

    useEffect(() => {
        if (isOpen) {
            setStep('current');
            setPin(['', '', '', '']);
            setNewPinTemp('');
            setError('');
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
        }
    }, [isOpen]);

    const handleChange = (index, value) => {
        if (isNaN(Number(value))) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        setError('');

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
        inputsRef.current[Math.min(pastedData.length, 3)]?.focus();
    };

    const handleSubmit = () => {
        const currentInput = pin.join('');
        
        if (step === 'current') {
            // Validate current PIN (mock)
            setStep('new');
            setPin(['', '', '', '']);
            inputsRef.current[0]?.focus();
        } else if (step === 'new') {
            // Move to confirm step
            setNewPinTemp(currentInput);
            setStep('confirm');
            setPin(['', '', '', '']);
            inputsRef.current[0]?.focus();
        } else if (step === 'confirm') {
            if (currentInput === newPinTemp) {
                if (onSubmit) {
                    onSubmit(currentInput);
                } else {
                    onClose();
                }
            } else {
                setError('PINs do not match. Try again.');
                setStep('new');
                setPin(['', '', '', '']);
                setNewPinTemp('');
                inputsRef.current[0]?.focus();
            }
        }
    };

    const isComplete = pin.every(digit => digit !== '');

    const getStepText = () => {
        if (step === 'current') return 'Enter your current PIN';
        if (step === 'new') return 'Enter your new PIN';
        return 'Confirm your new PIN';
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Change PIN"
            maxWidth="max-w-md"
        >
            <div className="mt-2 text-center sm:text-left">
                <p className="text-sm text-gray-500 mb-6">
                    {getStepText()}
                </p>

                <div className="flex justify-center sm:justify-center gap-4 mb-2">
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
                            className={`w-12 h-12 border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5B04] transition-all ${error ? 'border-red-500' : 'border-gray-300'}`}
                        />
                    ))}
                </div>
                
                <div className="h-6 mb-4">
                     {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                </div>

                <Button
                    className="w-full h-12 bg-[#E8EBED] text-[#808C91] hover:bg-[#d5d8db] hover:text-[#505C61] font-medium text-base mb-2 disabled:opacity-50 transition-colors"
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    style={{ backgroundColor: isComplete ? '#FF5B04' : undefined, color: isComplete ? 'white' : undefined }}
                >
                    Enter PIN
                </Button>
            </div>
        </BaseModal>
    );
};

export default ChangePinModal;
