import { useState, useEffect } from "react";
import ListElement from "./ListElement/ListElement";
import serviceCities from "./../../../services/cities";
import "./List.css";

export default function List({ newCity }) {
  const [cityList, setCityList] = useState([]);

  const addNewCity = async (newCity) => {
    const postCity = await serviceCities.post(newCity);
    setCityList([...cityList, postCity]);
  }

  useEffect(() => {
    if (newCity)  {
      addNewCity(newCity)
    } 
    console.log(newCity);
  }, [newCity]);

  const getCities = async () => {
    const cities = await serviceCities.get();
    setCityList(cities);
  };

  useEffect(() => {
    getCities();
  }, []);

  const saveButtonHandle = async (id, changedCity) => {
    const putCity = await serviceCities.put(id, changedCity);
    setCityList((prevState) => {
       return prevState.map((city) => {
        if (city.id === id) {
          return putCity;
        } else return city;
      });
    });
  };

  const deleteButtonHandle = async (id) => {
    const result = await serviceCities.delete(id)
    if (result.id) {
      setCityList( prevState => {
        return prevState.filter((city => city.id !== result.id))
      })
    }
  }

  return (
    <ul className="city-list">
      {cityList ? cityList.map((city) => (
        <ListElement
          key={city.id}
          city={city}
          saveButtonHandle={saveButtonHandle}
          deleteButtonHandle={deleteButtonHandle}
        />
      )) : null}
    </ul>
  );
}
