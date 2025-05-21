import { getClient } from '@nevmstas/hygraph-client'

if (!process.env.NEXT_PUBLIC_HYGRAPH_URL) {
  throw new Error('NEXT_PUBLIC_HYGRAPH_URL is not defined')
}

if (!process.env.NEXT_PUBLIC_HYGRAPH_TOKEN) {
  throw new Error('NEXT_PUBLIC_HYGRAPH_TOKEN is not defined')
}

export default getClient(process.env.NEXT_PUBLIC_HYGRAPH_URL, process.env.NEXT_PUBLIC_HYGRAPH_TOKEN)
