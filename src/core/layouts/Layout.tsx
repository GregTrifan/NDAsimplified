import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import Link from "next/link"
const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "NDAsimplified"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={Routes.Home()} className="btn btn-ghost normal-case text-xl">
            NDAsimplified
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
    </>
  )
}

export default Layout
