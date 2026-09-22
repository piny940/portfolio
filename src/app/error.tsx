'use client'

import { TestID } from '@/resources/TestID'
import Link from 'next/link'

export type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  return (
    <>
      <meta name="robots" content="noindex" />
      <div className="container" data-testid={TestID.CUSTOM500}>
        <h1>サーバーでエラーが発生しました。</h1>
        <p>
          <Link href="/">ホームに戻る</Link>
        </p>
      </div>
    </>
  )
}

export default ErrorPage
