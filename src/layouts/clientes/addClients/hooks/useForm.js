import { useState } from "react";

export default function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ civil: "false" });

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
    if (validateOnChange) validate({ [target.name]: target.value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setState({ civil: "false" });
  };

  return { values, errors, setErrors, state, setState, handleInputChange, resetForm };
}
