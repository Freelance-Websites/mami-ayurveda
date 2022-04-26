import Head from 'next/head';
import Script from 'next/script';

export default function MainHead() {
  return (
    <Head>
      {/* Title */}
      <title>Mami Ayurveda</title>
      
      {/* Responsivenes */}
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      {/* Scripts */}
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </Head>
  );
}
