import React from 'react';

const Button = ({ btnText, action, ...props }) => {
  return (
    <button className="btn-primary" {...props} onClick={action ? action : null}>
      {btnText}
    </button>
  );
};

export default Button;
