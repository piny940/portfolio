import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { BlogList } from '@/components/Portfolio/BlogList'
import { Blog } from '@/content/types'
import { TestID } from '@/resources/TestID'
import { TestComponent } from '../../testHelpers/mock'

jest.mock('@/components/Portfolio/BlogItem', () => ({
  __esModule: true,
  default: () => <TestComponent testID={TestID.BLOG_ITEM} />,
}))

const LIMIT = 10

describe('<BlogList />', () => {
  it.each`
    blogCount
    ${0}
    ${1}
    ${5}
    ${11}
  `(
    'blogが$blogCount個のときmin(blogCount, limit)個のBlogItemが描画される',
    ({ blogCount }: { blogCount: number }) => {
      const blogs = Array.from({ length: blogCount },
        (_, idx) => Mock.from<Blog>({ url: `https://${idx}` }),
      )
      const { queryAllByTestId } = render(
        <BlogList blogs={blogs} limit={LIMIT} />,
      )

      expect(queryAllByTestId(TestID.BLOG_ITEM).length).toBe(
        Math.min(blogCount, LIMIT),
      )
    },
  )
})
