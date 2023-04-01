import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap');
        </style>
        <meta
          name="description"
          content="MindWell | Better Mind, Better Life"
        />
        <link rel="canonical" href="https://mindwell.site" />
        <meta property="og:url" content="https://mindwell.site" />
        <meta property="og:title" content="MindWell | Better Mind, Better Life" />
        <meta
          property="og:description"
          content="MindWell | Better Mind, Better Life"
        />
        <meta
          property="og:image"
          content="https://mindwell.site/images/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="MindWell | Better Mind, Better Life"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mindwell.site" />
        <meta name="twitter:creator" content="@mindwell.site" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
