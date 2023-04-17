import React from "react"
import { Ticket } from "types/Ticket"

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const { startDate, endDate, title, description, price } = ticket

  return (
    <div className=" w-full lg:w-fit bg-white shadow-md rounded-md overflow-hidden">
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <button className="btn btn-primary">
              <span className="my-auto"> Buy Now</span>
              <span className="font-bold text-lg ml-2 my-auto">${price}</span>
            </button>
          </div>

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
