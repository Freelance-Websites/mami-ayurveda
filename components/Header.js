import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className="sticky top-0 bg-white border-b border-b-gray-50 p-3"
    >
      <section
        className="container mx-auto flex items-center justify-between"
      >
        <Link
          href="/"
        >
          <a
            className="hover:opacity-80"
          >
            <Image
              src="/images/logos/logo.png"
              srcSet="/images/logos/logo.png 1x, /logos/logo@2x.png 2x"
              alt="Mami Ayurveda Pediatría"
              layout="fixed"
              width={85}
              height={36}
            />
          </a>
        </Link>
        <ul
          className="flex items-center gap-4"
        >
          <li>
            <Link
              href="/ebooks"
            >
              <a
                className="uppercase text-gray-800 text-xs font-semibold tracking-wider hover:text-gray-600"
              >
                E-books
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="/cursos-y-talleres"
            >
              <a
                className="uppercase text-gray-800 text-xs font-semibold tracking-wider hover:text-gray-600"
              >
                Cursos y talleres
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="/turnos"
            >
              <a
                className="uppercase bg-orange-400 p-2 rounded text-white text-xs font-semibold tracking-wider hover:bg-orange-500"
              >
                Turnos
              </a>
            </Link>
          </li>
          <li className="flex">
            <button className="hover:opacity-80">
              <svg fill="none" height="14" viewBox="0 0 18 14" width="18" xmlns="http://www.w3.org/2000/svg"><g fill="#112734" fill-opacity=".3"><path d="m0 12h18v2h-18z"/><path d="m0 6h18v2h-18z"/><path d="m0 0h18v2h-18z"/></g></svg>
            </button>
          </li>
        </ul>
      </section>
    </header>
  );
}
