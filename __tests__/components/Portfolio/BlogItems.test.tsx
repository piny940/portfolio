import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import BlogItems, { BlogItemsProps } from '@/components/Portfolio/BlogItems'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { data } from '../../testHelpers/mock'
import { TestID } from '@/resources/TestID'

describe('<BlogItems />', () => {
  const controller = new PortfolioController(data)

  it('正常に描画される', async () => {
    const blogs = controller.blogs.getBlogs()
    const props = Mock.from<BlogItemsProps>({ blogs })
    const component = render(<BlogItems {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getAllByTestId(TestID.BLOG_ITEM).length).toBe(
        blogs.length
      )
    })
  })
})
