// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import Sections from '../components/home/Sections';
import CardsContainer from '../components/Cards/Container';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/home.md";

export default function Home() {
  const {
    pageTitle,
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    heroDesktopImage,
    heroMobileImage,
    sectionsTitle,
    sections,
    highlightsTitle,
    highlights,
    contactTitle,
    contactFormTitle,
    contactCTAs
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
    <Base title={pageTitle}>
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
      <CardsContainer
        title={highlightsTitle}
        type="standard"
        content={highlights}
      />
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
      />
    </Base>
  )
}
