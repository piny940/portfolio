import Breadcrumb from '@/components/Common/Breadcrumb'
import { SkillItems } from '@/components/Portfolio/SkillItems'
import Meta from '@/layouts/Meta'
import { Technology } from '@/content/types'
import { getTechStacks } from '@/content'
import { GetStaticProps } from 'next'
import { JSX } from 'react'

interface SkillsProps {
  technologies: Technology[]
}

export const getStaticProps: GetStaticProps<SkillsProps> = async () => {
  return { props: { technologies: getTechStacks() } }
}

const SkillsPage = ({ technologies }: SkillsProps): JSX.Element => {
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
          <SkillItems technologies={technologies} />
        </div>
      </div>
    </>
  )
}

export default SkillsPage
