import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. ADD THIS IMPORT HERE
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* 2. ADD THE ANALYTICS TAG HERE */}
    <Analytics />
  </React.StrictMode>,
)