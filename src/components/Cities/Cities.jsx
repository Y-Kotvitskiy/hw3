import Form from "./Form/Form";
import List from "./List/List";
import { useState } from "react";

export default function Cities() {
  const [newCity, setNewCity] = useState(null);

  const getNewCity = (city) => {
    if (city.cityName) {
      setNewCity(city);
    }
  };

  return (
    <>
      <Form
        formValues={{ cityName: "", visited: false }}
        getNewCity={getNewCity}
      />
      <List newCity={newCity} />
    </>
  );
}
