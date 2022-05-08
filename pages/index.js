// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import Sections from '../components/home/Sections';
import Cards from '../components/Cards';

// Content
import { attributes } from "../content/home.md";

export default function Home() {
  const {
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    heroDesktopImage,
    heroMobileImage,
    sectionsTitle,
    sections,
    highlightsTitle,
    highlights
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
      <Sections
        title={sectionsTitle}
        sections={sections}
      />
      <Cards
        title={highlightsTitle}
        content={highlights}
      />
    </Base>
  )
}
