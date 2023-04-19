import React from "react"
import { Ticket } from "types/Ticket"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const { startDate, endDate, title, description, price, id } = ticket
  return (
    <div className=" w-full lg:w-fit bg-primary/20 shadow-xl rounded-md overflow-hidden">
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <Link href={Routes.TicketPage({ id: `${id}` })}>
            <button className="btn btn-primary">
              <span className="my-auto"> Buy Now</span>
              <span className="font-bold text-lg ml-2 my-auto">${price}</span>
            </button>
          </Link>
          <div>
            <p className="text-gray-500 text-base">
              {startDate} - {endDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
