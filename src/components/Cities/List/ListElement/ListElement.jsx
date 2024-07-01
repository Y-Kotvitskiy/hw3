import { useState, useRef, useEffect } from "react";

export default function ListElement({
  city: { id, cityName, visited },
  saveButtonHandle,
}) {
  const [toggle, setToggle] = useState(true);
  const [activeButton, setActiveButton] = useState("");

  const inputRef = useRef(null);
  const checkedRef = useRef(null);
  const liRef = useRef(null);

  useEffect(() => {
    if (!toggle) {
      inputRef.current.focus();
      setActiveButton(`active`);
    } else {
      setActiveButton(``);
    }
  }, [toggle]);

  function toggleInput() {
    setToggle(false);
  }

  const handleOnBlur = (e) => {
    const currentTarget = e.currentTarget;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        // You can invoke a callback or add custom logic here
        setToggle(true);
      }
    }, 0);
  };

  const handleCheckboxClick = () => {
    if (toggle) setToggle(false);
  };

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
        className={`city-list__save ${activeButton}`}
        onClick={() => {
          setToggle(true);
          saveButtonHandle(
            id,
            inputRef.current.value,
            checkedRef.current.checked
          );
        }}
      >
        ✔
      </button>
    </li>
  );
}
