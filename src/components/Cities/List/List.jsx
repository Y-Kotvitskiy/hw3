import useCitiesList from './../../../hooks/citiesList'
import ListElement from "./ListElement/ListElement";
import ListHeader from "./ListHeader/ListHeader";
import "./List.css";

export default function List({ newCity }) {

  const 
   {sortedList, sortState, sortButtons, filter,
    sortButtonHandler, filterHandler, saveButtonHandle, deleteButtonHandle}  = useCitiesList(newCity) 

  return (
    <>
      <ListHeader
        buttons={sortButtons}
        buttonHandler={sortButtonHandler}
        sortState={sortState}
        filter = {filter}
        filterHandler = {filterHandler}
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
