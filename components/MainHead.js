import Head from 'next/head';
import Script from 'next/script';

export default function MainHead({ title }) {
  const formattedTitle = title ? `${title} • Mami Ayurveda` : 'Mami Ayurveda';
  return (
    <>
      <Head>
        {/* Title */}
        <title>{formattedTitle}</title>

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
