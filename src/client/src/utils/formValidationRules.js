import { FORM_INITIAL_STATE } from '../components/constants/constants';

const validate = (values) => {
  let errors = {};
  const urlRegex = /https?:.+/g;

  if (!values.name) {
    errors.name = 'Please enter a service name';
  }
  if (!values.url) {
    errors.url = 'Url is missing';
  }

  if (values.url && !urlRegex.test(values.url)) {
    errors.url = 'This url is does not match the format http(s)://';
  }

  if (values.url === FORM_INITIAL_STATE.url) {
    errors.url = 'Please type a url';
  }

  return errors;
};

export default validate;
