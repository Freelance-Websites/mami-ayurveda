// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import CardsContainer from '../components/cards/Container';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/cursos-y-talleres.md";
import { slugify } from '../lib/products';

export default function Courses() {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroTitle,
    heroDesktopImage,
    heroMobileImage,
    alimentationCourse,
    contactTitle,
    contactFormTitle,
    contactCTAs
  } = attributes;

  // Map courses to include checkout URLs
  const coursesWithCheckoutLinks = alimentationCourse.map(course => {
    const slug = slugify(course.title);
    return {
      ...course,
      ctas: course.ctas?.map(cta => {
        // Only update the "Comprar curso" button, leave other CTAs unchanged
        if (cta.ctaText && cta.ctaText.toLowerCase().includes('comprar')) {
          return {
            ...cta,
            ctaUrl: `/checkout/cursos-y-talleres/${slug}`,
          };
        }
        return cta;
      }) || [],
    };
  });

  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription}>
      <Hero
        title={heroTitle}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={false}
        position="top"
      />
      <CardsContainer
        content={coursesWithCheckoutLinks}
        type="side-by-side"
        classes="
          py-4 sm:py-16 md:py-24 lg:py-32
        "
        id="taller-alimentacion-familiar-ayur"
      />
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
        type="courses"
      />
    </Base>
  )
}