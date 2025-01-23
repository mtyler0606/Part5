import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Practice from './Practice'
import { beforeEach, describe, expect } from 'vitest'

test('count button clicks', async () => {
    const practiceHandler = vi.fn()
    const container = render(<Practice practiceHandler={practiceHandler} />).container
    const user = userEvent.setup()
    const button = screen.getByText('Click Me')
    await user.click(button)
    await user.click(button)
    expect(practiceHandler.mock.calls).toHaveLength(2)
})
