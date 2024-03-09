import Meta from '@/layouts/Meta'
import { TestID } from '@/resources/TestID'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { getThemeFromCookie } from '@/server/helper'
import { PageProps } from './_app'

const Custom500: React.FC = () => {
  return (
    <>
      <Meta noIndex />
      <div className="container" data-testid={TestID.CUSTOM500}>
        <h1>サーバーでエラーが発生しました。</h1>
        <p>
          <Link href="/">ホームに戻る</Link>
        </p>
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => ({ props: { initialTheme: getThemeFromCookie(ctx) } })

export default Custom500
