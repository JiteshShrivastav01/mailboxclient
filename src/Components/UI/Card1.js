import React from 'react';
import classes from './Card.module.css';

const Card1 = (props) => {
  return (
    <div className={classes.card1}>
      {props.children}
    </div>
  );
};

export default Card1;