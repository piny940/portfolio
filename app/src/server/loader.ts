import { readFileSync, readdirSync } from 'fs'

const loadFile = (filename: string) => {
  try {
    return readFileSync(filename, 'utf8')
  } catch {
    return undefined
  }
}

export const getBlogContents = () => {
  const files = readdirSync('documents')
  const keys = files.map((filename) => filename.replace('.md', ''))
  const contents: { [key in string]: string } = {}
  keys.forEach((key) => {
    const content = loadFile(`documents/${key}.md`)
    if (content) contents[key] = content
  })
  return contents
}
export const getProjectIdsWithBlog = () => {
  return Object.keys(getBlogContents())
}
export const getBlogContent = (projectId: string) =>
  loadFile(`documents/${projectId}.md`)
