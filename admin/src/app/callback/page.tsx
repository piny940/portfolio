import { IDToken } from '@/components/IdToken'

type Params = {
  code: string
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Params>
}) {
  const query = await searchParams
  if (!query.code) {
    throw Error('No code provided')
  }
  if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw Error('Missing environment variables')
  }
  const secret = Buffer.from(
    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET,
  ).toString('base64')
  const res = await fetch(process.env.AUTH_SERVER_URL + '/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${secret}`,
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      code: query.code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.APP_URL + '/callback',
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw Error(data.error_description)
  }
  const idToken = data.id_token
  return <IDToken idToken={idToken} />
}
