// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import CardsContainer from '../components/ards/Container';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/ebooks.md";

export default function Ebooks() {
  const {
    pageTitle,
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    heroDesktopImage,
    heroMobileImage,
    ebooksTitle,
    ebooksText,
    ebooks,
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
    <Base title={pageTitle} classes="bg-slate-50">
      <Hero
        title={heroTitle}
        text={heroDescription}
        cta={cta}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={false}
      />
      <section
        className="
          container mx-auto relative z-10
          pt-16 sm:pt-24 md:pt-32 lg:pt-48
        "
        id="details"
      >
        <CardsContainer
          content={ebooks}
          type="standard"
          title={ebooksTitle}
          text={ebooksText}
          classes="
            md:pt-0
            pb-0 lg:pb-16
          "
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
