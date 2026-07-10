import { Client } from "@api-client"

export const rest = new Client({
  baseUrl: import.meta.env.VITE_HANALAND_API_URL
})
