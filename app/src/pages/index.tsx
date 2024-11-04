import type { GetServerSideProps, NextPage } from 'next'
import Meta from '@/layouts/Meta'
import { sdk } from '@/server/api'
import { Profiles } from '@/components/Portfolio/Profile'
import styles from '@/styles/index.module.scss'
import Link from 'next/link'
import { SkillItems } from '@/components/Portfolio/SkillItems'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import BlogItems from '@/components/Portfolio/BlogItems'
import { Blog, Project, TechStack } from '@/server/_types'
import { getProjectIdsWithBlog } from '@/server/loader'
import { PageProps } from './_app'
import { getThemeFromCookie } from '@/server/helper'

interface HomeProps extends PageProps {
  projects: Project[]
  projectIdsWithBlog: string[]
  blogs: Blog[]
  techStacks: TechStack[]
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const data = await sdk().fetchAllData()
  return {
    props: {
      initialTheme: getThemeFromCookie(ctx),
      projects: data.projects,
      projectIdsWithBlog: getProjectIdsWithBlog(),
      blogs: data.blogs.items,
      techStacks: data.techStacks,
    },
  }
}
const Home: NextPage<HomeProps> = ({
  projects,
  projectIdsWithBlog,
  blogs,
  techStacks,
}) => {
  return (
    <>
      <Meta />
      <div id="index">
        <Profiles className="bg-body" />
        <section
          id="skills"
          className={
            'd-flex flex-column align-items-center container py-5 row-gap-4 row-gap-lg-5 ' +
            styles.skillItemsSection
          }
        >
          <Link href="/skills" className="unstyled">
            <h2 className="h1 text-center title-underline">技術スタック</h2>
          </Link>
          <SkillItems row={2} techStacks={techStacks.slice(0, 6)} />
          <Link href="/skills" className="h5 text-primary">
            もっと見る
          </Link>
        </section>
        <div className="bg-body-tertiary py-2"></div>
        <section
          id="projects"
          className={
            'd-flex flex-column align-items-center py-5 container row-gap-4 row-gap-lg-5 ' +
            styles.projectItemsSection
          }
        >
          <Link href="/projects" className="unstyled">
            <h2 className="h1 text-center title-underline">プロジェクト</h2>
          </Link>
          <ProjectItems
            row={2}
            projectIdsWithBlog={projectIdsWithBlog}
            projects={projects.slice(0, 6)}
          />
          <Link href="/projects" className="h5 text-primary">
            <span>もっと見る</span>
          </Link>
        </section>
        <div className="bg-body-tertiary py-2"></div>
        <section
          id="blogs"
          className="d-flex flex-column align-items-center pt-5 container row-gap-4 row-gap-lg-5"
        >
          <Link href="/blogs" className="unstyled">
            <h2 className="h1 text-center title-underline">ブログ一覧</h2>
          </Link>
          <BlogItems blogs={blogs.slice(0, 4)} />
          <Link href="/blogs" className="h5 text-primary">
            <span>もっと見る</span>
          </Link>
        </section>
      </div>
    </>
  )
}

export default Home
