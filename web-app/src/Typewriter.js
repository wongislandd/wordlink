import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, typingDelay = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (displayedText.length < text.length) {
      setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, typingDelay);
    }
  }, [displayedText, text, typingDelay]);

  return <div>
        <h3>Hint</h3>
        <span className='left-align'>{displayedText}</span>
    </div>
};

export default Typewriter;