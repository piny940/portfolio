import { initConfig } from './config'
import { initOctokit } from './github'

initConfig()
const owner = process.env.REPOSITORY_OWNER as string
const repo = process.env.REPOSITORY_NAME as string
const branchName = process.env.BRANCH_NAME as string

const main = async () => {
  const octokit = await initOctokit()
  const { data: branchesData } = await octokit.request(
    'GET /repos/{owner}/{repo}/branches',
    {
      owner,
      repo,
    }
  )
  const masterBranch = branchesData.find((branch) => branch.name === branchName)
  if (!masterBranch) throw new Error(`Branch ${branchName} not found`)

  const { data: tree } = await octokit.request(
    'POST /repos/{owner}/{repo}/git/trees',
    {
      owner,
      repo,
      tree: [
        {
          path: 'test.txt',
          mode: '100644',
          type: 'blob',
          content: 'test',
        },
      ],
      base_tree: masterBranch.commit.sha,
    }
  )
  const { data: commit } = await octokit.request(
    'POST /repos/{owner}/{repo}/git/commits',
    {
      owner,
      repo,
      message: 'test',
      tree: tree.sha,
      parents: [masterBranch.commit.sha],
    }
  )
  console.log(commit)
  const { data: ref } = await octokit.request(
    'POST /repos/{owner}/{repo}/git/refs',
    {
      owner,
      repo,
      ref: `refs/heads/update-blog-${Date.now()}`,
      sha: commit.sha,
    }
  )
  console.log(ref)

  // console.log(branches)
}

main()
