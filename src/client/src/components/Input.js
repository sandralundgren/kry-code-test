import React from 'react';

const Input = ({ name, label, type = 'text', onChange, ...props }) => {
  return (
    <div className="input__wrapper">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        {...props}
        onChange={onChange}
        className="input__field"
      />
    </div>
  );
};

export default Input;
