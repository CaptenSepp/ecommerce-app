import React from 'react';

// simple wrapper to render centered headings or paragraphs (typography) using a dynamic tag (as prop)

const RichText: React.FC<{ children: React.ReactNode; as?: 'h2' | 'h3' | 'p' }> = ({ children, as = 'h2' }) => {
  return (
    <div className="flex-column__grid">
      {React.createElement(as, { className: 'richtext-topic', style: { textAlign: 'center' } }, children)}
    </div>
  );
};

export default RichText;
