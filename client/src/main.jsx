import React from 'react'
import  {createRoot} from 'react-dom'
import './index.css'
import Routes from './routes/Routes.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
)
