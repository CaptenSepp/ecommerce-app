import { Link, useRouteError } from 'react-router-dom' // router helpers

const ErrorPage = () => { // router-level error page
  const routeError = useRouteError() // read router error if any
  const message = routeError instanceof Error ? routeError.message : 'Unexpected error.' // safe message

  return ( // render error page content
    <div className="app-page-shell app-page-shell--narrow app-page-shell--center"> {/* page wrapper */}
      <h1 className="u-text-2xl u-font-semibold mb-2">Oops!</h1> {/* friendly title */}
      <p className="text-muted mb-2">Something went wrong while loading this page.</p> {/* user hint */}
      <p className="text-muted mb-6">{message}</p> {/* error message */}
      <div className="app-state-panel__actions"> {/* primary actions */}
        <Link to="/" className="btn btn-primary">Go home</Link> {/* back to home */}
        <Link to="/products" className="btn btn-secondary">Browse products</Link> {/* back to products */}
      </div>
    </div>
  )
}

export default ErrorPage
