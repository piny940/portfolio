import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { ProjectsData } from '@/models/project'
import { YamlLoader } from '@/loader/_common'
import { ProjectsLoader } from '@/loader/projects'
import { ProfileLoader } from '@/loader/profile'
import { ProfileData } from '@/models/profile'
import { TechnologiesData } from '@/models/technology'
import { TechnologiesLoader } from '@/loader/technologies'
import { TechStacksData } from '@/models/tech_stack'
import { TechStacksLoader } from '@/loader/tech_stacks'

type HomeProps = {
  profileData: ProfileData
  projectsData: ProjectsData
  technologiesData: TechnologiesData
  techStacksData: TechStacksData
}

export const getStaticProps = async (): Promise<{ props: HomeProps }> => {
  const yamlLoader = new YamlLoader()
  const projectsData = new ProjectsLoader(yamlLoader).load()
  const profileData = new ProfileLoader(yamlLoader).load()
  const technologiesData = new TechnologiesLoader(yamlLoader).load()
  const techStacksData = new TechStacksLoader(yamlLoader).load()

  return {
    props: {
      projectsData: projectsData,
      profileData: profileData,
      technologiesData: technologiesData,
      techStacksData: techStacksData,
    },
  }
}

const Home: NextPage<HomeProps> = ({
  projectsData,
  profileData,
  technologiesData,
  techStacksData,
}) => {
  console.log(techStacksData)
  return <Index />
}

export default Home
