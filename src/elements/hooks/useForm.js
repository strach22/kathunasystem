import { useState } from "react";

export default function useForm(
  initialValues,
  validateOnChange = false,
  validate,
  errorValues,
  initialOk
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(errorValues);
  const [ok, setOk] = useState(initialOk);

  const [state, setState] = useState({ civil: "false", other: "true" });

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
    setOk(false);
    if (validateOnChange) validate({ [target.name]: target.value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors(errorValues);
    setState({ civil: "false", other: "true" });
  };

  return { values, errors, setErrors, state, setState, handleInputChange, resetForm, ok, setOk };
}
