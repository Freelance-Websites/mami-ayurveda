// Globals
import Image from 'next/image';

// Styles
import styles from './Doshas.module.css';

export default function Doshas({ title, text, doshas }) {
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
      {text &&
        <p
          className="text-slate-500 mt-4 max-w-md mx-auto"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      }
      <ul
        className="
          grid grid-cols-1 md:grid-cols-3 gap-4
          pt-12 md:pt-16
        "
      >
        {doshas.map((dosha, index) => 
          <li
            key={index}
            className="
              bg-white shadow-lg
              py-24
            "
          >
            <Image
              src={dosha.image}
              alt={dosha.title}
              layout="fixed"
              width={60}
              height={60}
              className="grayscale"
            />
            <h4 className="mt-1 uppercase text-slate-700 text-xs font-semibold tracking-wider">{dosha.title}</h4>
            <p className="mt-1 uppercase text-slate-500 text-xs font-semibold tracking-wider">{dosha.text}</p>
          </li>
        )}
      </ul>
    </section>
  );
}
