import { PortfolioData } from '@/controllers/data_controller'
import { BlogData } from '@/models/blogs'
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

export const data: PortfolioData = {
  profileData: {
    frontDescription: 'フロントエンドエンジニア',
    qiita: 'https://example.com',
    github: 'https://example.com',
  },
  projectsData: [
    Mock.from<ProjectData>({
      technologyIds: ['rails', 'react'],
      title: 'project1',
    }),
    Mock.from<ProjectData>({
      technologyIds: ['typescript', 'react'],
      title: 'project2',
    }),
    Mock.from<ProjectData>({
      technologyIds: ['typescript', 'rails'],
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
  blogsData: [
    Mock.from<BlogData>({
      title: 'Blog1',
      link: 'https://example.com',
      technologyIds: ['rails', 'react'],
    }),
    Mock.from<BlogData>({
      title: 'Blog2',
      link: 'https://example.com',
      technologyIds: ['rails', 'typescript'],
    }),
    Mock.from<BlogData>({
      title: 'Blog3',
      link: 'https://example.com',
      technologyIds: ['rails', 'typescript', 'react'],
    }),
  ],
}
