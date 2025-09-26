import { Client, cacheExchange, fetchExchange } from 'urql'
import { AuthConfig, AuthUtilities, authExchange } from '@urql/exchange-auth'
import { BACKEND_JWT_TOKEN_KEY } from '../../utils/constants'

const getAuthConfig = async (utils: AuthUtilities): Promise<AuthConfig> => ({
  addAuthToOperation: (operation) => {
    let token = ''
    if (typeof window !== 'undefined') {
      token = localStorage.getItem(BACKEND_JWT_TOKEN_KEY) || ''
    }
    return utils.appendHeaders(operation, {
      Authorization: `Bearer ${token}`,
    })
  },
  didAuthError: error => error.response?.status === 401,
  refreshAuth: async () => undefined,
})
const client = new Client({
  url: '/api/query',
  exchanges: [cacheExchange, authExchange(getAuthConfig), fetchExchange],
})
export default client
