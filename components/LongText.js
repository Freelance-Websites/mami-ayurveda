// Styles
import styles from './LongText.module.css';

export default function LongText({ id, content, title, topPadding, bottomPadding }) {
  return (
    <article
      className={`
        container mx-auto
        ${topPadding}
        ${bottomPadding}
        px-4 md:px-12
      `}
      id={id ? id : undefined}
    >
      {title &&
        <h2
          dangerouslySetInnerHTML={{ __html: title }}
          className={`
            font-serif text-slate-700 text-2xl md:text-4xl mb-2 md:mb-4
            ${styles.Title}
          `}
        />
      }
      <section
        dangerouslySetInnerHTML={{ __html: content }}
        className={styles.Text}
      />
      <span id="mi-enfoque" />
    </article>
  );
}
