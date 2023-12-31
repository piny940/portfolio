import { App, Octokit } from 'octokit'
import { createAppAuth } from '@octokit/auth-app'
import crypto from 'crypto'

export const initOctokit = async () => {
  const appId = process.env.GITHUB_APP_ID as string
  const privateKey = (process.env.GITHUB_APP_PRIVATE_KEY as string).replace(
    /\\n/g,
    '\n'
  )

  // octokitはpkcs8形式の秘密鍵を要求する
  const privateKeyPkcs8 = crypto.createPrivateKey(privateKey).export({
    type: 'pkcs8',
    format: 'pem',
  }) as string

  const _octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId,
      privateKey: privateKeyPkcs8,
      clientId: process.env.GITHUB_APP_CLIENT_ID,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
    },
  })
  const { data: installationData } = await _octokit.request(
    'GET /repos/{owner}/{repo}/installation',
    {
      owner: 'piny940',
      repo: 'portfolio',
    }
  )
  const app = new App({
    appId,
    privateKey: privateKeyPkcs8,
  })
  const octokit = await app.getInstallationOctokit(installationData.id)
  return octokit
}
