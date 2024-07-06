export default function ListHeader({
  buttons = [],
  buttonHandler,
  sortState,
  filter = null,
  filterHandler
}) {
  return (
    <div className="list_header">
      {filter ? (
        <label>
          {filter.title}
          <select onChange={(e) => filterHandler(e.target.value)}>
            {filter.options.map((option, index) => (
              <option key={index} value={option.value}>{option.title}</option>
            ))}
          </select>
        </label>
      ) : null}
      {buttons.length
        ? buttons.map((button, index) => (
            <button
              key={index}
              className={button.state === sortState ? `active` : ""}
              onClick={() => buttonHandler(button.state)}
            >
              {button.title}
            </button>
          ))
        : null}
    </div>
  );
}
