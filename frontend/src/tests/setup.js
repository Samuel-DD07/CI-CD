import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock fetch to return a resolved promise by default
globalThis.fetch = vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
)
