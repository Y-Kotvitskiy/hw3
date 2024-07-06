import {
  ELEMENT_BTN_OK,
  ELEMENT_BTN_DEL,
} from "./../../../../constants/cities";
import useCitiesElementHook from "./../../../../hooks/citiesListElementHook";

export default function ListElement({
  city: { id, cityName, visited },
  saveButtonHandle,
  deleteButtonHandle,
}) {
  const {
    toggle,
    activeButton,
    inputRef,
    checkedRef,
    liRef,
    toggleInput,
    handleOnBlur,
    handleCheckboxClick,
    handleOkClick,
    handleDelClick,
  } = useCitiesElementHook(id, saveButtonHandle, deleteButtonHandle);

  return (
    <li className="city-list__item" onBlur={handleOnBlur} ref={liRef}>
      {toggle ? (
        <span className="city-list__name" onDoubleClick={toggleInput}>
          {cityName}
        </span>
      ) : (
        <input
          id={id}
          className="city-list__name"
          defaultValue={cityName}
          ref={inputRef}
        />
      )}
      <label className="city-list__check">
        <input
          onClick={handleCheckboxClick}
          type="checkbox"
          defaultChecked={visited}
          ref={checkedRef}
        />
      </label>
      <button
        className={`city-list__button city-list__save ${activeButton}`}
        onClick={handleOkClick}
      >
        {ELEMENT_BTN_OK}
      </button>
      <button
        className={`city-list__button city-list__delete `}
        onClick={handleDelClick}
      >
        {ELEMENT_BTN_DEL}
      </button>
    </li>
  );
}
