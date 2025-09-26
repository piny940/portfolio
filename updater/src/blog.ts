import {
  createBlog,
  getBlogs,
  getTechnologies,
  updateBlogTags,
} from './storage'
import { Blog, BlogInput, Technology } from './types'
import { sendSlackMessage } from './slack'

const getQiitaBlogs = async () => {
  const response = await fetch(
    'https://qiita.com/api/v2/authenticated_user/items?per_page=100',
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
    },
  )
  const json = await response.json()
  return json.filter((blog: any) => !blog.private)
}
const getTags = (qiitaTags: { name: string }[]) => {
  const tagNames = qiitaTags.map(tag => tag.name)
  const map: { [key in string]: string[] } = {
    'Next.js': ['React.js', 'React', 'Typescript'],
    'React': ['React.js'],
  }
  return tagNames.map(tag => (map[tag] || []).concat([tag])).flat()
}
const isSameTag = (tag1: string, tag2: string) => {
  return tag1.toLowerCase() === tag2.toLowerCase()
}
const getTagIds = (
  qiitaTags: { name: string }[],
  allTechnologies: Technology[],
) => {
  const tags = getTags(qiitaTags)
  const tagIds: number[] = []
  for (const tag of tags) {
    const technology = allTechnologies.find(t => isSameTag(t.name, tag))
    if (technology) {
      tagIds.push(technology.id)
    }
  }
  return tagIds
}
const filterNewBlogs = (desiredBlogs: BlogInput[], currentBlogs: Blog[]) => {
  const currentBlogUrls = currentBlogs.map(blog => blog.url)
  return desiredBlogs.filter((blog: any) => !currentBlogUrls.includes(blog.url))
}
const notifyToSlack = (newBlogs: Blog[]) => {
  const keyValuePair = (label: string, value: string) => ({
    type: 'rich_text',
    elements: [
      {
        type: 'rich_text_section',
        elements: [
          { type: 'text', text: label, style: { bold: true } },
          { type: 'text', text: `: ${value}` },
        ],
      },
    ],
  })
  sendSlackMessage(
    newBlogs.map(blog => ({
      color: '#36D399',
      blocks: [
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*${blog.title}*` },
        },
        {
          type: 'rich_text',
          elements: [
            {
              type: 'rich_text_section',
              elements: [
                { type: 'text', text: 'URL', style: { bold: true } },
                { type: 'text', text: ': ' },
                { type: 'link', text: blog.url, url: blog.url },
              ],
            },
          ],
        },
        keyValuePair('Kind', blog.kind),
        keyValuePair('Pubslished At', blog.publishedAt),
        keyValuePair('Tags', blog.tags.map(tag => tag.name).join(', ')),
      ],
    })),
  )
}

export const updateBlogs = async () => {
  const qiitaBlogs = await getQiitaBlogs()
  const desiredBlogs: BlogInput[] = qiitaBlogs.map((blog: any) => ({
    kind: 0, // Qiita
    publishedAt: blog.created_at,
    title: blog.title,
    url: blog.url,
  }))
  const allTechnologies = await getTechnologies()
  const urlTagIdsMap: { [key in string]: number[] } = {}
  for (const blog of qiitaBlogs) {
    const tagIds = getTagIds(blog.tags, allTechnologies)
    urlTagIdsMap[blog.url] = tagIds
  }
  const currentBlogs = await getBlogs()
  const newBlogs = filterNewBlogs(desiredBlogs, currentBlogs)
  const createdBlogs: Blog[] = []
  for (const blog of newBlogs) {
    const newBlog = await createBlog(blog)
    const tags = await updateBlogTags(newBlog.id, urlTagIdsMap[blog.url])
    createdBlogs.push({
      ...newBlog,
      tags,
    })
  }
  if (newBlogs.length > 0) {
    console.log('new Blog')
    notifyToSlack(createdBlogs)
  }
}
