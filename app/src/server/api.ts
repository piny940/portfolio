import { GraphQLClient } from 'graphql-request'
import { getSdk } from './_types'

export const sdk = getSdk(
  new GraphQLClient(`${process.env.BACKEND_HOST || ''}/v1/query`, {
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_TOKEN || ''}`,
    },
  })
)
