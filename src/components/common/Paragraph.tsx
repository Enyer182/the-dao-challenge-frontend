import React, { useEffect, useState } from 'react';

const Paragraph: React.FC<{ description: string }> = ({ description }) => {
  const [displayDescription, setDisplayDescription] = useState('');

  useEffect(() => {
    let currentText = '';
    const intervalId = setInterval(() => {
      if (currentText.length < description.length) {
        currentText += description[currentText.length];
        setDisplayDescription(currentText);
      } else {
        clearInterval(intervalId);
      }
    }, 50); // Show characters a bit faster than the title
    return () => clearInterval(intervalId);
  }, [description]);

  return (
    <p className='text-lg text-blue-400 mt-4 animate-fade-in-transition'>
      {displayDescription}
    </p>
  );
};

export default Paragraph;
