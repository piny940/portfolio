import { GraphQLClient } from 'graphql-request'
import { getSdk } from './_types'
import fs from 'fs'

export const sdk = () => {
  let token = ''
  if (process.env.TOKEN_PATH) {
    token = fs.readFileSync(process.env.TOKEN_PATH).toString()
  }
  return getSdk(
    new GraphQLClient(`${process.env.BACKEND_HOST || ''}/v1/query`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  )
}
