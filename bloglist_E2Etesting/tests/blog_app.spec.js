import { test, expect, beforeEach, describe } from '@playwright/test'
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
        data: {username: 'user1',
        password: 'password1',
        name: 'John Doe'
        }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('User Login')
    await expect(locator).toBeVisible()
  })
  test('User can log in with credintials', async({ page }) => {
    const username = "user1"
    const password = "password1"
    loginWith(page, username, password)
    await expect(page.getByText("John Doe logged in as user1")).toBeVisible()
  })

  test('log in fails with incorrect credintials', async({ page }) => {
    const username = "user1"
    const password = "wrongPassword"
    loginWith(page, username, password)
    await expect(page.getByText('Unable to log in')).toBeVisible()
  })

  test('a logged in user can create a new blog', async ({page}) => {
    const username = "user1"
    const password = "password1"
    loginWith(page, username, password)
    createBlog(page, 'title1', 'John Doe', 'url.tld')
    await expect(page.getByText('title1 by John Doe')).toBeVisible()
  })
  })



