import { Client, cacheExchange, fetchExchange } from 'urql'
import { AuthConfig, AuthUtilities, authExchange } from '@urql/exchange-auth'

const getAuthConfig = async (utils: AuthUtilities): Promise<AuthConfig> => ({
  addAuthToOperation: (operation) =>
    utils.appendHeaders(operation, {
      Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
    }),
  didAuthError: (error) => error.response?.status === 401,
  refreshAuth: async () => undefined,
})
const client = new Client({
  url: '/api/query',
  exchanges: [cacheExchange, authExchange(getAuthConfig), fetchExchange],
})

export default client
