// Components
import Base from '../components/Base';
import Contact from '../components/Contact';

// Content
import { attributes } from "../content/exito.md";

export default function Success() {
  const {
    pageTitle,
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
    <Base title={pageTitle}>
      <Contact
        title={heroTitle}
        text={heroDescription}
        ctas={cta}
        type="success"
      />
    </Base>
  )
}
