// Globals
import Link from 'next/link';
import Image from 'next/image';

export default function Card({ card }) {
  return (
    <li
      className="
        rounded-xl
        border border-gray-100
      "
    >
      <Link href={card.link}>
        <a className="hover:opacity-90 transition ease-in-out duration-200">
          <div
            className="h-48 md:h-64 relative"
          >
            <Image
              src={card.image}
              alt={card.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
          </div>
          <div className="p-4">
            <h5 className="font-serif text-slate-700 text-xl md:text-2xl">{card.title}</h5>
            {card.text &&
              <p className="text-slate-500 mt-2 line-clamp-4 md:line-clamp-2">{card.text}</p>
            }
          </div>
        </a>
      </Link>
    </li>
  );
}
