import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { GetServerSideProps } from "next"
import { Ticket } from "types/Ticket"
import TicketCard from "src/components/TicketCard"
import { supabase } from "src/supabase/client"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = ({ tickets }: { tickets: Array<Ticket> }) => {
  return (
    <Layout title="Home">
      <h2 className="text-3xl text-center my-4">Avalaible tickets</h2>
      <div className="flex flex-wrap gap-4 mx-4">
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{ tickets: Ticket[] }> = async (ctx) => {
  try {
    //@ts-ignore again going nuts
    let { data } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)
    const tickets = data!.map((ticket: Ticket) => ({
      ...ticket,
    })) as Ticket[]
    return {
      props: {
        tickets,
      },
    }
  } catch {
    return {
      props: {
        tickets: [],
      },
    }
  }
}

export default Home
