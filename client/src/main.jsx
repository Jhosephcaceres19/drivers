import React from 'react'
import  {createRoot} from 'react-dom'
import './index.css'
import Routes from './routes/Routes.jsx'
import { Provider } from 'react-redux'
import store from './redux/redux.js'

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Routes/>
//   </React.StrictMode>,
// )

// Usa createRoot para renderizar tu aplicación
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>   
      <Routes />
    </Provider>
  </React.StrictMode>
);
