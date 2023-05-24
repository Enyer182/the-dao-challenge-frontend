import React, { useEffect, useState } from 'react';

const Header: React.FC<{ title: string }> = ({ title }) => {
  const [displayTitle, setDisplayTitle] = useState('');

  useEffect(() => {
    let currentText = '';
    const intervalId = setInterval(() => {
      if (currentText.length < title.length) {
        currentText += title[currentText.length];
        setDisplayTitle(currentText);
      } else {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [title]);

  return (
    <h1 className='text-4xl font-bold text-blue-500 animate-pulse'>
      {displayTitle}
    </h1>
  );
};

export default Header;
