// Globals
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import Button from './forms/Button';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

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
                  className="uppercase text-slate-700 text-xs font-semibold tracking-wider transition ease-in-out duration-200 hover:text-slate-600"
                >
                  E-books
                </a>
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                href="/cursos-y-talleres"
              >
                <a
                  className="uppercase text-slate-700 text-xs font-semibold tracking-wider transition ease-in-out duration-200 hover:text-slate-600"
                >
                  Cursos y talleres
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
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
            href="/sobre-mi#my-practice"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
            href="/cursos-y-talleres"
          >
            <a
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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
              className="font-serif font-light text-3xl leading-normal leading-none leading-tight md:text-6xl text-slate-700 group-hover:text-orange-400 transition ease-in-out duration-200 leading-loose relative"
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