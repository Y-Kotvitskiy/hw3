import { useState, useEffect, useRef } from "react";

export default function Form({ formValues: propformValues, getNewCity }) {
  const [cityName, setCityName] = useState(propformValues.cityName);
  const [disable, setDisable] = useState(!propformValues.cityName);

  const cityRef = useRef(null);
  const visitedRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    setDisable(!cityName);
  }, [cityName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getNewCity({
      cityName: cityRef.current.value,
      visited: visitedRef.current.checked,
    });
    formRef.current.reset();
  };

  return (
    <form className="new-city" onSubmit={handleSubmit} ref={formRef}>
      <h3>Add a new city</h3>
      <label>
        City name
        <input
          name="cityName"
          placeholder="City name"
          defaultValue={propformValues.cityName}
          onChange={(e) => setCityName(e.target.value)}
          ref={cityRef}
        />
      </label>
      <label>
        Visited
        <input
          type="checkBox"
          name="visited"
          defaultChecked={propformValues.visited}
          ref={visitedRef}
        />
      </label>
      <button disabled={disable}>Add</button>
    </form>
  );
}
