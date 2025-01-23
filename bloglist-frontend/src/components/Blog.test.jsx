import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'

describe('<Blog />', () => {
let container

beforeEach(() => {
    const blog = {
        title: "test blog 1",
        author: 'author1',
        url: 'test url 1',
        likes: 5,
        user: { name: 'username 1'}
    }

    container = render(<Blog blog={blog}/>).container
})

test('shows title and author by default', () => {
    const element = screen.getByText('test blog 1 by author1')
})

test('does not show other details by default', () => {
    const div = container.querySelector('.details')
    expect(div).toHaveStyle('display: none')
})

})