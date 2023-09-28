import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { ProjectsData } from '@/models/project'
import { YamlLoader } from '@/loader/_common'
import { ProjectsLoader } from '@/loader/projects'
import { ProfileLoader } from '@/loader/profile'
import { ProfileData } from '@/models/profile'
import { TechnologiesData } from '@/models/technology'
import { TechnologiesLoader } from '@/loader/technologies'

type HomeProps = {
  profileData: ProfileData
  projectsData: ProjectsData
  technologiesData: TechnologiesData
}

export const getStaticProps = async (): Promise<{ props: HomeProps }> => {
  const yamlLoader = new YamlLoader()
  const projectsData = new ProjectsLoader(yamlLoader).load()
  const profileData = new ProfileLoader(yamlLoader).load()
  const technologiesData = new TechnologiesLoader(yamlLoader).load()
  return {
    props: {
      projectsData: projectsData,
      profileData: profileData,
      technologiesData: technologiesData,
    },
  }
}

const Home: NextPage<HomeProps> = ({
  projectsData,
  profileData,
  technologiesData,
}) => {
  console.log(technologiesData)
  return <Index />
}

export default Home
