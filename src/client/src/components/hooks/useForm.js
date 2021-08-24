import { useState, useEffect } from 'react';

import { FORM_INITIAL_STATE } from '../../constants/constants';

const useForm = (callback, validate) => {
  const [values, setValues] = useState(FORM_INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const resetForm = () => {
    setValues(FORM_INITIAL_STATE);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!Object.values(errors).length && isSubmitting) {
      callback();
    }
    setIsSubmitting(false);
  }, [errors]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    isSubmitting,
  };
};

export default useForm;
