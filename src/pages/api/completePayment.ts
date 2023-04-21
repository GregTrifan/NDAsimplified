import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import nodemailer from "nodemailer"
import { supabase } from "src/supabase/client"
import { Ticket } from "types/Ticket"

const stripeSecretKey = process.env.STRIPE_PRIV
const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2022-11-15",
})

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

export default async function completePayment(req: NextApiRequest, res: NextApiResponse) {
  const { paymentId, email, ticketId } = req.body

  try {
    // Retrieve the payment intent object from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId?.toString() ?? "")
    let { data } = await supabase.from("tickets").select("*").eq("id", Number(ticketId)).limit(1)
    const ticket = data![0] as Ticket

    if (paymentIntent.status === "succeeded") {
      // If payment was successful, send a confirmation email
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Payment confirmation",
        text: `Dear ${email},

Thank you for your purchase of ${ticket.title} ticket! We are excited to have you join us.

We are pleased to confirm that your payment of ${paymentIntent.amount / 100} ${
          paymentIntent.currency
        } has been received and your ticket is now booked.

Here are the details of your booking:
Ticket ID: ${ticket.id}
Title: ${ticket.title}
Price: ${ticket.price}

Please bring a copy of this email and a valid ID to the event for check-in.

If you have any questions or concerns, please do not hesitate to contact us at support@example.com.

Thank you for choosing our service.

Best regards,
NDASimple Team
`,
      }

      await transporter.sendMail(mailOptions)

      res.status(200).json({ message: "Confirmation email sent" })
    } else {
      res.status(400).json({ message: "Payment not successful" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error sending confirmation email" })
  }
}
