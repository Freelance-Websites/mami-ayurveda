import Image from 'next/image';
import Button from './forms/Button';

export default function CTA({ heading, cta, classes, desktopImage, mobileImage }) {
  return (
    <section
      className={`
        ${classes ? classes : ''}
        relative py-16 md:py-24 lg:py-32
      `}
    >
      {/* Desktop image */}
      {desktopImage && (
        <div
          className={`
            absolute top-0 left-0 w-full h-full
            ${mobileImage && 'hidden md:block'}
          `}
        >
          <Image
            src={desktopImage}
            layout="fill"
            objectFit="cover"
            alt={heading}
            objectPosition="center"
          />
        </div>
      )}
      {/* Mobile image */}
      {mobileImage &&
        <div
          className="absolute top-0 left-0 w-full h-full md:hidden"
        >
          <Image
            src={mobileImage}
            layout="fill"
            objectFit="cover"
            alt={heading}
            objectPosition="center"
          />
        </div>
      }
      {/* Gradient */}
      <div
        className="absolute w-full h-full bg-gray-800/40 top-0 left-0 mix-blend-multiply"
      />
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-col text-center gap-4 z-10">
        <h2
          className="font-serif text-white text-2xl md:text-4xl text-center"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
        {cta && (
          <Button
            cta={cta}
          />
        )}
      </div>
    </section>
  );
}