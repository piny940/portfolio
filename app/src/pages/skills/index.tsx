import Breadcrumb from '@/components/Common/Breadcrumb'
import { SkillItems } from '@/components/Portfolio/SkillItems'
import Meta from '@/layouts/Meta'
import { TechStack } from '@/server/_types'
import { sdk } from '@/server/api'
import { GetServerSideProps } from 'next'
import { PageProps } from '../_app'
import { getThemeFromCookie } from '@/server/helper'

interface SkillsProps extends PageProps {
  techStacks: TechStack[]
}

export const getServerSideProps: GetServerSideProps<SkillsProps> = async (
  ctx
) => ({
  props: {
    initialTheme: getThemeFromCookie(ctx),
    techStacks: (await sdk().fetchTechStacks()).techStacks,
  },
})

const SkillsPage = ({ techStacks }: SkillsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
  ]
  return (
    <>
      <Meta />
      <div className="container pt-3">
        <Breadcrumb paths={paths} />
        <div className="d-flex align-items-center flex-column row-gap-3 row-gap-md-5">
          <h1 className="h1 text-center title-underline">技術スタック</h1>
          <SkillItems techStacks={techStacks} />
        </div>
      </div>
    </>
  )
}

export default SkillsPage
