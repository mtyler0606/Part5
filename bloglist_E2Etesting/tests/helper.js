const loginWith = async (page, username, password) => {
    await page.getByPlaceholder('Username').fill(username)
    await page.getByPlaceholder('Password').fill(password)
    await page.getByRole('button', {name : 'Login'}).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', {name : 'new blog'}).click()
    await page.getByPlaceholder('Title').fill(title)
    await page.getByPlaceholder('Author').fill(author)
    await page.getByPlaceholder('URL').fill(url)
    await page.getByRole('button', {name: 'create'}).click()
    await page.getByText(`${title} by ${author}`).waitFor()
}

export { loginWith, createBlog }