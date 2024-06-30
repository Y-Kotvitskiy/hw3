import { useState, useRef, useEffect } from "react";

export default function ListElement({ city: { id, cityName, visited } }) {
  const [toggle, setToggle] = useState(true);

  const inputRef = useRef(null);
  const liRef = useRef(null);

  useEffect(() => {
    if (!toggle) inputRef.current.focus();
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

  return (
    <li onBlur={handleOnBlur} ref={liRef}>
      {toggle ? (
        <span className="city-name" onDoubleClick={toggleInput}>
          {cityName}
        </span>
      ) : (
        <input
          id={id}
          className="city-name"
          defaultValue={cityName}
          ref={inputRef}
        />
      )}
      <label>
        <input type="checkbox" defaultChecked={visited} />
      </label>
      {!toggle && <button>✔</button>}
    </li>
  );
}
