export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      tickets: {
        Row: {
          id: string
          startDate: string | null
          endDate: string | null
          title: string | null
          description: string | null
          price: number | null
        }
        Insert: {
          id?: string
          startDate?: string | null
          endDate?: string | null
          title?: string | null
          description?: string | null
          price?: number | null
        }
        Update: {
          startDate?: string | null
          endDate?: string | null
          title?: string | null
          description?: string | null
          price?: number | null
        }
      }
      ownerships: {
        Row: {
          ticketId: string
          userId: string
        }
        Insert: {
          ticketId?: string
          userId?: string
        }
        Update: {
          ticketId?: string
          userId?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
