import type { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";

const Document: NextPage = () => (
  <Html>
    <Head lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <meta
        name="description"
        content="A fully customizable password generator"
      />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
