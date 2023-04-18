import { useState } from "react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Auth } from "@supabase/auth-ui-react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "src/supabase/types"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
const AuthPage: BlitzPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const supabaseClient = useSupabaseClient<Database>()

  return (
    <Layout title="Auth">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 py-auto max-w-5xl mx-auto">
        <div className="shadow-xl rounded-lg shadow-emerald-400/50 p-3 my-24">
          <h1 className="text-3xl text-center">NDASimple</h1>
          <Auth
            redirectTo="/"
            supabaseClient={supabaseClient}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
            }}
            socialLayout="horizontal"
          />
        </div>
      </div>
    </Layout>
  )
}
export default AuthPage
