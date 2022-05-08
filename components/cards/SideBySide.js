// Globals
import Image from 'next/image';

// Styles
import styles from './SideBySide.module.css';

export default function SideBySide({ card }) {
  return (
    <li
      className="
        grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8
        items-center
      "
    >
      <div>
        <h3
          dangerouslySetInnerHTML={{ __html: card.title }}
          className={`
            font-serif text-slate-700 text-2xl md:text-4xl
            ${styles.Title}
          `}
        />
        <p
          dangerouslySetInnerHTML={{ __html: card.text }}
          className={`
            text-slate-500 mt-2 max-w-xl
            ${styles.Text}
          `}
        />
      </div>
      <div
        className="relative h-96 order-first lg:order-last"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-8 -left-8 z-10 hidden md:block"
        >
          <circle cx="36" cy="36" r="36" fill="#FDC166" fillOpacity="0.5"/>
        </svg>
        <Image
          src={card.image}
          alt={card.title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
    </li>
  );
}
