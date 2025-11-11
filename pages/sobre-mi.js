// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import LongText from '../components/LongText';
import MyPractice from '../components/sobre-mi/MyPractice';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/sobre-mi.md";

export default function AboutMe() {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroTitle,
    heroDescription,
    heroDesktopImage,
    heroMobileImage,
    heroCtaLink,
    heroCtaText,
    aboutMeContent,
    myPracticeImage,
    myPracticeTitle,
    myPracticeContent,
    senses,
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
      <LongText
        content={aboutMeContent}
        id="about"
        bottomPadding="pb-8 sm:pb-16 md:pb-24 lg:pb-48"
        topPadding="pt-8 sm:pt-16 md:pt-24"
        classes="scroll-mt-12"
      />
      <MyPractice
        image={myPracticeImage}
        title={myPracticeTitle}
        content={myPracticeContent}
        senses={senses}
      />
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
      />
    </Base>
  )
}
