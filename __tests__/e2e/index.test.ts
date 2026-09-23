import { getProjectIdsWithBlog, getTechnologies } from '@/content'
import { expect, test } from '@playwright/test'
import path from 'node:path'

const placeholder = path.join(__dirname, 'fixtures', 'placeholder.png')

const allPaths = () => {
  const projectPaths = getProjectIdsWithBlog().map(id => `/projects/${id}`)
  const skillPaths = getTechnologies().map(tech => `/skills/${tech.slug}`)
  return [
    '/', '/projects', '/skills', '/blogs',
    ...projectPaths,
    ...skillPaths,
  ]
}

test.beforeEach(async ({ context }) => {
  await context.route('https://i.gyazo.com/**/*', route =>
    route.fulfill({ path: placeholder }),
  )
  await context.route('https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/**/*', route =>
    route.fulfill({ path: placeholder }),
  )
})

allPaths().forEach((path) => {
  test(`no changes to ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
