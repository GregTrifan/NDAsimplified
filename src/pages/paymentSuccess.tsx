import { BlitzPage } from "@blitzjs/next"
import Link from "next/link"
import React from "react"

const PaymentSuccessPage: BlitzPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Payment Successful</h1>
      <p className="text-gray-700 mb-8">
        Thank you for your purchase! We have sent a confirmation email to your email address.
      </p>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Go back to home page
      </Link>
    </div>
  )
}

export default PaymentSuccessPage
