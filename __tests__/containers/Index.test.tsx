import { Index } from '@/containers/Index'
import { ProjectData } from '@/models/project'
import { TechStackData } from '@/models/tech_stack'
import { TechnologyData } from '@/models/technology'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'

describe('<Index />', () => {
  it('Indexが正常に描画される', async () => {
    const data = {
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
        Mock.from<TechStackData>({}),
        Mock.from<TechStackData>({}),
        Mock.from<TechStackData>({}),
      ],
    }
    const component = render(<Index data={data} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
