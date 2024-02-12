import { SkillItems } from '../components/Portfolio/SkillItems'
import ProjectItems from '../components/Portfolio/ProjectItems'
import { Profiles } from '@/components/Portfolio/Profile'
import Link from 'next/link'
import BlogItems from '@/components/Portfolio/BlogItems'
import { PortfolioData } from '@/loader/common'
import styled from 'styled-components'

const SkillItemsSection = styled.section`
  max-width: 1000px;
`
const ProjectItemsSection = styled.section`
  max-width: 1000px;
`

export type IndexProps = {
  data: PortfolioData
}

export const Index = ({ data }: IndexProps): JSX.Element => {
  return (
    <div id="index">
      <Profiles className="bg-body" profile={data.profile} />
      <SkillItemsSection
        id="skills"
        className="d-flex flex-column align-items-center container py-5"
      >
        <Link href="/skills" className="unstyled">
          <h2 className="h1 text-center title-underline">技術スタック</h2>
        </Link>
        <SkillItems row={2} techStacks={data.techStacks.slice(0, 6)} />
        <Link href="/skills" className="h5 text-primary">
          もっと見る
        </Link>
      </SkillItemsSection>
      <div className="bg-body-tertiary py-2"></div>
      <ProjectItemsSection
        id="projects"
        className="d-flex flex-column align-items-center py-5 mx-auto container"
      >
        <Link href="/projects" className="unstyled">
          <h2 className="h1 text-center title-underline">プロジェクト</h2>
        </Link>
        <div className="mt-5">
          <ProjectItems row={2} projects={data.projects.slice(0, 6)} />
        </div>
        <Link href="/projects" className="h5 text-primary">
          <span>もっと見る</span>
        </Link>
      </ProjectItemsSection>
      <div className="bg-body-tertiary py-2"></div>
      <section
        id="blogs"
        className="d-flex flex-column align-items-center mx-auto py-5 container"
      >
        <Link href="/blogs" className="unstyled">
          <h2 className="h1 text-center title-underline">ブログ一覧</h2>
        </Link>
        <div className="mt-5 w-100">
          <BlogItems blogs={data.blogs.slice(0, 4)} />
        </div>
        <Link href="/blogs" className="h5 text-primary">
          <span>もっと見る</span>
        </Link>
      </section>
    </div>
  )
}
