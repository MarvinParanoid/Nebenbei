import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { validateScenarios } from './lib/validate'
import './index.css'

if (import.meta.env.DEV) validateScenarios()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
