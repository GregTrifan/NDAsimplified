import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { Database } from "src/supabase/types"
import "app/core/styles/index.css"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <ErrorComponent
      statusCode={(error as any)?.statusCode || 400}
      title={error.message || error.name}
    />
  )
}

function MyApp({ Component, pageProps }: AppProps<any>) {
  const getLayout = Component.getLayout || ((page) => page)
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        {getLayout(<Component {...pageProps} />)}
      </SessionContextProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
