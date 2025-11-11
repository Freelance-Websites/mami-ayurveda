// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import CardsContainer from '../components/cards/Container';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/ebooks.md";
import { slugify } from '../lib/products';

export default function Ebooks() {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    heroDesktopImage,
    heroMobileImage,
    ebooksTitle,
    ebooksText,
    ebooksList,
    contactTitle,
    contactFormTitle,
    contactCTAs
  } = attributes;

  // Map ebooks to include checkout URLs
  const ebooksWithCheckoutLinks = ebooksList.map(ebook => ({
    ...ebook,
    linkUrl: `/checkout/ebooks/${slugify(ebook.title)}`,
  }));

  const cta = {
    link: heroCtaLink,
    text: heroCtaText,
    isExternal: false,
    isButton: false,
    theme: 'outline',
    classes: 'mt-2',
  };

  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription} classes="bg-slate-50">
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
          pt-8 sm:pt-16 md:pt-24
        "
        id="details"
      >
        <CardsContainer
          content={ebooksWithCheckoutLinks}
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
