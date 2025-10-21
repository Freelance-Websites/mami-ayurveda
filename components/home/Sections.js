// Globals
import Link from 'next/link';
import Image from 'next/image';

// Styles
import styles from './Sections.module.css';

export default function Sections({ title, sections }) {
  return (
    <section
      className="
        container mx-auto
        py-16 sm:py-24 md:py-32 lg:py-48 px-4
        text-center
      "
    >
      <h3
        dangerouslySetInnerHTML={{ __html: title }}
        className={`
          ${styles.Title}
          font-serif text-slate-700 text-2xl md:text-4xl
        `}
      />
      <ul
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
          pt-4 md:pt-8
        "
      >
        {sections.map((section, index) =>
          <li
            key={index}
            className="
              p-4 rounded
              transition ease-in-out duration-200 hover:bg-orange-50
              cursor-pointer
            "
          >
            <Link href={section.link} className="text-center">
              <Image
                src={section.image}
                alt={section.title}
                layout="fixed"
                width={index === 2 ? 72 : 84}
                height={index === 2 ? 60 : 72}
                className='mix-blend-multiply'
              />
              <h4
                className={`
                    uppercase text-orange-400 text-xs font-semibold tracking-wider mt-4 flex items-center justify-center
                    ${index === 2 ? 'relative top-0 md:top-3' : ''}
                  `}
              >
                {section.title}
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current ml-1 relative -top-px">
                  <path d="M7.16406 0.21875L6.69531 0.6875C6.60156 0.804688 6.60156 0.96875 6.71875 1.08594L8.59375 2.89062H0.53125C0.367188 2.89062 0.25 3.03125 0.25 3.17188V3.82812C0.25 3.99219 0.367188 4.10938 0.53125 4.10938H8.59375L6.71875 5.9375C6.60156 6.05469 6.60156 6.21875 6.69531 6.33594L7.16406 6.80469C7.28125 6.89844 7.44531 6.89844 7.5625 6.80469L10.6562 3.71094C10.75 3.59375 10.75 3.42969 10.6562 3.3125L7.5625 0.21875C7.44531 0.125 7.28125 0.125 7.16406 0.21875Z" />
                </svg>
              </h4>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
