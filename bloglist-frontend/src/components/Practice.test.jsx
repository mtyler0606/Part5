import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Practice from './Practice'
import { beforeEach, describe, expect } from 'vitest'

test('count button clicks', async () => {
    const practiceFunction = vi.fn()
    const container = render(<Practice practiceFunction={practiceFunction} />).container
    const user = userEvent.setup()
    const button = screen.getByText('Click Me')
    await user.click(button)
    await user.click(button)
    expect(practiceFunction.mock.calls).toHaveLength(2)
})

test('confirm content of input', async () => {
    const practiceFunction = vi.fn()
    render(<Practice practiceFunction={practiceFunction} />)
    const user = userEvent.setup()
    const button = screen.getByText('Click Me')
    const input = screen.getByPlaceholderText('input placeholder')
    await user.type(input, "text here")
    await user.click(button)
    expect(practiceFunction.mock.calls).toHaveLength(1)
    expect(practiceFunction.mock.calls[0][0]).toBe('text here')
})
