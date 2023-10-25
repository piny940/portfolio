import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import BlogItem, { BlogItemProps } from '@/components/Portfolio/BlogItem'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { data } from '../../testHelpers/mock'
import { TestID } from '@/resources/TestID'

describe('<BlogItem />', () => {
  const controller = new PortfolioController(data)

  it('正常に描画される', async () => {
    const blog = controller.blogs.getBlogs()[0]
    const props = Mock.from<BlogItemProps>({
      blog,
    })
    const component = render(<BlogItem {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getAllByTestId(TestID.TECHNOLOGY_BADGE).length).toBe(
        blog.getTechnologies().length
      )
    })
  })
})
