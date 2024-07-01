import { useState, useEffect } from "react";
import ListElement from "./ListElement/ListElement";
import "./List.css";

export default function List({ newCity }) {
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    if (newCity) setCityList([...cityList, newCity]);
    console.log(newCity);
  }, [newCity]);

  useEffect(() => {
    (async () => {
      const request = await fetch(
          "https://66805a1156c2c76b495bd6dc.mockapi.io/title"
        ),
        result = await request.json();
      setCityList(result);
    })();
  }, []);

  const saveButtonHandle = (id, cityName, visited) => {
    setCityList(
      cityList.map((city) => {
        if (city.id === id) {
          console.log(city, id, { ...city, cityName, visited });
          return { ...city, cityName, visited };
        } else return city;
      })
    );
  };

  return (
    <ul className="city-list">
      {cityList.map((city) => (
        <ListElement
          key={city.id}
          city={city}
          saveButtonHandle={saveButtonHandle}
        />
      ))}
    </ul>
  );
}
