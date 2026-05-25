import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PlannerProvider } from './context/PlannerContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlannerProvider>
      <App />
    </PlannerProvider>
  </React.StrictMode>
)
