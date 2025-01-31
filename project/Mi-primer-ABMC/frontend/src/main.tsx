import { createRoot } from 'react-dom/client'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import { store } from './store/index.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider >
)
