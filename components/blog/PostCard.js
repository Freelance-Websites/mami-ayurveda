import Link from 'next/link';
import Image from 'next/image';

export default function PostCard({ post }) {
  const { slug, title, date, description, image } = post;
  const formattedDate = date
    ? new Date(date).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <li className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:opacity-95 transition ease-in-out duration-200">
      <Link href={`/blog/${slug}/`} className="block">
        <div className="aspect-video relative">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 rounded-t-xl flex items-center justify-center">
              <span className="font-serif text-slate-400 text-2xl">Mami Ayurveda</span>
            </div>
          )}
        </div>
        <div className="p-4 md:p-5">
          {formattedDate && (
            <time className="uppercase text-orange-400 text-xs font-semibold tracking-wider">
              {formattedDate}
            </time>
          )}
          <h2 className="font-serif text-slate-700 text-xl md:text-2xl mt-1 mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-slate-500 text-base line-clamp-4">{description}</p>
          )}
          <span className="uppercase text-orange-400 text-xs font-semibold tracking-wider flex items-center mt-3">
            Leer más
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current ml-1 relative -top-px">
              <path d="M7.16406 0.21875L6.69531 0.6875C6.60156 0.804688 6.60156 0.96875 6.71875 1.08594L8.59375 2.89062H0.53125C0.367188 2.89062 0.25 3.03125 0.25 3.17188V3.82812C0.25 3.99219 0.367188 4.10938 0.53125 4.10938H8.59375L6.71875 5.9375C6.60156 6.05469 6.60156 6.21875 6.69531 6.33594L7.16406 6.80469C7.28125 6.89844 7.44531 6.89844 7.5625 6.80469L10.6562 3.71094C10.75 3.59375 10.75 3.42969 10.6562 3.3125L7.5625 0.21875C7.44531 0.125 7.28125 0.125 7.16406 0.21875Z" />
            </svg>
          </span>
        </div>
      </Link>
    </li>
  );
}
