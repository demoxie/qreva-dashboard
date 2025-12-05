import React from 'react';

const CloseButton = ({ onClick }) => (
  <button onClick={onClick} className="text-gray-400 hover:text-gray-600">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
);

const BaseModal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md', hasCloseButton = true }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-6 ${maxWidth} w-full mx-4`}>
        {/* Header (Only render if title or close button is needed) */}
        {(title || hasCloseButton) && (
          <div className={`flex ${title && hasCloseButton ? 'justify-between' : 'justify-end'} items-center mb-4`}>
            {title && <h3 className="text-xl font-semibold text-[#1E1E1E]">{title}</h3>}
            {hasCloseButton && <CloseButton onClick={onClose} />}
          </div>
        )}
        
        {/* Body Content */}
        {children}
      </div>
    </div>
  );
};

export default BaseModal;