import { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export type MarkdownDisplayProps = {
  src: string
}

export const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ src }) => {
  const [content, setContent] = useState('')

  const loadContent = async () => {
    const response = await fetch(src)
    const text = await response.text()
    setContent(text)
  }

  useEffect(() => {
    void loadContent()

    // 開発環境では記事の更新をホットリロード
    if (process.env.NODE_ENV === 'development') {
      setInterval(loadContent, 1000)
    }
  })

  return (
    <div className="markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
