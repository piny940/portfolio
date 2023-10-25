import { SkillItems } from '../components/Portfolio/SkillItems'
import { ProjectItems } from '../components/Portfolio/ProjectItems'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { PortfolioData } from '@/controllers/data_controller'
import { Profiles } from '@/components/Portfolio/Profile'
import Link from 'next/link'
import BlogItem from '@/components/Portfolio/BlogItem'

export type IndexProps = {
  data: PortfolioData
}

export const Index = ({ data }: IndexProps): JSX.Element => {
  const controller = new PortfolioController(data)

  return (
    <div id="index">
      <Profiles className="bg-body" profile={controller.getProfile()} />
      <section
        id="skills"
        className="d-flex flex-column align-items-center p-5 bg-body-tertiary"
      >
        <Link href="/skills" className="unstyled">
          <h2 className="h1 text-center title-underline">技術スタック</h2>
        </Link>
        <SkillItems
          techStacks={controller
            .getTechStacks()
            .sortedByProficiency()
            .slice(0, 6)}
        />
        <Link href="/skills" className="h5 text-primary">
          もっと見る
        </Link>
      </section>
      <section
        id="projects"
        className="d-flex flex-column align-items-center py-5 container px-4"
      >
        <Link href="/projects" className="unstyled">
          <h2 className="h1 text-center title-underline">プロジェクト</h2>
        </Link>
        <div className="mt-4">
          <ProjectItems
            projects={controller.getProjects().sortedByFavorite().slice(0, 9)}
          />
        </div>
        <Link href="/projects" className="h5 text-primary">
          <span>もっと見る</span>
        </Link>
      </section>
      <section
        id="blogs"
        className="d-flex flex-column align-items-center py-5 px-4  bg-body-tertiary"
      >
        <Link href="/blogs" className="unstyled">
          <h2 className="h1 text-center title-underline">ブログ</h2>
        </Link>
        <div className="row row-cols-md-2 row-cols-xl-3 d-flex align-items-stretch">
          <div className="col-md p-3 mb-3">
            <BlogItem />
          </div>
        </div>
        <Link href="/projects" className="h5 text-primary">
          <span>もっと見る</span>
        </Link>
      </section>
    </div>
  )
}
