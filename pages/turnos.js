// Components
import Base from '../components/Base';
import Hero from '../components/Hero';
import Panels from '../components/turnos/Panels';
import Contact from '../components/Contact';

// Library
import { getTurnosData } from '../lib/turnos';

// Content
import { attributes } from "../content/turnos.md";

export default function Turnos({ turnosData }) {
  const {
    pageTitle,
    heroTitle,
    heroDesktopImage,
    heroMobileImage,
    contactTitle,
    contactText,
  } = attributes;

  // To get the markup and gather the information I need for the collapsible panels
  const markup = turnosData.contentHtml.replaceAll("&#x3C;", "<");
  const titles = [];
  const indexes = [];
  const content = [];

  // This function stores the titles and their corresponding indexes in different arrays
  markup.match(/<h2>(.*?)<\/h2>/g).map(title => {
    titles.push(title);
    indexes.push(markup.indexOf(title))
  });
  
  // This function loops through the title indexes and get the content between them
  indexes.map((titleIndex, index) => {
    content.push(markup.slice(titleIndex, indexes[index + 1]));
  })

  return (
    <Base title={pageTitle} classes="bg-slate-50">
      <Hero
        title={heroTitle}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={false}
        position="top"
      />
      <Panels
        titles={titles}
        content={content}
      />
      <Contact
        title={contactTitle}
        text={contactText}
        type="appointments"
      />
    </Base>
  )
}

export async function getStaticProps() {
  const turnosData = await getTurnosData();

  return {
    props: {
      turnosData,
    }
  }
}