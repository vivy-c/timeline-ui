import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
      </Head>
      <body className="bg-[#050507] text-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

