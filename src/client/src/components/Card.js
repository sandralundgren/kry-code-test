import React from 'react';
import { v4 as uuid_v4 } from 'uuid';

const Card = ({ cardItems, children }) => {
  return (
    <div className="card-item__wrapper rounded-borders">
      {cardItems?.map((item) => (
        <React.Fragment key={uuid_v4()}>
          <div className="card-item__label">{item?.label}</div>
          <div className="card-item__value">{item?.value}</div>
        </React.Fragment>
      ))}
      {children}
    </div>
  );
};

export default Card;
