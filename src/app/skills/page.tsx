import Breadcrumb from '@/components/Common/Breadcrumb'
import { SkillItems } from '@/components/Portfolio/SkillItems'
import { getTechStacks } from '@/content'
import { JSX } from 'react'

const SkillsPage = (): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
  ]
  return (
    <div className="container pt-3">
      <Breadcrumb paths={paths} />
      <div className="d-flex align-items-center flex-column row-gap-3 row-gap-md-5">
        <h1 className="h1 text-center title-underline">技術スタック</h1>
        <SkillItems technologies={getTechStacks()} />
      </div>
    </div>
  )
}

export default SkillsPage
