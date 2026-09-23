import { Blog, Profile, Project, Technology } from '@/content/types'
import React from 'react'
import { Mock } from 'ts-mockery'

export type TestComponentProps = {
  testID: string
}

export const TestComponent: React.FC<TestComponentProps> = ({ testID }) => {
  return <div data-testid={testID}>Test</div>
}

export const technologies: Technology[] = [
  Mock.from<Technology>({
    slug: 'rails',
    name: 'rails',
    tagColor: '#cc0000',
    logoUrl: null,
    proficiency: 90,
  }),
  Mock.from<Technology>({
    slug: 'react',
    name: 'react',
    tagColor: '#61dafb',
    logoUrl: null,
    proficiency: 50,
  }),
  Mock.from<Technology>({
    slug: 'typescript',
    name: 'typescript',
    tagColor: '#3178c6',
    logoUrl: null,
    proficiency: 70,
  }),
]

export const projects: Project[] = [
  Mock.from<Project>({
    id: 'project1',
    title: 'project1',
    links: { app: null, github: null, qiita: null },
    tags: [technologies[0], technologies[1]],
  }),
  Mock.from<Project>({
    id: 'project2',
    title: 'project2',
    links: { app: null, github: null, qiita: null },
    tags: [technologies[1], technologies[2]],
  }),
  Mock.from<Project>({
    id: 'project3',
    title: 'project3',
    links: { app: null, github: null, qiita: null },
    tags: [technologies[1]],
  }),
]

export const blogs: Blog[] = [
  Mock.from<Blog>({
    title: 'Blog1',
    url: 'https://example.com/1',
    tags: [technologies[0], technologies[1]],
  }),
  Mock.from<Blog>({
    title: 'Blog2',
    url: 'https://example.com/2',
    tags: [technologies[0], technologies[2]],
  }),
  Mock.from<Blog>({
    title: 'Blog3',
    url: 'https://example.com/3',
    tags: [technologies[0], technologies[1], technologies[2]],
  }),
]
