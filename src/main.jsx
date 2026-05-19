import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import App from './app/App.jsx'
import SmoothScrollProvider from './providers/SmoothScrollProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrollProvider>
    <App />
    </SmoothScrollProvider>
  </StrictMode>,
)
