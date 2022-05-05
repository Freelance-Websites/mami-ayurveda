// Component Import
import Button from './Button';

export default function Hero({ title, text, cta, image }) {

  return (
    <section
      className="
        p-4 md:p-12
        bg-cover bg-no-repeat
        relative
      "
      style={{ backgroundImage: `url(${image})`}}
    >
      <div
        className="absolute w-full h-full bg-gray-800/40 top-0 left-0 mix-blend-multiply"
      />
      <article
        className="container mx-auto relative"
      >
        <div className="max-w-lg">
          <h1
            className="text-white font-serif text-3xl md:text-4xl"
          >
            {title}
          </h1>
          <p
            className="my-2 text-white"
            dangerouslySetInnerHTML={{ __html: text}}
          />
          {cta &&
            <Button
              cta={cta}
            />
          }
        </div>
      </article>
    </section>
  );
}
