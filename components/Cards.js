// Components
import Card from './Card';

// Styles
import styles from './Cards.module.css';

export default function Cards({ title, content }) {
  return (
    <section
      className="
        container mx-auto
      "
    >
      {title &&
        <h4
          dangerouslySetInnerHTML={{ __html: title }}
          className={`
            ${styles.Title}
            font-serif text-slate-700 text-2xl md:text-4xl text-center
          `}
        />
      }
      <ul
        className="
          grid grid-cols-1 md:grid-cols-2 gap-4
          pt-6 md:pt-12 px-4
        "
      >
        {content.map((content, index) =>
          <Card
            key={index}
            card={content}
          />
        )}
      </ul>
    </section>
  );
}
