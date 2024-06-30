import { useState, useEffect } from "react";
import ListElement from "./ListElement/ListElement";

export default function List() {
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    (async () => {
      const request = await fetch(
          "https://66805a1156c2c76b495bd6dc.mockapi.io/title"
        ),
        result = await request.json();
      setCityList(result);
    })();
  }, []);

  return (
    <ul>
      {cityList.map((city) => (
        <ListElement key={city.id} city={city} />
      ))}
    </ul>
  );
}
