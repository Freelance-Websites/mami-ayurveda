export default function Select({ id, type, label, required, classes, options }) {
  return (
    <div
      className={classes && classes}
    >
      <label
        className="uppercase text-xs font-semibold tracking-widest text-inherit mb-2 block"
      >
        {label}
      </label>
      <select
        type={type}
        name={id}
        id={id}
        required={required}
        className="
          w-full rounded p-2
          text-sm text-gray-700
        "
      >
        {options.map((option, index) =>
          <option
            key={index}
            value={option.value}
            disabled={option.disabled}
          >
            {option.text}
          </option>
        )}
      </select>
    </div>
  );
}
