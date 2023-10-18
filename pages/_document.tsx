import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta name="description" content="Find your study mate online." />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

      {/*eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://8x8.vc/vpaas-magic-cookie-224b35e3518242828587c97247bc13c2/external_api.js" />
<title>FindAlly</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
