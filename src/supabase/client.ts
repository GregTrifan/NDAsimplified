import { createClient } from "@supabase/supabase-js"
import { Database } from "./types"

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.DB_KEY ?? ""
)
