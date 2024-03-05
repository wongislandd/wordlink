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
        <p><b>Hint: </b> 
          <span>{displayedText}</span>
        </p>
    </div>
};

export default Typewriter;