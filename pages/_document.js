import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" style={{width: '100%'}} >
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css"/>

      </Head>

      <body >

        <Main />
        <NextScript />
    

      </body>
    </Html>
  )
}
