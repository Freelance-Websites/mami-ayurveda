// Components
import Base from '../../components/Base';
import Hero from '../../components/Hero';
import PostCard from '../../components/blog/PostCard';
import Contact from '../../components/Contact';

// Content (from CMS – content/blog.md)
import { attributes } from '../../content/blog.md';

import { getAllPosts } from '../../lib/blog';

export default function BlogIndex({ posts }) {
  const {
    pageTitle,
    metaTitle,
    metaDescription,
    heroTitle,
    heroDescription,
    heroDesktopImage,
    heroMobileImage,
    contactTitle,
    contactFormTitle,
    contactCTAs,
  } = attributes;

  return (
    <Base title={pageTitle} metaTitle={metaTitle} metaDescription={metaDescription}>
      <Hero
        title={heroTitle}
        text={heroDescription}
        desktopImage={heroDesktopImage}
        mobileImage={heroMobileImage}
        showForm={false}
      />
      <section className="container mx-auto px-4 md:px-12 pt-8 sm:pt-16 md:pt-24 pb-24 sm:pb-36 md:pb-52">
        {posts.length === 0 ? (
          <p className="font-serif text-slate-700 text-xl md:text-2xl text-center py-12">
            Pronto habrá entradas aquí.
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </section>
      <Contact
        title={contactTitle}
        subtitle={contactFormTitle}
        ctas={contactCTAs}
      />
    </Base>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
