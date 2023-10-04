import { useEffect, useState } from 'react'
import { unified } from 'unified'
// markdown をパースする
import remarkParse from 'remark-parse'
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm'
// HTML に変換する
import remarkRehype from 'remark-rehype'
// サニタイズ
import rehypeSanitize from 'rehype-sanitize'
// HTML にシリアライズ
import rehypeStringify from 'rehype-stringify'

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
