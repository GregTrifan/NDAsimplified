import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import sgMail from "@sendgrid/mail"
import { supabase } from "src/supabase/client"
import { Ticket } from "types/Ticket"

const stripeSecretKey = process.env.STRIPE_PRIV
const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2022-11-15",
})

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function completePayment(req: NextApiRequest, res: NextApiResponse) {
  const { paymentId, email, ticketId } = req.body

  try {
    // Retrieve the payment intent object from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId?.toString() ?? "")
    let { data } = await supabase.from("tickets").select("*").eq("id", Number(ticketId)).limit(1)
    const ticket = data![0] as Ticket

    if (paymentIntent.status === "succeeded") {
      // If payment was successful, send a confirmation email
      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: "Payment confirmation",
        text: `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Styling for email body */
      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        background-color: #f2f2f2;
        padding: 20px;
      }

      /* Styling for email header */
      h1 {
        font-size: 24px;
        color: #10B981;
        margin-top: 0;
      }

      /* Styling for ticket details section */
      .ticket-details {
        margin-top: 30px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding: 20px;
      }

      /* Styling for ticket details table */
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #dddddd;
      }

      th {
        background-color: #10B981;
        color: #ffffff;
      }
    </style>
  </head>
  <body>
    <h1>Thank you for your purchase!</h1>

    <p>
      Dear ${email},
    </p>

    <p>
      Thank you for your purchase of ${ticket.title} ticket! We are excited to have you join us.
    </p>

    <p>
      We are pleased to confirm that your payment of ${paymentIntent.amount / 100} ${
          paymentIntent.currency
        } has been received and your ticket is now booked.
    </p>

    <div class="ticket-details">
      <h2>Ticket Details</h2>

      <table>
        <tr>
          <th>Ticket ID</th>
          <td>${ticket.id}</td>
        </tr>
        <tr>
          <th>Title</th>
          <td>${ticket.title}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td>${ticket.price}</td>
        </tr>
      </table>
    </div>

    <p>
      Please bring a copy of this email and a valid ID to the event for check-in.
    </p>

    <p>
      If you have any questions or concerns, please do not hesitate to contact us at <a href="mailto:${
        process.env.SENDGRID_FROM_EMAIL
      }">${process.env.SENDGRID_FROM_EMAIL}</a>.
    </p>

    <p>
      Thank you for choosing our service.
    </p>

    <p>
      Best regards,<br />
      NDASimple Team
    </p>
  </body>
</html>

`,
      }

      await sgMail.send(msg)

      res.status(200).json({ message: "Confirmation email sent" })
    } else {
      res.status(400).json({ message: "Payment not successful" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error sending confirmation email" })
  }
}
