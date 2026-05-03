import { describe, expect, it, vi } from 'vitest' // test helpers
import { render, screen } from '@testing-library/react' // RTL helpers
import ErrorBoundary from '@/components/ui/ErrorBoundary' // component under test

const Crash = () => { // test crash component
  throw new Error('Crash!') // force render error
}

describe('ErrorBoundary', () => {
  it('renders fallback UI when a child throws', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {}) // silence error logs

    render( // render boundary with crashing child
      <ErrorBoundary>
        <Crash /> {/* crash on render */}
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument() // fallback title
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument() // reload button
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument() // home link

    consoleSpy.mockRestore() // restore console.error
  })
})
