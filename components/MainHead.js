import Head from 'next/head';
import Script from 'next/script';

export default function MainHead({ title, metaTitle, metaDescription }) {
  // Use metaTitle if provided, otherwise fall back to title
  const seoTitle = metaTitle || title;
  const formattedTitle = seoTitle ? `${seoTitle} • Mami Ayurveda` : 'Mami Ayurveda';
  
  return (
    <>
      <Head>
        {/* Title */}
        <title>{formattedTitle}</title>

        {/* SEO Meta Tags */}
        {metaDescription && <meta name="description" content={metaDescription} />}
        <meta name="google-site-verification" content="G07AsobRPJgQvIZZ1Iv-U9hdorJVZuaok7teXPL--rc" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={formattedTitle} />
        {metaDescription && <meta property="og:description" content={metaDescription} />}
        <meta property="og:type" content="website" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={formattedTitle} />
        {metaDescription && <meta name="twitter:description" content={metaDescription} />}

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffa112" />
        <meta name="msapplication-TileColor" content="#ffa112" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Responsivenes */}
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </>
  );
}
