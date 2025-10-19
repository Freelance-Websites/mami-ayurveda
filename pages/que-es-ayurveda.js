// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import Doshas from '../components/que-es-ayurveda/Doshas';
import CardsContainer from '../components/cards/Container';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/que-es-ayurveda.md";

export default function Ayurveda() {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroDesktopImage,
    heroMobileImage,
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    doshasTitle,
    doshasText,
    doshas,
    testDoshas,
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
    icon: true
  };

  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription}>
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
      <section
        className="
          bg-lime-50
          relative md:-top-32
          mt-12 sm:mt-0 sm:pt-24 md:pt-32 lg:pt-48
        "
        id="conoce-tus-doshas"
      >
        <CardsContainer
          content={testDoshas}
          type="side-by-side"
          classes="
            pt-4 sm:pt-16 md:pt-24 lg:pt-32
            pb-0 lg:pb-16
          "
        />
        <CardsContainer
          title={highlightsTitle}
          content={highlights}
          type="standard"
          backgroundColor='bg-slate-50'
        />
      </section>
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
      />
    </Base>
  )
}
