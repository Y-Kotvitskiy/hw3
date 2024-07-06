import useCitiesForm from "./../../../hooks/citiesForm";
import {
  FORM_TITLE,
  FORM_INPUT_LABEL,
  FORM_CHECKBOX_LABEL,
  FORM_BTN_ADD,
  FORM_BTN_CLEAR,
} from "./../../../constants/cities";

export default function Form({
  formValues: propformValues = { cityName: "", visited: false },
  getNewCity,
}) {
  const { formValues, disableButtons, 
    cityRef, visitedRef, formRef,
    handleInput, handleSubmit, handleReset } =
    useCitiesForm(propformValues, getNewCity);

  return (
    <form className="new-city" onSubmit={handleSubmit} ref={formRef}>
      <h3>{FORM_TITLE}</h3>
      <label>
        {FORM_INPUT_LABEL}
        <input
          className="new-city__city-name"
          name="cityName"
          defaultValue={propformValues.cityName}
          onChange={handleInput}
          ref={cityRef}
        />
      </label>
      <label>
        {FORM_CHECKBOX_LABEL}
        <input
          type="checkBox"
          name="visited"
          defaultChecked={propformValues.visited}
          onChange={handleInput}
          ref={visitedRef}
        />
      </label>
      <div className="new-city__button-holder">
        <button disabled={disableButtons.add}>{FORM_BTN_ADD}</button>
        <button disabled={disableButtons.clear} type="button" onClick={handleReset}>
          {FORM_BTN_CLEAR}
        </button>
      </div>
    </form>
  );
}
