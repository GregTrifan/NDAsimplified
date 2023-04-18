import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import Link from "next/link"
const Layout: BlitzLayout<{
  title?: string
  backgroundStyle?: string
  children?: React.ReactNode
}> = ({ title, backgroundStyle, children }) => {
  return (
    <>
      <Head>
        <title>{title || "NDASimple"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`min-h-screen ${backgroundStyle}`}>
        <div className="navbar bg-base-100 shadow-xl">
          <div className="flex-1">
            <Link href={Routes.Home()} className="btn btn-ghost normal-case text-xl font-black">
              NDASimple
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li className="btn btn-primary">
                <Link
                  href={
                    //@ts-ignore Dumb path generation
                    Routes.AuthPage()
                  }
                >
                  Login/Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
      <footer className="footer items-center p-4 bg-emerald-900 text-neutral-content mt-auto">
        <div className="items-center grid-flow-col">
          <p>Copyright © 2023 - All right reserved</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
