import React, { useState, useEffect } from 'react';

import Form from './Form';
import Spinner from './Spinner';
import ServiceList from './ServiceList';
import {
  getAllServices,
  createService,
  deleteService,
} from '../services/urlService';
import { useInterval } from './hooks/useInterval';
import { SERVICE_REFRESH_INTERVAL } from '../constants/constants';
import '../styles/main.scss';

const App = () => {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [isCreating, setIsCreating] = useState(false);
  const [removeService, setRemoveService] = useState({ name: null });

  const [error, setError] = useState('');

  const getSetServices = async () => {
    setError('');

    try {
      await getAllServices().then((res) => setServices(res));
    } catch (err) {
      console.log(err);
      setError('Could not fetch services');
    } finally {
      setServicesLoading(false);
    }
  };

  useEffect(() => {
    getSetServices();
  }, []);

  useInterval(async () => {
    await getSetServices();
  }, SERVICE_REFRESH_INTERVAL);

  const handleSubmit = async (name, url) => {
    setIsCreating(true);

    try {
      await createService({ name, url });
      await getSetServices();
    } catch (err) {
      console.log(err);
      setError('Could not add service');
    }

    setIsCreating(false);
  };

  const handleDelete = async (name) => {
    setRemoveService({ name });

    try {
      await deleteService({ name });
      await getSetServices();
    } catch (err) {
      console.log(err);
      setError('Could not remove service');
    }

    setRemoveService({ name: null });
  };

  return (
    <div className="App">
      <main role="main">
        <section className="form__section">
          <Form onSubmit={handleSubmit} loading={isCreating} />
        </section>

        {error ? (
          <section className="rounded-borders full-width-padding margin message-box">
            {error}
          </section>
        ) : null}

        <section className="container__wrapper">
          {servicesLoading ? (
            <Spinner />
          ) : (
            <ServiceList
              services={services}
              loading={removeService}
              handleDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
