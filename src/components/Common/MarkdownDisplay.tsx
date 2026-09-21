import { JSX } from 'react'

export type MarkdownDisplayProps = {
  html: string
}

export const MarkdownDisplay = ({
  html,
}: MarkdownDisplayProps): JSX.Element => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
)
