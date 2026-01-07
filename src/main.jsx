import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "normalize.css";
import "./styles/variables.css";
import "./styles/global.css";
import App from './App.jsx'
import AuthenticationContextProvider from './context/AuthenticationContext/AuthenticationContextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthenticationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthenticationContextProvider>
  </StrictMode>,
)
