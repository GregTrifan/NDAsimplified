import React, { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import toast from "react-hot-toast"

const PaymentForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Create a payment intent on the server and return the client secret
      const response = await fetch("/api/intentPay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 2000, // the amount you want to charge, in cents
        }),
      })

      const { clientSecret } = await response.json()

      // Use the client secret to confirm the card payment
      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
          billing_details: {
            email: email,
          },
        },
        receipt_email: email,
      })

      if (result?.error) {
        console.error(result.error)
        toast.error("Payment failed")
        setIsLoading(false)
      } else {
        setIsLoading(false)
        toast.success("Payment sent successfully")
        // Payment succeeded, show a success message or redirect to a success page
      }
    } catch (error) {
      console.error(error)
      toast.error("Payment failed")
      setIsLoading(false)
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const isValidEmail = email !== "" && /\S+@\S+\.\S+/.test(email)

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control my-2">
        <label className="label">
          <span className="label-text">Your Email</span>
        </label>
        <label className="input-group">
          <span>Email</span>
          <input
            type="text"
            name="email"
            placeholder="info@site.com"
            className={`input input-bordered w-full ${
              !isValidEmail && email !== "" ? "input-error" : ""
            }`}
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        {!isValidEmail && email !== "" && (
          <span className="mx-2 my-1 text-xs text-error">Please enter a valid email address</span>
        )}
      </div>
      <div className="form-control my-2">
        <label className="label">
          <span className="label-text">Card Details</span>
        </label>
        <div className="rounded-md p-4 shadow-sm -space-y-px">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>
      <button
        className="btn btn-primary w-full my-3"
        type="submit"
        disabled={!stripe || isLoading || !isValidEmail}
      >
        {isLoading ? "Processing..." : "Pay"}
      </button>
    </form>
  )
}

export default PaymentForm
