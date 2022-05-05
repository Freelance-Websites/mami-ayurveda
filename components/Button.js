// Globals
import Link from 'next/link';

export default function Button({ cta }) {
  const generalClasses = 'p-2 inline-block rounded text-white uppercase text-xs font-semibold tracking-wider transition ease-in-out duration-200';
  const themeClasses = cta.theme === 'solid' ? 'bg-orange-400 hover:bg-orange-500' : 'border border-white hover:bg-white hover:text-gray-800';
  return (
    !cta.isButton ?
      cta.isExternal ?
        <a
          className={`
            ${generalClasses}
            ${themeClasses}
            ${cta.classes && cta.classes}
          `}
          href={cta.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {cta.text}
        </a>
      :
      <Link
        href={cta.link}
      >
        <a
          className={`
            ${generalClasses}
            ${themeClasses}
            ${cta.classes && cta.classes}
          `}
          href={cta.link}
        >
          {cta.text}
        </a>
      </Link>
    :
      <button
        className={`
          ${generalClasses}
          ${themeClasses}
          ${cta.classes && cta.classes}
        `}
        onClick={cta.action}
      >
        {cta.text}
      </button>
  );
}
