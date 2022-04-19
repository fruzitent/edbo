import compose from '@shopify/react-compose'
import Head from 'next/head'

import './_app.scss'

import type { AppProps } from 'next/app'

export { reportWebVitals } from 'src/utils/reportWebVitals'

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <>
      <Head>
        <meta
          content={'width=device-width, initial-scale=1.0'}
          name={'viewport'}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default compose()(App)
