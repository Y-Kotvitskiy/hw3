import { useState, useEffect, useMemo } from "react";
import serviceCities from "./../services/cities";
import {
  BTN_TITLE_ASC,
  BTN_TITLE_UNSORT,
  BTN_TITLE_DESC,
} from "./../constants/cities";
import { STATE_ASC, STATE_UNSORT, STATE_DESC } from "./../constants/cities";

import {
  FILTER_TITLE,
  FILTER_OPTION_ALL,
  FILTER_OPTION_YES,
  FILTER_OPTION_NO,
  FILTER_STATE_ALL,
  FILTER_STATE_YES,
  FILTER_STATE_NO,
} from "./../constants/cities";

export default function useCitiesList(newCity) {
  const [cityList, setCityList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [sortState, setSortState] = useState(STATE_UNSORT);
  const [filterState, setFilterState] = useState(FILTER_STATE_ALL);

  useEffect(() => {
    if (!newCity) return;

    const addNewCity = async (newCity) => {
      const postCity = await serviceCities.post(newCity);
      setCityList([...cityList, postCity]);
    };
    addNewCity(newCity);
  }, [newCity]);

  useEffect(() => {
    setSortedList(() => {
      let newList = [];
      if (filterState === FILTER_STATE_ALL) newList = [...cityList];
      else {
        newList = cityList.filter(
          (city) => city.visited === (filterState === FILTER_STATE_YES)
        );
      }
      const sortFn = sortFuncs[sortState];
      if (sortFn) newList.sort(sortFn);
      return newList;
    });
  }, [cityList, sortState, filterState]);

  useEffect(() => {
    const getCities = async () => {
      const cities = await serviceCities.get();
      setCityList(cities);
    };
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

  const sortButtons = useMemo(() => [
    { title: BTN_TITLE_ASC, state: STATE_ASC },
    { title: BTN_TITLE_UNSORT, state: STATE_UNSORT },
    { title: BTN_TITLE_DESC, state: STATE_DESC },
  ]);

  const sortFuncs = useMemo(() => ({
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
  }));

  const sortButtonHandler = (state) => setSortState(state);

  const filterHandler = (state) => setFilterState(state);

  const filter = useMemo(() => ({
    title: FILTER_TITLE,
    options: [
      { title: FILTER_OPTION_ALL, value: FILTER_STATE_ALL },
      { title: FILTER_OPTION_YES, value: FILTER_STATE_YES },
      { title: FILTER_OPTION_NO, value: FILTER_STATE_NO },
    ],
  }));

  return {
    sortedList,
    sortState,
    sortButtons,
    filter,
    sortButtonHandler,
    filterHandler,
    saveButtonHandle,
    deleteButtonHandle,
  };
}
