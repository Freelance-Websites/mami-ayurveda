// Components
import Base from '../components/Base';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/exito.md";

export default function Success() {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroTitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
  } = attributes;

  const cta = [{
    link: heroCtaLink,
    text: heroCtaText,
    isExternal: false,
    isButton: false,
    theme: 'outline',
    classes: 'mt-2',
  }];

  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription}>
      <Contact
        title={heroTitle}
        text={heroDescription}
        ctas={cta}
        type="success"
      />
    </Base>
  )
}
