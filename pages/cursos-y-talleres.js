// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import CardsContainer from '../components/cards/Container';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/cursos-y-talleres.md";

export default function Courses() {
  const {
    pageTitle,
    heroTitle,
    heroDesktopImage,
    heroMobileImage,
    alimentationCourse,
    formationCourse,
    contactTitle,
    contactFormTitle,
    contactCTAs
  } = attributes;

  return (
    <Base title={pageTitle}>
      <Hero
        title={heroTitle}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={false}
        position="top"
      />
      <CardsContainer
        content={alimentationCourse}
        type="side-by-side"
        classes="
          py-4 sm:py-16 md:py-24 lg:py-32
        "
        id="taller-alimentacion-familiar-ayur"
      />
      <section
        className="
          bg-lime-50
          relative
          pb-8 sm:py-16 md:py-24 lg:py-32
        "
        id="formacion-ayurveda-cuerpo-mente"
      >
        <CardsContainer
          content={formationCourse}
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