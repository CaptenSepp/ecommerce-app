import { RouterProvider } from 'react-router-dom'
import router from '@/app/router'

const App = () => ( // app root renders router
  <RouterProvider router={router} /> // bind the route tree
)

export default App
