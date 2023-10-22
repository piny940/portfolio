import { ProjectData } from '@/models/project'
import { TechStackData } from '@/models/tech_stack'
import { TechnologyData } from '@/models/technology'
import React from 'react'
import { Mock } from 'ts-mockery'

export type TestComponentProps = {
  testID: string
}

export const TestComponent: React.FC<TestComponentProps> = ({ testID }) => {
  return <div data-testid={testID}>Test</div>
}

export const data = {
  profileData: {
    frontDescription: 'フロントエンドエンジニア',
  },
  projectsData: [
    Mock.from<ProjectData>({
      technologies: ['rails', 'react'],
      title: 'project1',
    }),
    Mock.from<ProjectData>({
      technologies: ['typescript', 'react'],
      title: 'project2',
    }),
    Mock.from<ProjectData>({
      technologies: ['typescript', 'rails'],
      title: 'project3',
    }),
  ],
  technologiesData: [
    Mock.from<TechnologyData>({
      id: 'rails',
    }),
    Mock.from<TechnologyData>({
      id: 'react',
    }),
    Mock.from<TechnologyData>({
      id: 'typescript',
    }),
  ],
  techStacksData: [
    Mock.from<TechStackData>({
      technologyId: 'rails',
      proficiency: 90,
    }),
    Mock.from<TechStackData>({
      technologyId: 'react',
      proficiency: 50,
    }),
    Mock.from<TechStackData>({
      technologyId: 'typescript',
      proficiency: 70,
    }),
  ],
}
