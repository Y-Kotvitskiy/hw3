import { useState, useRef, useEffect } from "react";

export default function useCitiesElementHook(
  id,
  visited,
  saveButtonHandle,
  deleteButtonHandle
) {
  const [toggle, setToggle] = useState(true);
  const [activeButton, setActiveButton] = useState("");

  const cityActive = visited ? `active` : "";

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
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setToggle(true);
      }
    }, 0);
  };

  const handleCheckboxClick = () => {
    if (toggle) setToggle(false);
  };

  const handleOkClick = () => {
    setToggle(true);
    saveButtonHandle(id, {
      cityName: inputRef.current.value,
      visited: checkedRef.current.checked,
    });
  };

  const handleDelClick = () => {
    setToggle(true);
    deleteButtonHandle(id);
  };

  return {
    toggle,
    activeButton,
    inputRef,
    checkedRef,
    liRef,
    cityActive,
    toggleInput,
    handleOnBlur,
    handleCheckboxClick,
    handleOkClick,
    handleDelClick,
  };
}
