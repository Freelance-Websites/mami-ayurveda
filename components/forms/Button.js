// Globals
import Link from 'next/link';

export default function Button({ cta }) {
  const generalClasses = 'inline-flex items-center p-2 inline-block rounded text-white uppercase text-xs font-semibold tracking-wider transition ease-in-out duration-200';
  const themeClasses = 
    cta.theme === 'solid' ?
      'bg-orange-400 hover:bg-orange-500'
    : cta.theme === 'transparent' ?
      'hover:opacity-80'
    :
      'border border-white hover:bg-white hover:text-gray-800'
  ;
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
          {cta.icon === true &&
            <svg fill="none" className="fill-current ml-1" height="7" viewBox="0 0 11 7" width="11" xmlns="http://www.w3.org/2000/svg"><path d="m7.16406.21875-.46875.46875c-.09375.117188-.09375.28125.02344.39844l1.875 1.80468h-8.0625c-.164062 0-.28125.14063-.28125.28126v.65624c0 .16407.117188.28126.28125.28126h8.0625l-1.875 1.82812c-.11719.11719-.11719.28125-.02344.39844l.46875.46875c.11719.09375.28125.09375.39844 0l3.0937-3.09375c.0938-.11719.0938-.28125 0-.39844l-3.0937-3.09375c-.11719-.09375-.28125-.09375-.39844 0z" /></svg>
          }
        </a>
      :
      <Link
        href={cta.link}
        className={`
          ${generalClasses}
          ${themeClasses}
          ${cta.classes && cta.classes}
        `}
      >
        {cta.text}
        {cta.icon === true &&
          <svg fill="none" className="fill-current ml-1" height="7" viewBox="0 0 11 7" width="11" xmlns="http://www.w3.org/2000/svg"><path d="m7.16406.21875-.46875.46875c-.09375.117188-.09375.28125.02344.39844l1.875 1.80468h-8.0625c-.164062 0-.28125.14063-.28125.28126v.65624c0 .16407.117188.28126.28125.28126h8.0625l-1.875 1.82812c-.11719.11719-.11719.28125-.02344.39844l.46875.46875c.11719.09375.28125.09375.39844 0l3.0937-3.09375c.0938-.11719.0938-.28125 0-.39844l-3.0937-3.09375c-.11719-.09375-.28125-.09375-.39844 0z" /></svg>
        }
      </Link>
    :
      <button
        className={`
          ${generalClasses}
          ${themeClasses}
          ${cta.classes && cta.classes}
          ${cta.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={cta.action ? cta.action : null}
        disabled={cta.disabled}
      >
        {cta.text}
        {cta.icon === true &&
          <svg fill="none" className="fill-current ml-1 relative -top-px" height="7" viewBox="0 0 11 7" width="11" xmlns="http://www.w3.org/2000/svg"><path d="m7.16406.21875-.46875.46875c-.09375.117188-.09375.28125.02344.39844l1.875 1.80468h-8.0625c-.164062 0-.28125.14063-.28125.28126v.65624c0 .16407.117188.28126.28125.28126h8.0625l-1.875 1.82812c-.11719.11719-.11719.28125-.02344.39844l.46875.46875c.11719.09375.28125.09375.39844 0l3.0937-3.09375c.0938-.11719.0938-.28125 0-.39844l-3.0937-3.09375c-.11719-.09375-.28125-.09375-.39844 0z" /></svg>
        }
      </button>
  );
}
