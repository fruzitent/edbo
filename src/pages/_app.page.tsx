import compose from '@shopify/react-compose'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { ServicesContextProvider } from 'src/services'
import { StoresContextProvider } from 'src/stores'

import './_app.scss'

import type { AppProps as _AppProps } from 'next/app'

export { reportWebVitals } from 'src/utils/reportWebVitals'

type AppProps = _AppProps & {
  Component: {
    theme?: string
  }
}

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

      <ServicesContextProvider>
        <StoresContextProvider>
          <ThemeProvider
            defaultTheme={'system'}
            disableTransitionOnChange
            forcedTheme={Component.theme || null}
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </StoresContextProvider>
      </ServicesContextProvider>
    </>
  )
}

export default compose(appWithTranslation)(App)
