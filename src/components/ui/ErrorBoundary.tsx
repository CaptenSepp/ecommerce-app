import React from 'react' // React base import

type ErrorBoundaryProps = { // boundary props
  children: React.ReactNode
}

type ErrorBoundaryState = { // boundary state shape
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> { // React error boundary
  state: ErrorBoundaryState = { hasError: false } // track crash state

  static getDerivedStateFromError() { // update state on render error
    return { hasError: true }
  }

  componentDidCatch(error: Error) { // log errors for debugging
    console.error('ErrorBoundary caught an error:', error) // minimal console logging
  }

  handleReload = () => { // reload handler
    window.location.reload() // refresh the page
  }

  render() { // render UI or fallback
    if (this.state.hasError) { // fallback UI on crash
      return (
        <div className="mx-auto max-w-md p-6 text-center"> {/* fallback wrapper */}
          <h1 className="u-text-2xl u-font-semibold mb-2">Something went wrong</h1> {/* title */}
          <p className="text-muted mb-6">Please try reloading or go back home.</p> {/* guidance */}
          <div className="flex justify-center gap-3"> {/* action buttons */}
            <a href="/" className="btn btn-secondary">Go home</a> {/* escape hatch */}
            <button type="button" className="btn btn-primary" onClick={this.handleReload}>
              Reload {/* refresh action */}
            </button>
          </div>
        </div>
      )
    }

    return this.props.children // render app when healthy
  }
}

export default ErrorBoundary
