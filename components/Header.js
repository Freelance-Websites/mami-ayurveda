// Globals
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Components
import Button from './forms/Button';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const cta = {
    link: '/turnos',
    text: 'Turnos',
    isExternal: false,
    isButton: false,
    theme: 'solid',
  };

  return (
    <>
      {/* header */}
      <header
        className="sticky top-0 bg-white border-b border-b-gray-50 p-3 z-20"
      >
        <section
          className="container mx-auto flex items-center"
        >
          <Link
            href="/"
          >
            <a
              className="hover:opacity-80 flex-1 transition ease-in-out duration-200"
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
          <div
            className="flex-1 justify-center relative hidden lg:flex"
          >
            <div
              className="absolute top-0"
            >
              <Image
                src="/images/logos/isologo.png"
                srcSet="/images/logos/isologo.png 1x, /logos/isologo@2x.png 2x"
                alt="Mami Ayurveda Pediatría"
                layout="fixed"
                width={62}
                height={137}
                className="z-10"
                priority
              />
              <div className="absolute w-16 h-16 bg-white top-6 rounded-full" />
            </div>
          </div>
          <ul
            className="flex items-center gap-4 flex-1 justify-end"
          >
            <li className="hidden md:block">
              <Link
                href="/ebooks"
              >
                <a
                  className={`
                    ${router.asPath === '/ebooks' ? 'text-orange-400 hover:text-orange-500' : 'text-slate-700 hover:text-slate-600'}
                    uppercase text-xs font-semibold tracking-wider transition ease-in-out duration-200
                  `}
                >
                  E-books
                </a>
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                href="/membresia"
              >
                <a
                  className={`
                    ${router.asPath === '/membresia' ? 'text-orange-400 hover:text-orange-500' : 'text-slate-700 hover:text-slate-600'}
                    uppercase text-xs font-semibold tracking-wider transition ease-in-out duration-200
                  `}
                >
                  Membres&iacute;a
                </a>
              </Link>
            </li>
            <li>
              <Button
                cta={cta}
              />
            </li>
            <li className="flex">
              <button
                className="group"
                onClick={() => setIsVisible(!isVisible)}
              >
                <svg fill="none" height="14" viewBox="0 0 18 14" width="18" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-gray-400 fill-gray-300 transition ease-in-out duration-200"><g><path d="m0 12h18v2h-18z"/><path d="m0 6h18v2h-18z"/><path d="m0 0h18v2h-18z"/></g></svg>
              </button>
            </li>
          </ul>
        </section>
      </header>
      {/* toggle menu */}
      {isVisible === true &&
        <DropdownMenu
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      }
      {/* Whatsapp button */}
      <a className="w-14 h-14 p-4 flex items-center rounded-full bg-green-600 fixed bottom-8 right-8 z-30 shadow-lg shadow-green-700/50 transition duration-500 ease-in-out hover:bg-green-500" href="https://wa.me/5491151199398" target="_blank" rel="noopener noreferrer">
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.1429 5.21429C24.2143 2.21429 20.2143 0.5 15.9286 0.5C7.21429 0.5 0.0714286 7.64286 0.0714286 16.3571C0.0714286 19.2143 0.857143 21.9286 2.21429 24.2857L0 32.5L8.35714 30.3571C10.7143 31.5714 13.2857 32.2857 15.9286 32.2857C24.7143 32.2857 32 25.1429 32 16.4286C32 12.1429 30.1429 8.21429 27.1429 5.21429ZM15.9286 29.5714C13.5714 29.5714 11.2857 28.9286 9.21429 27.7143L8.78571 27.4286L3.78571 28.7857L5.14286 23.9286L4.78571 23.4286C3.5 21.2857 2.78571 18.8571 2.78571 16.3571C2.78571 9.14286 8.71429 3.21429 16 3.21429C19.5 3.21429 22.7857 4.57143 25.2857 7.07143C27.7857 9.57143 29.2857 12.8571 29.2857 16.4286C29.2857 23.6429 23.2143 29.5714 15.9286 29.5714ZM23.2143 19.7143C22.7857 19.5 20.8571 18.5714 20.5 18.4286C20.1429 18.2857 19.8571 18.2143 19.5714 18.6429C19.3571 19 18.5714 19.9286 18.3571 20.2143C18.0714 20.4286 17.8571 20.5 17.5 20.2857C15.1429 19.1429 13.6429 18.2143 12.0714 15.5714C11.6429 14.8571 12.5 14.9286 13.2143 13.4286C13.3571 13.1429 13.2857 12.9286 13.2143 12.7143C13.1429 12.5 12.2857 10.5714 12 9.78571C11.6429 9 11.3571 9.07143 11.0714 9.07143C10.8571 9.07143 10.5714 9.07143 10.3571 9.07143C10.0714 9.07143 9.64286 9.14286 9.28571 9.57143C8.92857 10 7.92857 10.9286 7.92857 12.8571C7.92857 14.8571 9.28571 16.7143 9.5 17C9.71429 17.2143 12.2857 21.2143 16.2857 22.9286C18.7857 24.0714 19.7857 24.1429 21.0714 23.9286C21.7857 23.8571 23.3571 23 23.7143 22.0714C24.0714 21.1429 24.0714 20.3571 23.9286 20.2143C23.8571 20 23.5714 19.9286 23.2143 19.7143Z" fill="white"/>
        </svg>
      </a>
    </>
  );
}

