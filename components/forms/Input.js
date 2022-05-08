export default function Input({ id, type, label, required, placeholder, classes, prepend }) {
  return (
    <div
      className={classes && classes}
    >
      <label
        className="uppercase text-xs font-semibold tracking-widest text-inherit	 mb-2 block"
      >
        {label}
      </label>
      <div
        className="flex"
      >
        {prepend &&
          <div
            className="
              bg-gray-200
              text-sm text-gray-800
              rounded-l p-2
              flex-none
            "
          >
            {prepend}
          </div>
        }
        <input
          type={type}
          name={id}
          id={id}
          required={required}
          className={`
            ${prepend ? 'rounded-r' : 'rounded'}
            w-full p-2
            text-sm text-gray-700
            flex-1
          `}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
