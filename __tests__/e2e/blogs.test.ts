import { DEFAULT_LIMIT } from '@/components/Portfolio/BlogList'
import { TestID } from '@/resources/TestID'
import { expect, test } from '@playwright/test'

test('paging works', async ({ page }) => {
  await page.goto('/blogs')
  const blogs = page.getByTestId(TestID.BLOG_ITEM)
  await expect(blogs).toHaveCount(DEFAULT_LIMIT)
  const before = await blogs.allTextContents()
  await expect(blogs).toHaveText(before)

  await page.getByTestId(TestID.PAGING_NEXT).click()
  await expect(blogs).not.toHaveText(before)
})
