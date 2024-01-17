console.log('Backend host:', process.env.BACKEND_HOST)
console.log('Backend token:', !!process.env.BACKEND_TOKEN)
export const queryGql = async <T>(query: string) => {
  const response = await fetch(`${process.env.BACKEND_HOST || ''}/v1/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_TOKEN || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const json = await response.json()
  return json.data as T
}