const DropdownMenu = ({ isVisible, setIsVisible }) => {
  return (
    <div
      className="fixed w-full h-screen bg-white top-0 flex items-center justify-center z-20"
    >
      <button
        className="absolute top-8 right-8"
        onClick={() => setIsVisible(!isVisible)}
      >
        <svg fill="none" height="27" viewBox="0 0 28 27" width="28" xmlns="http://www.w3.org/2000/svg" className="hover:fill-gray-400 fill-gray-300 transition ease-in-out duration-200"><path d="m16.707 13.25 8.4492-8.36719 1.7227-1.72265c.2461-.2461.2461-.65625 0-.98438l-1.8047-1.804686c-.3281-.246094-.7383-.246094-.9844 0l-10.0898 10.171906-10.17188-10.171906c-.24609-.246094-.65624-.246094-.98437 0l-1.80469 1.804686c-.246091.32813-.246091.73828 0 .98438l10.17184 10.08984-10.17184 10.1719c-.246091.2461-.246091.6562 0 .9843l1.80469 1.8047c.32813.2461.73828.2461.98437 0l10.17188-10.1718 8.3672 8.4492 1.7226 1.7226c.2461.2461.6563.2461.9844 0l1.8047-1.8047c.2461-.3281.2461-.7382 0-.9843z"/></svg>
      </button>
      <ul>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Inicio
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/que-es-ayurveda"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              ¿Qu&eacute; es Ayurveda?
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/sobre-mi"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Sobre m&iacute;
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/sobre-mi#mi-enfoque"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Mi enfoque m&eacute;dico
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/membresia"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Membres&iacute;a
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/cursos-y-talleres"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Cursos y talleres
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/ebooks"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              E-books
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/turnos#preguntas-frecuentes"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Preguntas frecuentes
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group md:mb-4 flex items-center justify-center">
          <Link
            href="/turnos#solicitar-turno"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Turnos
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
        <li className="group flex items-center justify-center">
          <Link
            href="/contacto"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-5xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
            >
              Contacto
              <span className="opacity-0 transition ease-in-out duration-200 group-hover:opacity-100 absolute -right-10 top-6 hidden md:block">
                <svg fill="none" height="17" viewBox="0 0 28 17" width="28" xmlns="http://www.w3.org/2000/svg" className="fill-orange-400"><path d="m19.4375.25-.5.4375c-.25.3125-.25.75 0 1.0625l5.25 5.1875h-23.4375c-.4375 0-.75.375-.75.75v.625c0 .4375.3125.75.75.75h23.4375l-5.25 5.25c-.25.3125-.25.75 0 1.0625l.5.4375c.25.3125.75.3125 1.0625 0l7.25-7.25c.3125-.3125.3125-.75 0-1.0625l-7.25-7.25c-.3125-.3125-.8125-.3125-1.0625 0z"/></svg>
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}