import { useState, useEffect, useRef, useMemo } from "react";

export default function useCitiesForm(propformValues, getNewCity) {
  const [formValues, setFormValues] = useState(propformValues);
  const [disableButtons, setDisableButtons] = useState({
    add: false,
    clear: false,
  });

  const visitedRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    setDisableButtons(() => ({
      add: !formValues.cityName,
      clear: !formValues.cityName && !formValues.visited,
    }));
  }, [formValues]);

  const currentValues = useMemo(() => ({ ...formValues }), [formValues]);

  const handleReset = () => {
    formRef.current.reset();
    visitedRef.current.checked = propformValues.visited;
    setFormValues(() => propformValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getNewCity(currentValues);
    handleReset();
  };

  const handleInput = (e) => {
    setFormValues((prevState) => {
      const input = e.target;
      const value =
        input.type.toLocaleString() === "checkbox"
          ? input.checked
          : input.value;
      return { ...prevState, [input.name]: value };
    });
  };

  return {
    formValues,
    disableButtons,
    visitedRef,
    formRef,
    handleInput,
    handleSubmit,
    handleReset,
  };
}
