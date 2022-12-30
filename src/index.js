import { App } from './app'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ConfigProvider } from './context'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter basename={ process.env.NODE_ENV === 'production' ? '/elliptic-curves-over-finite-fields' : '' }>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </BrowserRouter>
)
