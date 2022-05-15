// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import CardsContainer from '../components/Cards/Container';

// Content
import { attributes } from "../content/cursos-y-talleres.md";

export default function Courses() {
  const {
    pageTitle,
    heroTitle,
    heroDesktopImage,
    heroMobileImage,
    alimentationCourse,
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
      />
    </Base>
  )
}