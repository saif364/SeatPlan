import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import OwnNavbar from './Components/OwnNavbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <OwnNavbar />
    <App />
  </StrictMode>,
)
