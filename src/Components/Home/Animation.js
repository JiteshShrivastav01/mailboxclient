import React, { useState, useEffect } from 'react';
import './Animation.css';

function Animation() {
  const [emailText, setEmailText] = useState('');
  const emailContent = "Hello, this is Mail-Box Client application. It is a cheapest copy of Gmail. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem totam quod laboriosam doloribus asperiores veniam at aut maxime delectus explicabo.";
 

  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < emailContent.length) {
        setEmailText(emailContent.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="email-container">
      <div className="email">
        <div className="email-writing">
          {emailText}
        </div>
      </div>
    </div>
  );
}

export default Animation;
