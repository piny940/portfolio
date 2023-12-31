import { initConfig } from './config'
import { initOctokit } from './github'

initConfig()

const main = async () => {
  const octokit = await initOctokit()
  const branches = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner: process.env.REPOSITORY_OWNER as string,
    repo: process.env.REPOSITORY_NAME as string,
  })
  console.log(branches)
}

main()
