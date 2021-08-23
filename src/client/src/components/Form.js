import React from 'react';

import Input from './Input';
import Button from './Button';
import useForm from './hooks/useForm';
import validate from '../utils/formValidationRules';

const Form = ({ loading, onSubmit }) => {
  const {
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    isSubmitting,
  } = useForm(submit, validate);

  async function submit() {
    const { name, url } = values;
    await onSubmit(name, url);
    resetForm();
  }

  return (
    <div className="form__wrapper">
      <form className="form rounded-borders" onSubmit={handleSubmit} noValidate>
        <h1 className="form__title"> Add a new service</h1>
        <div className="form__field">
          <Input
            name="name"
            label="Service Name"
            placeholder="Enter a service name"
            size="50"
            required
            value={values.name}
            disabled={isSubmitting}
            onChange={handleChange}
          />
          {errors?.name && <div className="form__error">{errors?.name}</div>}
        </div>
        <div className="form__field">
          <Input
            name="url"
            label="Url"
            placeholder="https://example.com"
            size="50"
            required
            pattern="https?:.+"
            value={values.url}
            disabled={isSubmitting}
            onChange={handleChange}
          />
          {errors?.url && <div className="form__error">{errors?.url}</div>}
        </div>
        <div className="form__button-wrapper">
          <Button type="submit" btnText={loading ? 'Creating...' : 'Create'} />
        </div>
      </form>
    </div>
  );
};

export default Form;
