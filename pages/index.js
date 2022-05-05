// Components
import Base from '../components/Base';
import Hero from '../components/Hero';

// Content Import
import { attributes } from "../content/home.md";

export default function Home() {
  const {
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    heroDesktopImage,
    heroMobileImage
  } = attributes;

  const cta = {
    link: heroCtaLink,
    text: heroCtaText,
    isExternal: false,
    isButton: false,
    theme: 'outline',
    classes: 'mt-2',
  };

  return (
    <Base>
      <Hero
        title={heroTitle}
        text={heroDescription}
        cta={cta}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={true}
      />
    </Base>
  )
}
