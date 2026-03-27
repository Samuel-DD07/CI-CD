import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

describe('App Component', () => {
  it('renders loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/Loading from backend.../i)).toBeInTheDocument()
  })

  it('renders backend message after fetch', async () => {
    const mockResponse = { message: 'Hello from Vitest!' }
    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Backend says: Hello from Vitest!/i)).toBeInTheDocument()
    })
  })
})
