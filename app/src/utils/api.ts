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
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors))
  }
  return json.data as T
}
