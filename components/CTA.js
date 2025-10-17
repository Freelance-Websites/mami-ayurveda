import Button from './forms/Button';

export default function CTA({ heading, cta, classes }) {
  return (
    <section
      className={`
        ${classes ? classes : ''}
        bg-white py-8 md:py-12 lg:py-16 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-col text-center gap-4 z-10 rounded-xl md:rounded-2xl shadow-lg
      `}
    >
      <h2
        className="font-serif text-slate-700 text-2xl md:text-4xl text-center px-4"
        dangerouslySetInnerHTML={{ __html: heading }}
      />
        {cta && (
          <Button
            cta={cta}
          />
        )}
    </section>
  );
}