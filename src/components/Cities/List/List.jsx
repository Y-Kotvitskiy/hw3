import { useState, useEffect } from "react";
import ListElement from "./ListElement/ListElement";
import serviceCities from "./../../../services/cities";
import ListHeader from "./ListHeader/ListHeader";
import {
  BTN_TITLE_ASC,
  BTN_TITLE_UNSORT,
  BTN_TITLE_DESC,
} from "./../../../constants/cities";
import {
  STATE_ASC,
  STATE_UNSORT,
  STATE_DESC,
} from "./../../../constants/cities";
import "./List.css";

export default function List({ newCity }) {
  const [cityList, setCityList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [sortState, setSortState] = useState(STATE_UNSORT);

  const addNewCity = async (newCity) => {
    const postCity = await serviceCities.post(newCity);
    setCityList([...cityList, postCity]);
  };

  useEffect(() => {
    if (newCity) {
      addNewCity(newCity);
    }
  }, [newCity]);

  useEffect(() => {
    setSortedList(() => {
      const newList = [...cityList];
      const sortFn = sortFuncs[sortState];
      if (sortFn) newList.sort(sortFn);
      return newList;
    });
  }, [cityList, sortState]);

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
    const result = await serviceCities.delete(id);
    if (result.id) {
      setCityList((prevState) => {
        return prevState.filter((city) => city.id !== result.id);
      });
    }
  };

  const sortButtons = [
    { title: BTN_TITLE_ASC, state: STATE_ASC },
    { title: BTN_TITLE_UNSORT, state: STATE_UNSORT },
    { title: BTN_TITLE_DESC, state: STATE_DESC },
  ];

  const sortFuncs = {
    [STATE_ASC]: (a, b) => {
      const cityA = a.cityName ? a.cityName.toUpperCase() : "";
      const cityB = b.cityName ? b.cityName.toUpperCase() : "";
      if (cityA > cityB) {
        return 1;
      } else if (cityA < cityB) {
        return -1;
      }
      return 0;
    },
    [STATE_DESC]: (a, b) => {
      const cityA = a.cityName ? a.cityName.toUpperCase() : "";
      const cityB = b.cityName ? b.cityName.toUpperCase() : "";
      if (cityA < cityB) {
        return 1;
      } else if (cityA > cityB) {
        return -1;
      }
      return 0;
    },
  };

  const sortButtonHandler = (state) => setSortState(state);

  return (
    <>
      <ListHeader
        buttons={sortButtons}
        buttonHandler={sortButtonHandler}
        sortState={sortState}
      />
      <ul className="city-list">
        {cityList
          ? sortedList.map((city) => (
              <ListElement
                key={city.id}
                city={city}
                saveButtonHandle={saveButtonHandle}
                deleteButtonHandle={deleteButtonHandle}
              />
            ))
          : null}
      </ul>
    </>
  );
}
