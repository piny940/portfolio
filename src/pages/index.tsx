import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { ProjectsData } from '@/models/project'
import { YamlLoader } from '@/loader/_common'
import { ProjectsLoader } from '@/loader/projects'
import { ProfileLoader } from '@/loader/profile'
import { ProfileData } from '@/models/profile'

type HomeProps = {
  profileData: ProfileData
  projectsData: ProjectsData
}

export const getStaticProps = async (): Promise<{ props: HomeProps }> => {
  const yamlLoader = new YamlLoader()
  const projectsData = new ProjectsLoader(yamlLoader).load()
  const profileData = new ProfileLoader(yamlLoader).load()
  return {
    props: {
      projectsData: projectsData,
      profileData: profileData,
    },
  }
}

const Home: NextPage<HomeProps> = ({ projectsData, profileData }) => {
  return <Index />
}

export default Home
