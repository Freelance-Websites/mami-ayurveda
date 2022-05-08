export default function Textarea({ id, label, required, placeholder, classes }) {
  return (
    <div
      className={classes && classes}
    >
      <label
        className="uppercase text-xs font-semibold tracking-widest text-inherit	 mb-2 block"
      >
        {label}
      </label>
        <textarea
        name={id}
        id={id}
        required={required}
        className={`
          rounded
          w-full p-2
          text-sm text-gray-700
          flex-1
          resize-none
          h-32
        `}
        placeholder={placeholder}
      />
    </div>
  );
}
