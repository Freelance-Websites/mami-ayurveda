// Components
import Base from '../../components/Base';
import Hero from '../../components/Hero';
import Contact from '../../components/Contact';
import { getPostBySlug, getAllPostSlugs } from '../../lib/blog';
import blogStyles from '../../components/blog/BlogPost.module.css';

const BLOG_POST_CONTACT = {
  contactTitle: '¡Estemos en contacto!',
  contactFormTitle: 'Dejame tu consulta',
  contactCTAs: [
    { text: 'Sacá un turno', link: '/turnos/' },
    { text: 'Seguime en Instagram', link: 'https://www.instagram.com/mami.ayurveda' },
  ],
};

export default function BlogPost({ post }) {
  if (!post) return null;

  const { title, date, description, image, body } = post;
  const formattedDate = date
    ? new Date(date).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Base
      title={title}
      metaTitle={`${title} • Mami Ayurveda`}
      metaDescription={description || undefined}
    >
      <Hero
        title={title}
        text={formattedDate ? `<time>${formattedDate}</time>` : undefined}
        desktopImage={image || '/images/uploads/bg/homepage-desktop.jpg'}
        mobileImage={image || '/images/uploads/bg/homepage-mobile.jpg'}
        showForm={false}
      />
      <article className="container mx-auto px-4 md:px-12 pt-8 sm:pt-16 md:pt-24 pb-8 md:pb-16 lg:pb-48">
        <div
          className={`max-w-3xl mx-auto ${blogStyles.body}`}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </article>
      <Contact
        title={BLOG_POST_CONTACT.contactTitle}
        subtitle={BLOG_POST_CONTACT.contactFormTitle}
        ctas={BLOG_POST_CONTACT.contactCTAs}
      />
    </Base>
  );
}

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  const { unified } = await import('unified');
  const remarkParse = (await import('remark-parse')).default;
  const remarkRehype = (await import('remark-rehype')).default;
  const rehypeRaw = (await import('rehype-raw')).default;
  const rehypeStringify = (await import('rehype-stringify')).default;
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(post.body);
  post.body = processed.toString();
  return { props: { post } };
}
