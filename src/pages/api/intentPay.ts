import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_PRIV
const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2022-11-15",
})

export default async function intentPay(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { amount } = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      })
      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: { message: "Internal Server Error" } })
    }
  } else {
    res.status(405).json({ error: { message: "Method Not Allowed" } })
  }
}
