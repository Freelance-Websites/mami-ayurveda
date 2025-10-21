// Globals
import Image from 'next/image';

// Components
import Button from '../forms/Button';

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
      <div
        className={`${card.alignment && card.alignment === 'izquierda' && 'order-last'}`}
      >
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
            text-slate-500 mt-2 lg:max-w-xl
            ${styles.Text}
          `}
        />
        {card.features && card.features.length > 0 &&
          <ul
            className="mt-4 text-slate-500"
          >
            {card.features.map((feature, index) =>
              <li
                key={index}
                className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4"
              >
                <div
                  className={`${card.features.length > 1 ? 'bg-white' : 'bg-emerald-100/50'} text-emerald-700 rounded-full w-12 h-12 inline-flex items-center justify-center`}
                >
                  <svg fill="none" height="13" viewBox="0 0 18 13" width="18" xmlns="http://www.w3.org/2000/svg" className="fill-current text-inherit"><path d="m15.293.203125-9.24612 9.246095-3.375-3.41016c-.17579-.14062-.45704-.14062-.59766 0l-1.01953 1.01953c-.140628.14063-.140628.42188 0 .59766l4.71093 4.67575c.17579.1758.42188.1758.59766 0l10.54692-10.54684c.1406-.14063.1406-.42188 0-.59766l-1.0196-.984375c-.1406-.1757812-.4218-.1757812-.5976 0z"/></svg>
                </div>
                <p
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: feature.featureText }}
                />
              </li>
            )}
          </ul>
        }
        {card.ctas && card.ctas.length > 0 &&
          <ol
            className="flex pt-4"
          >
            {card.ctas.map((cta, index) => {
              // Check if URL is truly external (starts with http:// or https://)
              const isExternalUrl = cta.ctaUrl && (cta.ctaUrl.startsWith('http://') || cta.ctaUrl.startsWith('https://'));
              
              return (
                <li
                  key={index}
                >
                  <Button
                    cta={{
                      isExternal: isExternalUrl,
                      isButton: false,
                      icon: index === 0 ? true : false,
                      link: cta.ctaUrl,
                      text: cta.ctaText,
                      theme: index === 0 ? 'solid' : 'transparent',
                      classes: index === 0 ? undefined : 'text-slate-500 ml-4'
                    }}
                  />
                </li>
              );
            })}
          </ol>
        }
      </div>
      <div
        className={`
          relative h-48 md:h-96
          ${card.alignment && card.alignment === 'izquierda' ? 'order-first' : 'order-first lg:order-last'}
        `}
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
