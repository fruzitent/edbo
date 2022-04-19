import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head>
      <link href={'/favicon.ico'} rel={'apple-touch-icon'} />
      <link href={'/favicon.ico'} rel={'icon'} />
      <link href={'/manifest.json'} rel={'manifest'} />
      <meta charSet={'UTF-8'} />
      <meta content={'ie=edge'} httpEquiv={'X-UA-Compatible'} />
      <meta
        content={'black'}
        media={'(prefers-color-scheme: dark)'}
        name={'apple-mobile-web-app-status-bar'}
      />
      <meta
        content={'white'}
        media={'(prefers-color-scheme: light)'}
        name={'apple-mobile-web-app-status-bar'}
      />
      <meta
        content={'black'}
        media={'(prefers-color-scheme: dark)'}
        name={'theme-color'}
      />
      <meta
        content={'white'}
        media={'(prefers-color-scheme: light)'}
        name={'theme-color'}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
