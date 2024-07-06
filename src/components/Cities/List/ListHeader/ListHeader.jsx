export default function ListHeader({ buttons = [], buttonHandler, sortState }) {
  return (
    <div className="list_header">
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
