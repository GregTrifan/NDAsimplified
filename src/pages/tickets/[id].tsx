import { BlitzPage } from "@blitzjs/next"
import { GetServerSideProps } from "next"
import React from "react"
import Layout from "src/core/layouts/Layout"
import { Ticket } from "types/Ticket"
import { supabase } from "src/supabase/client"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { faPaypal } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TbBrandCoinbase } from "react-icons/tb"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB ?? "")

const TicketPage: BlitzPage = ({ ticket }: { ticket?: Ticket | null }) => {
  if (ticket?.id)
    return (
      <Layout
        title={ticket.title ?? "Ticket"}
        backgroundStyle="bg-gradient-to-tr from-cyan-200 from-10% via-emerald-200 via-30% to-cyan-300"
      >
        <h1 className="my-4 text-center text-3xl font-extrabold">Buy Ticket</h1>
        <div className="w-full mx-auto px-4">
          <div className="flex flex-col md:items-center justify-between py-4 gap-4">
            <div className="w-full flex-grow md:w-1/2 mx-auto md:mx-0 mb-4 md:mb-0">
              <div className="bg-white shadow-md rounded-md overflow-hidden">
                <div className="p-4">
                  <h2 className="font-bold text-xl mb-2">{ticket.title}</h2>
                  <p className="text-gray-700 text-base">{ticket.description}</p>
                  <div className="flex grow justify-between items-center mt-4">
                    <div>
                      <p className="font-bold text-lg">${ticket.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-base">
                        {ticket.startDate} - {ticket.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-white shadow-md rounded-md overflow-hidden p-4">
                <h2 className="font-bold text-xl mb-2">Payment</h2>
                <div className="flex flex-col space-y-4">
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Your Email</span>
                    </label>
                    <label className="input-group">
                      <span>Email</span>
                      <input
                        type="text"
                        placeholder="info@site.com"
                        className="input input-bordered w-full"
                      />
                    </label>
                  </div>
                  <div>
                    <Elements
                      stripe={stripePromise}
                      options={{ mode: "payment", currency: "usd", amount: ticket?.price ?? 0 }}
                    >
                      <PaymentElement />
                      <button className="btn btn-primary w-full my-3">Pay</button>
                    </Elements>
                  </div>
                  <p className="mx-auto">OR</p>
                  <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between">
                    <button className="btn btn-secondary grow flex gap-2 mb-4 md:mr-4 md:mb-0">
                      Pay with
                      <FontAwesomeIcon icon={faPaypal} className="h-4" />
                    </button>
                    <button className="btn bg-blue-700 hover:bg-blue-800 grow flex gap-2">
                      Pay with
                      <TbBrandCoinbase />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  return (
    <Layout title="Not found">
      <h1 className="text-4xl text-center my-4">Ticket not found</h1>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{ ticket: Ticket | null }> = async (ctx) => {
  const { id } = ctx.query
  try {
    //@ts-ignore again going nuts
    let { data } = await supabase.from("tickets").select("*").eq("id", Number(id)).limit(1)
    const ticket = data![0] as Ticket
    return {
      props: {
        ticket,
      },
    }
  } catch {
    return {
      props: {
        ticket: null,
      },
    }
  }
}

export default TicketPage
