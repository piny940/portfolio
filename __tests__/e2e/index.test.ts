import { getProjectIdsWithBlog, getTechnologies } from '@/content'
import { TestID } from '@/resources/TestID'
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

test.describe('mobile size window', async () => {
  test.use({ viewport: { width: 400, height: 800 } })
  test('navbar toggler button works', async ({ page }) => {
    await page.goto('/')
    const navItems = page.getByTestId(TestID.NAVBAR).getByRole('list')
    await expect(navItems).toBeHidden()
    const toggler = page.getByTestId(TestID.NAVBAR_TOGGLER_BUTTON)
    await expect(toggler).toBeVisible()
    await toggler.click()
    await expect(navItems).toBeVisible()
  })
})
test.describe('pc size window', async () => {
  test.use({ viewport: { width: 1200, height: 800 } })
  test('navbar toggler button hidden', async ({ page }) => {
    await page.goto('/')
    const navItems = page.getByTestId(TestID.NAVBAR).getByRole('list')
    await expect(navItems).toBeVisible()
    const toggler = page.getByTestId(TestID.NAVBAR_TOGGLER_BUTTON)
    await expect(toggler).toBeHidden()
  })
})
