export default function Footer({ page }) {
  return (
    <footer
      className="
        absolute bottom-0 p-4 w-full
      "
    >
      <div
        className={`
          flex items-center flex-col text-center md:text-left md:flex-row
          ${page === 'contact' ? 'md:justify-center' : 'md:justify-between'}
        `}
      >
        <p
          className="uppercase text-xs font-semibold tracking-widest text-white/80"
        >
          copyright <span>{new Date().getFullYear()}</span> mami ayurveda. designed &amp; developed by
          <a
            href="https://jmg.land"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline hover:no-underline"
          >
            jmg
          </a>.
        </p>
        <a
          href="https://instagram.com/mami.ayurveda"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 mt-4 md:mt-0 ml-4"
        >
          <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="m8 3.40625c-2 0-3.59375 1.625-3.59375 3.59375 0 2 1.59375 3.5938 3.59375 3.5938 1.96875 0 3.5938-1.5938 3.5938-3.5938 0-1.96875-1.62505-3.59375-3.5938-3.59375zm0 5.9375c-1.28125 0-2.34375-1.03125-2.34375-2.34375 0-1.28125 1.03125-2.3125 2.34375-2.3125 1.28125 0 2.3125 1.03125 2.3125 2.3125 0 1.3125-1.03125 2.34375-2.3125 2.34375zm4.5625-6.0625c0-.46875-.375-.84375-.8437-.84375-.4688 0-.8438.375-.8438.84375s.375.84375.8438.84375c.4687 0 .8437-.375.8437-.84375zm2.375.84375c-.0625-1.125-.3125-2.125-1.125-2.9375s-1.8125-1.0625-2.9375-1.125c-1.15625-.0625-4.625-.0625-5.78125 0-1.125.0625-2.09375.3125-2.9375 1.125-.8125.8125-1.0625 1.8125-1.125 2.9375-.0625 1.15625-.0625 4.625 0 5.78125.0625 1.12495.3125 2.09375 1.125 2.93755.84375.8124 1.8125 1.0624 2.9375 1.125 1.15625.0624 4.625.0624 5.78125 0 1.125-.0626 2.125-.3126 2.9375-1.125.8125-.8438 1.0625-1.8126 1.125-2.93755.0625-1.15625.0625-4.625 0-5.78125zm-1.5 7c-.2187.625-.7187 1.0938-1.3125 1.3438-.9375.375-3.125.2812-4.125.2812-1.03125 0-3.21875.0938-4.125-.2812-.625-.25-1.09375-.7188-1.34375-1.3438-.375-.9062-.28125-3.09375-.28125-4.125 0-1-.09375-3.1875.28125-4.125.25-.59375.71875-1.0625 1.34375-1.3125.90625-.375 3.09375-.28125 4.125-.28125 1 0 3.1875-.09375 4.125.28125.5938.21875 1.0625.71875 1.3125 1.3125.375.9375.2813 3.125.2813 4.125 0 1.03125.0937 3.2188-.2813 4.125z" /></svg>
        </a>
      </div>
    </footer>
  );
}
