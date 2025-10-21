// Globals
import Image from 'next/image';

export default function Senses({ content }) {
  return (
    <section
      className="
        relative mx-auto px-4
        bg-white md:rounded-lg md:mx-12
        shadow-lg
        z-10
      "
    >
      <ul
        className="
          grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4
          md:px-8 py-8 md:py-12
        "
      >
        {content.map((sense, index) =>
          <li
            key={index}
            className="text-center"
          >
            <Image
              src={sense.image}
              alt={sense.title}
              width={72}
              height={72}
              className="mb-4"
            />
            <h3 className="uppercase text-slate-700 text-xs font-semibold tracking-wider">{sense.title}</h3>
            <p className="uppercase text-slate-500 text-xs font-semibold tracking-wider">{sense.text}</p>
          </li>
        )}
      </ul>
    </section>
  );
}
