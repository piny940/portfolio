import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { ProjectsData } from '@/models/project'
import { YamlLoader } from '@/loader/_common'
import { ProjectsLoader } from '@/loader/projects'

type HomeProps = {
  projectsData: ProjectsData
}

export const getStaticProps = async () => {
  const yamlLoader = new YamlLoader()
  const projectsData = new ProjectsLoader(yamlLoader).load()
  const props: HomeProps = {
    projectsData: projectsData,
  }
  return {
    props: props,
  }
}

const Home: NextPage<HomeProps> = ({ projectsData }) => {
  console.log(projectsData)
  return <Index />
}

export default Home
