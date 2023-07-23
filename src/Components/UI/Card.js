import React, { useState } from 'react';
import './Card.css';

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`card ${expanded ? 'expanded' : ''}`} onClick={handleCardClick}>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Card;
