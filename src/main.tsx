import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from './components/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './routes/profile.tsx'
import Register from './components/Register.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path:"/register",
    element: <Register/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AppProvider>
  </StrictMode>,
)
