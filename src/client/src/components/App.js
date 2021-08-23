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
import { SERVICE_REFRESH_INTERVAL } from './constants/constants';
import '../styles/main.scss';

const App = () => {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [createLoading, setCreateLoading] = useState(false);
  const [remove, setRemove] = useState({ name: null });

  const getSetServices = async () => {
    try {
      await getAllServices().then((res) => setServices(res));
    } catch (err) {
      console.log(err);
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
    setCreateLoading(true);

    try {
      await createService({ name, url });
      await getSetServices();
    } catch (err) {
      console.log(err);
    }

    setCreateLoading(false);
  };

  const handleDelete = async (name) => {
    setRemove({ name });

    try {
      await deleteService({ name });
      await getSetServices();
    } catch (err) {
      console.log(err);
    }

    setRemove({ name: null });
  };

  return (
    <div className="App">
      <main role="main">
        <section className="form__section">
          <Form onSubmit={handleSubmit} loading={createLoading} />
        </section>

        <section className="container__wrapper">
          {servicesLoading ? (
            <Spinner />
          ) : (
            <ServiceList
              services={services}
              loading={remove}
              handleDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
