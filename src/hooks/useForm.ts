import { useState } from 'react';

const useForm = <T>(
  values: T,
  validateFn: (values: T) => Record<keyof T, string>,
) => {
  const [errors, setErrors] = useState({} as Record<keyof T, string>);

  const hasError = Boolean(Object.keys(errors).length);

  const validate = () => {
    const _errors = validateFn(values);
    setErrors(_errors);

    return Boolean(Object.keys(_errors).length);
  };

  return { errors, hasError, validate };
};

export default useForm;
