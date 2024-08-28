import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from './components/default/Provider.jsx'
import { Router} from './components/default/Router.jsx'
import { AppProvider } from './components/default/AppContext.jsx'
import './styles.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider>
        <AppProvider>
            <Router />
        </AppProvider>
      </Provider>
  </React.StrictMode>,
)
