import { Blog, Project, TechStack, Technology } from '@/server/_types'
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
    id: 0,
    name: 'rails',
  }),
  Mock.from<Technology>({
    id: 1,
    name: 'react',
  }),
  Mock.from<Technology>({
    id: 2,
    name: 'typescript',
  }),
]
export const projects = [
  Mock.from<Project>({
    tags: [technologies[0], technologies[1]],
    title: 'project1',
  }),
  Mock.from<Project>({
    tags: [technologies[1], technologies[2]],
    title: 'project2',
  }),
  Mock.from<Project>({
    tags: [technologies[1]],
    title: 'project3',
  }),
]
export const techStacks = [
  Mock.from<TechStack>({
    id: 0,
    technology: technologies[0],
    proficiency: 90,
  }),
  Mock.from<TechStack>({
    id: 1,
    technology: technologies[1],
    proficiency: 50,
  }),
  Mock.from<TechStack>({
    id: 2,
    technology: technologies[2],
    proficiency: 70,
  }),
]
export const blogs = [
  Mock.from<Blog>({
    title: 'Blog1',
    id: 0,
    url: 'https://example.com',
    tags: [technologies[0], technologies[1]],
  }),
  Mock.from<Blog>({
    title: 'Blog2',
    id: 1,
    url: 'https://example.com',
    tags: [technologies[0], technologies[2]],
  }),
  Mock.from<Blog>({
    title: 'Blog3',
    id: 2,
    url: 'https://example.com',
    tags: [technologies[0], technologies[1], technologies[2]],
  }),
]
