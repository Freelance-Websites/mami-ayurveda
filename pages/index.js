// Globals
import { useState, useEffect } from 'react';

// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import Sections from '../components/home/Sections';
import SocialMediaCallout from '../components/home/SocialMediaCallout';
import CardsContainer from '../components/cards/Container';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/home.md";

export default function Home() {
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
    sectionsTitle,
    sections,
    socialMediaTitle,
    socialMedia,
    highlightsTitle,
    highlights,
    contactTitle,
    contactFormTitle,
    contactCTAs
  } = attributes;
  const [activeHighlights, setActiveHighlights] = useState(highlights.slice(0,2));

  const cta = {
    link: heroCtaLink,
    text: heroCtaText,
    isExternal: false,
    isButton: false,
    theme: 'outline',
    classes: 'mt-2',
  };

  useEffect(() => {
    const shuffledHighlights = [...highlights].sort(() => 0.5 - Math.random());
    setActiveHighlights(shuffledHighlights.slice(0, 2));
  }, [highlights]);


  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription}>
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
        content={activeHighlights}
        backgroundColor='bg-orange-50'
      />
      <SocialMediaCallout
        title={socialMediaTitle}
        socialMedia={socialMedia}
      />
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
      />
    </Base>
  )
}
