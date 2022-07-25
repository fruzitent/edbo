import compose from '@shopify/react-compose'
import 'destyle.css'
import 'edbo/src/pages/_app.scss'
import { ServicesContextProvider } from 'edbo/src/services'
import { StoresContextProvider } from 'edbo/src/stores'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { AppProps } from 'next/app'

export { reportWebVitals } from 'next-axiom'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeError', NProgress.done)
Router.events.on('routeChangeComplete', NProgress.done)

type NextProps = AppProps & {
  Component: {
    theme?: string
  }
}

const App = (props: NextProps) => {
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
            forcedTheme={Component.theme}
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </StoresContextProvider>
      </ServicesContextProvider>
    </>
  )
}

export default compose(appWithTranslation)(App)
