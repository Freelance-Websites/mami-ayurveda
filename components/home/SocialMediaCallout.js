// Icons
import { FaInstagram, FaSpotify, FaYoutube, FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaWhatsapp, FaPinterest } from 'react-icons/fa';

// Styles
import styles from './SocialMediaCallout.module.css';

export default function SocialMediaCallout({ title, socialMedia }) {
  const getIcon = (platform) => {
    const iconSize = 60;
    
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <FaInstagram size={iconSize} />;
      case 'spotify':
        return <FaSpotify size={iconSize} />;
      case 'youtube':
        return <FaYoutube size={iconSize} />;
      case 'facebook':
        return <FaFacebook size={iconSize} />;
      case 'twitter':
        return <FaTwitter size={iconSize} />;
      case 'linkedin':
        return <FaLinkedin size={iconSize} />;
      case 'tiktok':
        return <FaTiktok size={iconSize} />;
      case 'whatsapp':
        return <FaWhatsapp size={iconSize} />;
      case 'pinterest':
        return <FaPinterest size={iconSize} />;
      default:
        return <FaInstagram size={iconSize} />;
    }
  };

  return (
    <section
      className="
        pt-16 sm:pt-24 md:pt-32 px-4
        text-center
      "
    >
      <div className='container mx-auto'>

        <h3
          dangerouslySetInnerHTML={{ __html: title }}
          className={`
            ${styles.Title}
            font-serif text-slate-700 text-2xl md:text-4xl
          `}
        />
        <ul
          className="
            grid grid-cols-1 md:grid-cols-3 gap-4
            pt-12 md:pt-16
            relative z-10 -bottom-4
          "
        >
          {socialMedia && socialMedia.map((item, index) => (
            <li key={index}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-white shadow-lg hover:bg-orange-50
                  border border-gray-100
                  rounded-lg md:rounded-none
                  transition duration-300 ease-in-out
                  py-8 md:py-24
                  flex flex-col items-center justify-center
                  block
                "
              >
                <div className="text-orange-400">
                  {getIcon(item.platform)}
                </div>
                <p className="mt-4 uppercase text-slate-700 text-xs font-semibold tracking-wider">
                  {item.text}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
