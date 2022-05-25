// Globals
import { useState } from 'react';

// Styles
import styles from './Panels.module.css';

export default function Panels({ titles, content}) {
  const [isActive, setIsActive] = useState();

  return (
    <article
      className="
        relative -top-6 md:-top-8
        container mx-auto
        px-4 md:px-12 2xl:px-0
        z-10
      "
    >
      <h2 className="font-serif text-xl md:text-2xl text-slate-700 text-left mt-12 md:mt-16 mb-4">¿Qui&eacute;nes pueden atenderse?</h2>
      {titles.map((title, index) =>
        <Panel
          title={title}
          key={index}
          index={index}
          content={content}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      )}
    </article>
  );
}

export const Panel = ({ title, content, index, isActive, setIsActive }) => {
  return (
    <section
      className="bg-white rounded-lg mb-4 shadow-lg shadow-gray-400/20"
    >
      <button
        className="p-4 flex items-center justify-between w-full hover:opacity-80 transition duration-200 ease-in-out"
        onClick={() => isActive !== index ? setIsActive(index) : setIsActive(undefined)}
      >
        <span
          dangerouslySetInnerHTML={{ __html: title }}
          className="font-serif text-xl md:text-2xl text-slate-700 text-left"
        />
        <svg
          viewBox="0 0 25 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            fill-current text-slate-400 w-4 transform
            ${isActive === index ? 'rotate-180' : ''}
          `}
        >
          <path d="M24.1172 1.86719L23.0781 0.773438C22.8047 0.554688 22.3672 0.554688 22.1484 0.773438L12.1953 10.6719L2.29688 0.773438C2.07812 0.554688 1.64062 0.554688 1.36719 0.773438L0.328125 1.86719C0.0546875 2.14062 0.0546875 2.52344 0.328125 2.79688L11.7578 14.2812C12.0312 14.5 12.4141 14.5 12.6875 14.2812L24.1172 2.79688C24.3906 2.52344 24.3906 2.14062 24.1172 1.86719Z" />
        </svg>
      </button>
      <PanelContent
        content={content[index]}
        isActive={isActive}
        index={index}
      />
    </section>
  )
}

export const PanelContent = ({ content, isActive, index }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content}}
      className={`
        ${styles.Container}
        px-4 pb-4 text-lg md:text-xl text-slate-500 font-serif
        ${isActive === index ? 'block' : 'hidden'}
      `}
    />
  )
}