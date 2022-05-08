// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import Doshas from '../components/que-es-ayurveda/Doshas';
import Cards from '../components/Cards';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/que-es-ayurveda.md";

export default function Ayurveda() {
  const {
    pageTitle,
    heroDesktopImage,
    heroMobileImage,
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    doshasTitle,
    doshasText,
    doshas
  } = attributes;

  const cta = {
    link: heroCtaLink,
    text: heroCtaText,
    isExternal: false,
    isButton: false,
    theme: 'outline',
    classes: 'mt-2',
    icon: true
  };

  return (
    <Base title={pageTitle}>
      <Hero
        title={heroTitle}
        text={heroDescription}
        cta={cta}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={false}
      />
      <Doshas
        title={doshasTitle}
        text={doshasText}
        doshas={doshas}
      />
      {/* <Sections
        title={sectionsTitle}
        sections={sections}
      />
      <Cards
        title={highlightsTitle}
        content={highlights}
      />
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
      /> */}
    </Base>
  )
}
