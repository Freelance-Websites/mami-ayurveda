// Components
import Card from './Card';
import SideBySide from './SideBySide';

// Styles
import styles from './Container.module.css';

export default function CardsContainer({ type, title, text, content, classes, id }) {
  return (
    <section
      className={`
        container mx-auto relative z-10
        ${classes ? classes : undefined}
      `}
      id={id ? id : undefined}
    >
      {title &&
        <h4
          dangerouslySetInnerHTML={{ __html: title }}
          className={`
            ${styles.Title}
            font-serif text-slate-700 text-2xl md:text-4xl text-center px-4
          `}
        />
      }
      {text &&
        <p
          className="text-slate-500 mt-4 max-w-md mx-auto text-center px-4"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      }
      <ul
        className={`
          grid grid-cols-1 gap-4
          ${type === 'standard' ? 'md:grid-cols-2' : ''}
          pt-6 md:pt-12 px-4
        `}
      >
        {content.map((content, index) => 
          type === 'standard' ?
            <Card
              key={index}
              card={content}
            />
          :
            <SideBySide
              key={index}
              card={content}
            />
        )}
      </ul>
    </section>
  );
}
