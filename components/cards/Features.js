export default function Features({ features }) {
  return (
    <ul
      className="mt-8 lg:mt-12 text-slate-500 grid grid-cols-1 md:grid-cols-3 px-4"
    >
      {features.map((feature, index) =>
        <li
          key={index}
          className="flex flex-col gap-4"
        >
          <div className="text-emerald-700 bg-white rounded-full w-12 h-12 inline-flex items-center justify-center">
            <svg fill="none" height="13" viewBox="0 0 18 13" width="18" xmlns="http://www.w3.org/2000/svg" className="fill-current text-inherit"><path d="m15.293.203125-9.24612 9.246095-3.375-3.41016c-.17579-.14062-.45704-.14062-.59766 0l-1.01953 1.01953c-.140628.14063-.140628.42188 0 .59766l4.71093 4.67575c.17579.1758.42188.1758.59766 0l10.54692-10.54684c.1406-.14063.1406-.42188 0-.59766l-1.0196-.984375c-.1406-.1757812-.4218-.1757812-.5976 0z"/></svg>
          </div>
          {feature.featureTitle &&
            <h4
              className="text-slate-800 uppercase text-xs font-semibold tracking-wider"
            >
              {feature.featureTitle}
            </h4>
          }
          <p
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: feature.featureText}}
          />
        </li>
      )}
    </ul>
  );
}
