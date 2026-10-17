import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { XrayProvider } from './context/XrayContext.jsx'

function App() {
  return (
    <ThemeProvider>
      <XrayProvider>
        <RouterProvider router={router} />
      </XrayProvider>
    </ThemeProvider>
  )
}

export default App
