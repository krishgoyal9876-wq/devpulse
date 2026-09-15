import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PinboardProvider } from './context/PinBoardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PinboardProvider>
      <App />
    </PinboardProvider>
  </StrictMode>,
)
