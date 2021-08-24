import React from 'react';
import { v4 as uuid_v4 } from 'uuid';

import Card from './Card';
import Button from './Button';

const ServiceList = ({ services, loading, handleDelete }) => {
  const { name: removingName } = loading;
  return services?.length ? (
    services.map(({ name, url, status, addTime: { epochSecond } }) => {
      const cardItems = [
        { label: 'Service Name:', value: name },
        { label: 'Url:', value: url },
        { label: 'Status:', value: status },
        { label: 'Time added', value: epochSecond },
      ];
      return (
        <Card key={uuid_v4()} cardItems={cardItems}>
          <div className="card-item__button-wrapper">
            <Button
              btnText={name === removingName ? 'Deleting...' : 'Delete'}
              action={() => handleDelete(name)}
            />
          </div>
        </Card>
      );
    })
  ) : (
    <div className="rounded-borders full-width-padding message-box">
      There are currently no services to show yet.
    </div>
  );
};

export default ServiceList;
