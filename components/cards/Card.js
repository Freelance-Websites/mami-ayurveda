// Globals
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import PdfDownloadPopup from '../PdfDownloadPopup';

export default function Card({ card }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handlePdfClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const isPdfDownload = card.linkUrl && card.linkUrl.includes('.pdf');

  const content = 
    <>
      <div
        className="h-48 md:h-64 relative"
      >
        <Image
          src={card.image}
          alt={card.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
        {card.icon &&
          <div
            className="bg-orange-400 absolute w-12 h-12 rounded-full flex items-center justify-center left-4 -bottom-4"
          >
            <Image
              src={card.icon}
              alt={card.title}
              width={32}
              height={32}
            />
          </div>
        }
      </div>
      <div className="p-4">
        {card.title &&
          <h5 className="font-serif text-slate-700 text-xl md:text-2xl">{card.title}</h5>
        }
        {card.text &&
          <p
            className={`
              text-slate-500 mt-2
              ${card.linkText ? 'mb-4' : undefined}
            `}
          >
            {card.text}
          </p>
        }
        {card.linkText &&
          <span className="uppercase text-orange-400 text-xs font-semibold tracking-wider flex items-center">
            {card.linkText}
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current ml-1 relative -top-px">
              <path d="M7.16406 0.21875L6.69531 0.6875C6.60156 0.804688 6.60156 0.96875 6.71875 1.08594L8.59375 2.89062H0.53125C0.367188 2.89062 0.25 3.03125 0.25 3.17188V3.82812C0.25 3.99219 0.367188 4.10938 0.53125 4.10938H8.59375L6.71875 5.9375C6.60156 6.05469 6.60156 6.21875 6.69531 6.33594L7.16406 6.80469C7.28125 6.89844 7.44531 6.89844 7.5625 6.80469L10.6562 3.71094C10.75 3.59375 10.75 3.42969 10.6562 3.3125L7.5625 0.21875C7.44531 0.125 7.28125 0.125 7.16406 0.21875Z" />
            </svg>
          </span>
        }
      </div>
    </>;
  return (
    <>
      <li
        className="
          rounded-xl
          border border-gray-100
          bg-white
        "
      >
        {card.linkUrl && !card.linkUrl.includes('http') && !isPdfDownload ?
          <Link href={card.linkUrl} className="hover:opacity-90 transition ease-in-out duration-200">
            {content}
          </Link>
        : isPdfDownload ?
          <button
            onClick={handlePdfClick}
            className="hover:opacity-90 transition ease-in-out duration-200 w-full text-left"
          >
            {content}
          </button>
        :
          <a
            className="hover:opacity-90 transition ease-in-out duration-200"
            target="_blank"
            rel="noopener noreferrer"
            href={card.linkUrl}
          >
            {content}
          </a>
        }
      </li>

      {/* PDF Download Popup */}
      {isPdfDownload && (
        <PdfDownloadPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          pdfUrl={card.linkUrl}
          title={card.title || "Descarga el PDF"}
        />
      )}
    </>
  );
}
