import crypto from 'crypto'
import { Octokit } from 'octokit'
import { createAppAuth } from '@octokit/auth-app'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.development' })

const appId = process.env.GITHUB_APP_ID as string
const privateKey = (process.env.GITHUB_APP_PRIVATE_KEY as string).replace(
  /\\n/g,
  '\n'
)
const clientId = process.env.GITHUB_APP_CLIENT_ID as string
const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET as string

const privateKeyPkcs8 = crypto.createPrivateKey(privateKey).export({
  type: 'pkcs8',
  format: 'pem',
})

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: { appId, privateKey: privateKeyPkcs8, clientId, clientSecret },
})
console.log(appOctokit)

const getData = async () => {
  const data = await appOctokit.rest.apps.getAuthenticated()
  console.log(data)
}
void getData()
