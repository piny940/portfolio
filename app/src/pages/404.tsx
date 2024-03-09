import Meta from '@/layouts/Meta'
import { TestID } from '@/resources/TestID'
import Link from 'next/link'
import { PageProps } from './_app'
import { GetServerSideProps } from 'next'
import { getThemeFromCookie } from '@/server/helper'

const Custom404: React.FC = () => {
  return (
    <>
      <Meta noIndex />
      <div className="container" data-testid={TestID.CUSTOM404}>
        <h1>ページが見つかりませんでした。(404)</h1>
        <p>
          <Link href="/">ホームへ戻る</Link>
        </p>
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => ({ props: { initialTheme: getThemeFromCookie(ctx) } })

export default Custom404
