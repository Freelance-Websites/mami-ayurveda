// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import LongText from '../components/LongText';
import CardsContainer from '../components/cards/Container';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/membresia.md";

export default function Membership() {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroTitle,
    heroDescription,
    heroCtaOneText,
    heroCtaOneLink,
    heroCtaTwoText,
    heroCtaTwoLink,
    heroDesktopImage,
    heroMobileImage,
    aboutContent,
    aboutMeContent,
    ctaHeading,
    ctaDesktopImage,
    ctaMobileImage,
    ctaText,
    ctaLink,
    contactTitle,
    contactFormTitle,
    contactCTAs
  } = attributes;

  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription}>
      <Hero
        title={heroTitle}
        text={heroDescription}
        cta={[
          {
            text: heroCtaOneText,
            link: heroCtaOneLink,
            theme: 'solid',
            isExternal: true
          },
          {
            text: heroCtaTwoText,
            link: heroCtaTwoLink,
            theme: 'transparent',
            isExternal: false,
            icon: true
          }
        ]}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={false}
        position="top"
      />
      <LongText
        content={aboutContent}
        id="about"
        topPadding="pt-8 sm:pt-16 md:pt-24 lg:pt-32"
        bottomPadding="pb-8 sm:pb-16 md:pb-24 lg:pb-32"
        classes="scroll-mt-12"
      />
      <CTA
        heading={ctaHeading}
        desktopImage={ctaDesktopImage}
        mobileImage={ctaMobileImage}
        cta={{
          text: ctaText,
          link: ctaLink,
          theme: 'solid',
          isExternal: true
        }}
      />
      <section className='bg-slate-50 pt-8 sm:pt-12 md:-pt-16 lg:pt-24 pb-8 sm:pb-16 md:pb-24 lg:pb-32'>
        <CardsContainer
          content={aboutMeContent}
          type="side-by-side"
        />
      </section>
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
        type="courses"
      />
    </Base>
  )
}