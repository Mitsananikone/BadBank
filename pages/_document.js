import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css"/>
        <meta name="viewport" content="width=device-width"/>
      </Head>

      <body>

        <Main />
        <NextScript />
    

      </body>
    </Html>
  )
}
