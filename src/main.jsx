import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
