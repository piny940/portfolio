import { useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'

export type MarkdownDisplayProps = {
  content: string
}

export const MarkdownDisplay = ({ content }: MarkdownDisplayProps) => {
  const [html, setHtml] = useState('')

  const parseMarkdown = async (content: string): Promise<string> => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
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
  }, [])

  return (
    <>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
