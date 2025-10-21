// Globals
import Image from 'next/image';

// Components
import LongText from '../LongText';
import Senses from './Senses';

export default function MyPractice({ image, title, content, senses }) {
  return (
    <article
      className="bg-lime-50 relative"
    >
      <div
        className="
          relative max-w-md mx-auto h-72
          sm:-top-8 md:-top-16 lg:-top-24
        "
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
          src={image}
          alt={title}
          fill={true}
          style={{ objectFit: 'cover' }}
          className="md:rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <LongText
        title={title}
        content={content}
        topPadding="pt-8"
        bottomPadding="pb-4"
      />
      <Senses
        content={senses}
      />
    </article>
  );
}
