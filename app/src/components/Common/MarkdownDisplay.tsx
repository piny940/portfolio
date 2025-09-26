import { useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'

export type MarkdownDisplayProps = {
  content: string
}

export const MarkdownDisplay = ({ content }: MarkdownDisplayProps) => {
  const [html, setHtml] = useState('')

  const parseMarkdown = async (content: string): Promise<string> => {
    const file = await unified()
      .use(remarkParse, { allowDangerousHtml: true })
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .process(content)
    return String(file)
  }

  useEffect(() => {
    const getContent = async () => {
      const htmlString = await parseMarkdown(content)
      setHtml(htmlString)
    }
    void getContent()
  }, [content])

  return (
    <>
      {html
        ? (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          )
        : (
            <p>Loading...</p>
          )}
    </>
  )
}
