import React from 'react';
import './AiIcon.css';

const AiIcon = () => (
  <div className="ai-icon-container">
    <div className="ai-frame">
      <span className="ai-text">AI</span>
    </div>
    <div className="sparkles">
      <div className="sparkle main-sparkle"></div>
      <div className="sparkle medium-sparkle"></div>
      <div className="sparkle light-sparkle"></div>
    </div>
  </div>
);

export default AiIcon;
