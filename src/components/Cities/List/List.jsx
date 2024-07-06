import useCitiesList from './../../../hooks/citiesList'
import ListElement from "./ListElement/ListElement";
import ListHeader from "./ListHeader/ListHeader";
import "./List.css";

export default function List({ newCity }) {

  const 
   {sortedList, sortState, sortButtons,
    sortButtonHandler, saveButtonHandle, deleteButtonHandle}  = useCitiesList(newCity) 

  return (
    <>
      <ListHeader
        buttons={sortButtons}
        buttonHandler={sortButtonHandler}
        sortState={sortState}
      />
      <ul className="city-list">
        {sortedList
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
